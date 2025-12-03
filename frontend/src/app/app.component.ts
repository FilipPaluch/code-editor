import { Component, signal, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { ExpressionField } from './expression-fields/expressionField';
import { EditorMode, ExpressionEditorComponent } from './components/expression-editor/expression-editor.component';
import { AiChatComponent } from './ai-chat/ai-chat.component';
import * as monaco from 'monaco-editor';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DEMO_EXPRESSION_FIELDS } from './DEMO_EXPRESSION_FIELDS';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ExpressionEditorComponent,
    AiChatComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('expressionEditor') expressionEditor?: ExpressionEditorComponent;

  title = 'Code Editor';

  editorMode = signal<EditorMode>('conditional-mapping');
  expression = signal<string>('');
  showAiChat = signal<boolean>(false);

  expressionFields: ExpressionField[] = DEMO_EXPRESSION_FIELDS;

  private isResizing = false;
  private startX = 0;
  private startWidth = 0;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  onEditorReady(editor: monaco.editor.IStandaloneCodeEditor): void {

  }

  private _pendingAiSuggestion: string | null = null;
  private _originalBeforeAIUpdateCode: string = '';

  onValueChange(value: string): void {
    this.expression.set(value);
  }

  switchMode(mode: EditorMode): void {
    this.editorMode.set(mode);

    if (this.expressionEditor) {
      this.expressionEditor.setMode(mode);
    }
  }

  toggleAiChat(): void {
    this.showAiChat.set(!this.showAiChat());
  }

  onAiCodeUpdate(code: string): void {
    const originalCode = this.expression();

    if (this.expressionEditor) {
      this.expressionEditor.showAiDiff(originalCode, code);
    }
  }


  onResizeStart(event: MouseEvent): void {
    this.isResizing = true;
    this.startX = event.clientX;

    const aiPanel = this.elementRef.nativeElement.querySelector('.ai-panel');
    if (aiPanel) {
      this.startWidth = aiPanel.offsetWidth;
    }

    event.preventDefault();

    // Add global mouse listeners
    const mouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      if (this.isResizing) {
        this.onResizeMove(e);
      }
    });

    const mouseUpListener = this.renderer.listen('document', 'mouseup', () => {
      this.isResizing = false;
      mouseMoveListener();
      mouseUpListener();
    });
  }

  private onResizeMove(event: MouseEvent): void {
    if (!this.isResizing) return;

    const deltaX = event.clientX - this.startX;
    const newWidth = this.startWidth + deltaX;
    const contentElement = this.elementRef.nativeElement.querySelector('.content');

    if (contentElement) {
      const maxWidth = contentElement.offsetWidth - 300; // Minimum width for editor
      const minWidth = 250; // Minimum width for AI panel

      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      const aiPanel = this.elementRef.nativeElement.querySelector('.ai-panel');

      if (aiPanel) {
        this.renderer.setStyle(aiPanel, 'width', `${clampedWidth}px`);
        this.renderer.setStyle(aiPanel, 'flex', 'none');
      }
    }
  }
}
