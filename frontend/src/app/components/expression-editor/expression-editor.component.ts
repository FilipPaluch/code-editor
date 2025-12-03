import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, inject, Input, NgZone, OnDestroy, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as monaco from 'monaco-editor';
import { MonacoConditionEditor } from './monaco-editors/monaco-condition-editor';
import { MonacoMappingEditor } from './monaco-editors/monaco-mapping-editor';
import { MonacoConditionalMappingEditor } from './monaco-editors/monaco-conditional-mapping-editor';
import { ExpressionField } from '../../expression-fields/expressionField';

export type EditorMode = 'condition' | 'mapping' | 'conditional-mapping';

interface IMonacoEditor {
    createEditor(container: HTMLElement, value: string, expressionFields: ExpressionField[]): monaco.editor.IStandaloneCodeEditor;
    dispose(): void;
}

@Component({
    standalone: true,
    selector: 'app-expression-editor',
    template: '<div class="editor-container" #editorContainer></div>',
    styleUrls: ['./expression-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ExpressionEditorComponent),
        multi: true
    }]
})
export class ExpressionEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef<HTMLDivElement>;

    @Input()
    set mode(value: EditorMode) {
        if (this._mode !== value && this.editor) {
            this._mode = value;
            this.setMode(value);
        } else {
            this._mode = value;
        }
    }
    get mode(): EditorMode {
        return this._mode;
    }
    private _mode: EditorMode = 'condition';
    @Input() expressionFields: ExpressionField[] = [];
    @Input() insideNg: boolean = true;
    @Input() additionalOptions?: monaco.editor.IStandaloneEditorConstructionOptions;

    @Output() editorReady = new EventEmitter<monaco.editor.IStandaloneCodeEditor>();
    @Output() valueChange = new EventEmitter<string>();

    private readonly zone = inject(NgZone);
    private editor?: monaco.editor.IStandaloneCodeEditor;
    private monacoEditor?: IMonacoEditor;

    private _diffEditor: monaco.editor.IStandaloneDiffEditor | null = null;
    private _originalModel: monaco.editor.ITextModel | null = null;
    protected _modifiedModel: monaco.editor.ITextModel | null = null;
    protected _isDiffMode = false;

    private value = '';
    private _codeBeforeDiff = '';

    private contentChangeListener?: monaco.IDisposable;
    private blurListener?: monaco.IDisposable;

    private onChange: (value: string) => void = () => { };
    private onTouched: () => void = () => { };

    private _acceptRejectWidget: HTMLDivElement | null = null;

    ngOnInit(): void {
        this.initMainEditor();
    }

    ngOnDestroy(): void {
        this.dispose();
    }

    showAiDiff(originalCode: string, newCode: string): void {
        if (this._isDiffMode) return;

        this._codeBeforeDiff = this.editor?.getValue() || originalCode;

        this.switchToDiffMode(originalCode, newCode);
    }

    acceptDiff(): void {
        if (!this._modifiedModel) return;

        const newCode = this._modifiedModel.getValue();

        this.switchToMainEditor(newCode);

        this.emitValueChange(newCode);
    }

    rejectDiff(): void {
        this.switchToMainEditor(this._codeBeforeDiff);
    }

    private initMainEditor(): void {

        this.clearEditorContainer();

        this.monacoEditor = this.createMonacoEditor(this.mode);

        if (this.insideNg) {
            this.editor = this.createEditorInstance();
        } else {
            this.zone.runOutsideAngular(() => {
                this.editor = this.createEditorInstance();
            });
        }

        if (this.additionalOptions && this.editor) {
            this.editor.updateOptions(this.additionalOptions);
        }

        this.setupMainEditorListeners();

        this.editorReady.emit(this.editor);
    }

    private initDiffEditor(originalCode: string, newCode: string): void {

        this.clearEditorContainer();

        this._originalModel = monaco.editor.createModel(
            originalCode,
            this.getLanguageForMode()
        );

        this._modifiedModel = monaco.editor.createModel(
            newCode,
            this.getLanguageForMode()
        );

        this._diffEditor = monaco.editor.createDiffEditor(this.editorContainer.nativeElement, {
            enableSplitViewResizing: false,
            renderSideBySide: false,
            automaticLayout: true,
            readOnly: false,
            originalEditable: false,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            overviewRulerLanes: 3,
            theme: this.getTheme(),
        });

        this._diffEditor.setModel({
            original: this._originalModel,
            modified: this._modifiedModel
        });
    }

    private disposeMainEditor(): void {
        this.contentChangeListener?.dispose();
        this.contentChangeListener = undefined;

        this.blurListener?.dispose();
        this.blurListener = undefined;

        if (this.monacoEditor) {
            this.monacoEditor.dispose();
            this.monacoEditor = undefined;
        }

        if (this.editor) {
            this.editor.dispose();
            this.editor = undefined;
        }
    }

    private disposeDiffEditor(): void {
        if (this._diffEditor) {
            this._diffEditor.dispose();
            this._diffEditor = null;
        }

        if (this._acceptRejectWidget) {
            this._acceptRejectWidget.remove();
            this._acceptRejectWidget = null;
        }

        this._originalModel?.dispose();
        this._originalModel = null;

        this._modifiedModel?.dispose();
        this._modifiedModel = null;
    }

    private switchToDiffMode(originalCode: string, newCode: string): void {

        this.disposeMainEditor();

        this.initDiffEditor(originalCode, newCode);

        this.addAcceptRejectWidget();

        this._isDiffMode = true;
    }

    private switchToMainEditor(code: string): void {

        this.disposeDiffEditor();

        this._isDiffMode = false;

        this.initMainEditor();

        if (this.editor) {
            this.editor.setValue(code);
        }
    }

    private createEditorInstance(): monaco.editor.IStandaloneCodeEditor {
        if (!this.monacoEditor) {
            throw new Error('Monaco editor not initialized');
        }

        return this.monacoEditor.createEditor(
            this.editorContainer.nativeElement,
            this.value,
            this.expressionFields
        );
    }

    private clearEditorContainer(): void {
        this.editorContainer.nativeElement.innerHTML = '';
    }

    private setupMainEditorListeners(): void {
        if (!this.editor) return;

        this.contentChangeListener = this.editor.onDidChangeModelContent(() => {
            const newValue = this.editor!.getValue();
            if (this.value !== newValue) {
                this.value = newValue;
                this.emitValueChange(newValue);
            }
        });

        this.blurListener = this.editor.onDidBlurEditorWidget(() => {
            if (this.insideNg) {
                this.zone.run(() => this.onTouched());
            } else {
                this.onTouched();
            }
        });
    }

    private emitValueChange(value: string): void {
        if (this.insideNg) {
            this.zone.run(() => {
                this.onChange(value);
                this.valueChange.emit(value);
            });
        } else {
            this.onChange(value);
            this.valueChange.emit(value);
        }
    }


    private createMonacoEditor(mode: EditorMode): IMonacoEditor {
        switch (mode) {
            case 'condition':
                return new MonacoConditionEditor();
            case 'mapping':
                return new MonacoMappingEditor();
            case 'conditional-mapping':
                return new MonacoConditionalMappingEditor();
            default:
                throw new Error(`Unknown editor mode: ${mode}`);
        }
    }

    private getLanguageForMode(): string {
        switch (this.mode) {
            case 'condition':
                return 'condition';
            case 'mapping':
                return 'mapping';
            case 'conditional-mapping':
                return 'conditional-mapping';
            default:
                return 'plaintext';
        }
    }

    private getTheme(): string {
        return 'vs';
    }



    private addAcceptRejectWidget(): void {
        if (!this._diffEditor) return;

        const acceptAction: monaco.editor.IActionDescriptor = {
            id: 'accept-ai-diff',
            label: '✓ Accept Changes',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
            run: () => this.acceptDiff()
        };

        const rejectAction: monaco.editor.IActionDescriptor = {
            id: 'reject-ai-diff',
            label: '✗ Reject Changes',
            keybindings: [monaco.KeyCode.Escape],
            run: () => this.rejectDiff()
        };

        this._diffEditor.addAction(acceptAction);
        this._diffEditor.addAction(rejectAction);

        this.addFloatingWidget();
    }

    //Temp solution with this html here
    private addFloatingWidget(): void {
        const widget = document.createElement('div');
        widget.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  `;

        widget.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="font-weight: 600; color: #2d3748;">AI Changes</span>
      <button id="accept-diff-btn" style="
        background: #48bb78;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
      ">✓ Accept All</button>
      <button id="reject-diff-btn" style="
        background: #e53e3e;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
      ">✗ Reject</button>
    </div>
  `;

        document.body.appendChild(widget);
        this._acceptRejectWidget = widget;

        widget.querySelector('#accept-diff-btn')?.addEventListener('click', () => {
            this.acceptDiff();
        });

        widget.querySelector('#reject-diff-btn')?.addEventListener('click', () => {
            this.rejectDiff();
        });
    }

    private _parentComponent: any;

    setParentComponent(parent: any): void {
        this._parentComponent = parent;
    }

    writeValue(value: string): void {
        this.value = value || '';
        if (this.editor && this.editor.getValue() !== this.value) {
            this.editor.setValue(this.value);
        }
    }


    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.editor?.updateOptions({ readOnly: isDisabled });
    }

    public getValue(): string {
        return this.editor?.getValue() || '';
    }

    public setValue(value: string): void {
        this.value = value;
        if (this.editor && !this._isDiffMode) {
            this.editor.setValue(value);
        }
    }

    public getEditor(): monaco.editor.IStandaloneCodeEditor | undefined {
        return this.editor;
    }

    public setMode(mode: EditorMode): void {
        if (this._mode === mode) return;

        this._mode = mode;

        if (!this._isDiffMode) {
            this.disposeMainEditor();
            this.initMainEditor();
            this.setValue('');
        }
    }

    public updateExpressionFields(fields: ExpressionField[]): void {
        this.expressionFields = fields;
        this.dispose();
        this.initMainEditor();
        this.setValue('');
    }



    private dispose(): void {
        this.disposeDiffEditor();
        this.disposeMainEditor();
    }
}