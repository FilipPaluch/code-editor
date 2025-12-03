import * as monaco from 'monaco-editor';
import { ConditionalMappingState, ConditionalMappingTokenizer } from '../../../conditional-mappings/conditional-mapping-tokenizer';
import { ConditionalMappingValidator } from '../../../conditional-mappings/validation/condition-mapping-validator';
import { ExpressionField } from '../../../expression-fields/expressionField';
import { InitialState } from '../../../conditions/suggestions/monaco-condition-grammar-tokenizer';
import { ConditionExpressionValidationError } from '../../../conditions/validation/condition-expression-validator';
import { MonacoConditionEditor } from './monaco-condition-editor';
import { MonacoMappingEditor } from './monaco-mapping-editor';
import { ConditionalMappingSuggestionService } from '../../../conditional-mappings/suggestions/conditional-mapping-suggestion-service';
import { MappingExpressionValidationError } from '../../../mappings/validation/mapping-expression-validator';

export class MonacoConditionalMappingEditor {
    private editor?: monaco.editor.IStandaloneCodeEditor;
    private expressionFields: ExpressionField[] = [];
    private validationTimeout?: number;
    private annotationDecorationCollection?: monaco.editor.IEditorDecorationsCollection;
    private modelContentChangeListener?: monaco.IDisposable;
    private tokensProvider?: monaco.IDisposable;
    private completionProvider?: monaco.IDisposable;

    private conditionalMappingSuggestionService: ConditionalMappingSuggestionService;
    private tokenizer: ConditionalMappingTokenizer;

    constructor() {
        this.conditionalMappingSuggestionService = new ConditionalMappingSuggestionService();
        this.registerLanguage();
        this.tokenizer = new ConditionalMappingTokenizer();
    }

    createEditor(container: HTMLElement, value: string, expressionFields: ExpressionField[]): monaco.editor.IStandaloneCodeEditor {
        this.expressionFields = expressionFields;

        this.editor = monaco.editor.create(container, {
            value: value,
            ...this.getEditorOptions()
        });

        this.annotationDecorationCollection = this.editor.createDecorationsCollection();

        this.modelContentChangeListener = this.editor.onDidChangeModelContent(() => {
            this.scheduleValidation();

            const model = this.editor!.getModel();
            if (model) {
                monaco.editor.setModelLanguage(model, 'conditional-mapping');
            }
        });

        this.validateExpression();

        return this.editor;
    }

    private registerLanguage() {
        monaco.languages.register({ id: 'conditional-mapping' });
        this.registerLanguageConfiguration();
        this.registerTheme();
        this.registerTokensProvider();
        this.registerCompletionItemProvider();
    }

    private registerLanguageConfiguration() {
        monaco.languages.setLanguageConfiguration('conditional-mapping', {
            brackets: [
                ['{', '}'],
                ['[', ']'],
                ['(', ')']
            ],
            autoClosingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '\'', close: '\'' },
                { open: '$\'', close: '\'' }
            ],
            surroundingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '\'', close: '\'' }
            ]
        });
    }

    private registerTheme() {
        monaco.editor.defineTheme('conditional-mapping-theme', {
            base: 'vs',
            inherit: true,
            rules: [
                { token: 'keyword.control.conditional-mapping', foreground: 'AE81FF'},
                { token: 'keyword.control.structure', foreground: 'FF0000', fontStyle: 'bold' },
                { token: 'keyword.control.conditional-mapping', foreground: '#AE81FF' },

                { token: 'keyword.logical', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'keyword.operator', foreground: '0000FF' },
                { token: 'operator.comparison', foreground: '000080' },
                { token: 'operator.mathematical', foreground: '000080' },
                { token: 'keyword', foreground: '0000FF' },
                { token: 'function', foreground: '795E26' },
                { token: 'constant.boolean', foreground: '0000FF' },
                { token: 'number', foreground: '098658' },
                { token: 'string', foreground: 'A31515' },
                { token: 'identifier', foreground: '001080' },
                { token: 'field', foreground: '001080' },
                { token: 'lambda.variable', foreground: '0070C1', fontStyle: 'italic' },
                { token: 'delimiter.parenthesis', foreground: '000000' },
                { token: 'delimiter', foreground: '000000' },
                { token: 'error', foreground: 'FF0000', fontStyle: 'bold underline' },

                { token: 'operator.assignment', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'operator.conditional', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'operator.append', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'operator.remove', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'operator.nullcoalescing', foreground: '000080' },
                { token: 'string.interpolation.begin', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'string.interpolation.end', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'string.interpolated', foreground: 'A31515' },
                { token: 'delimiter.bracket', foreground: '000000' },
                { token: 'delimiter.brace', foreground: '0000FF' },
                { token: 'delimiter.comma', foreground: '000000' },
                { token: 'delimiter.colon', foreground: '000000' },
                { token: 'delimiter.semicolon', foreground: '000000' },
                { token: 'string.invalid', foreground: 'FF0000', fontStyle: 'bold underline' }
            ],
            colors: {
                'editor.foreground': '#000000'
            }
        });
    }


    private registerTokensProvider() {
        this.tokensProvider = monaco.languages.setTokensProvider('conditional-mapping', {
            getInitialState: () => {
                const state = this.tokenizer.getInitialState();
                if (this.editor) {
                    const text = this.editor.getValue();
                    state.documentText = text;
                    state.sections = this.tokenizer.updateDocumentStructure(text);
                }
                return state;
            },

            tokenize: (line: string, state: ConditionalMappingState) => {
                if (this.editor) {
                    const currentText = this.editor.getValue();
                    if (currentText !== state.documentText) {
                        state = state.clone();
                        state.documentText = currentText;
                        state.sections = this.tokenizer.updateDocumentStructure(currentText);
                    }
                }

                return this.tokenizer.tokenizeLine(line, state);
            }
        });
    }

    private registerCompletionItemProvider() {
        this.completionProvider = monaco.languages.registerCompletionItemProvider('conditional-mapping', {
            triggerCharacters: ['.', ' ', ':'],
            provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position) => {
                const fullText = model.getValue();
                const offset = model.getOffsetAt(position);
                const wordAtPosition = model.getWordUntilPosition(position);
                const currentWord = wordAtPosition.word;

                const suggestions = this.conditionalMappingSuggestionService.getSuggestions(
                    fullText,
                    offset,
                    this.expressionFields
                );

                const filteredSuggestions = currentWord
                    ? suggestions.filter(s =>
                        s.label.toString().toLowerCase().startsWith(currentWord.toLowerCase())
                    )
                    : suggestions;

                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: wordAtPosition.startColumn,
                    endColumn: position.column
                };

                return {
                    suggestions: filteredSuggestions.map(suggestion => ({
                        ...suggestion,
                        range
                    }))
                };
            }
        });
    }

    private scheduleValidation() {
        if (this.validationTimeout) {
            clearTimeout(this.validationTimeout);
        }

        this.validationTimeout = setTimeout(() => {
            this.validateExpression();
        }, 500) as any;
    }

    private validateExpression() {

        if (!this.editor) return;

        const model = this.editor.getModel();
        if (!model) return;

        const text = model.getValue();
        const validator = new ConditionalMappingValidator(this.expressionFields);
        const result = validator.validate(text);

        const allMarkers: monaco.editor.IMarkerData[] = [];

        result.structureErrors.forEach(error => {
            const startPos = model.getPositionAt(error.position.start);
            const endPos = model.getPositionAt(error.position.end);

            allMarkers.push({
                severity: monaco.MarkerSeverity.Error,
                message: error.message,
                startLineNumber: startPos.lineNumber,
                startColumn: startPos.column,
                endLineNumber: endPos.lineNumber,
                endColumn: endPos.column
            });
        });

        result.conditionErrors.forEach((error: ConditionExpressionValidationError) => {
            const markers = MonacoConditionEditor.createMarkersFromError(error, model);
            allMarkers.push(...markers);
        });

        result.mappingErrors.forEach((error: MappingExpressionValidationError) => {
            const markers = MonacoMappingEditor.createMarkersFromError(error, model);
            allMarkers.push(...markers);
        });

        monaco.editor.setModelMarkers(model, 'conditional-mapping', allMarkers);

        const decorations: monaco.editor.IModelDeltaDecoration[] = [];

        result.conditionExpessionAnnotations.forEach(annotation => {
            decorations.push(MonacoConditionEditor.createDecorationFromAnnotation(annotation, model));
        });

        result.mappingExpressionAnnotations.forEach(annotation => {
            decorations.push(MonacoMappingEditor.createDecorationFromAnnotation(annotation, model));
        });

        if (this.annotationDecorationCollection) {
            this.annotationDecorationCollection.set(decorations);
        }
    }


    getEditorOptions(): monaco.editor.IStandaloneEditorConstructionOptions {
        return {
            theme: 'conditional-mapping-theme',
            language: 'conditional-mapping',
            minimap: { enabled: false },
            automaticLayout: true,
            fontSize: 16,
            fontFamily: 'Consolas, "Courier New", monospace',
            matchBrackets: 'always',
            bracketPairColorization: {
                enabled: true
            },
            guides: {
                bracketPairs: true,
                bracketPairsHorizontal: true,
                highlightActiveBracketPair: true
            },
            quickSuggestions: {
                other: true,
                comments: false,
                strings: true
            },
            parameterHints: {
                enabled: true
            },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            acceptSuggestionOnCommitCharacter: true,
            wordBasedSuggestions: 'off',
            suggestSelection: 'first',
            tabCompletion: 'on',
            hover: {
                enabled: true,
                delay: 100,
                above: false
            },
            suggest: {
                filterGraceful: true,
                snippetsPreventQuickSuggestions: false,
                showWords: false,
                showIcons: true,
                showStatusBar: true,
                showInlineDetails: true,
                showMethods: true,
                showFunctions: true,
                showVariables: true,
                showClasses: true,
                showProperties: true,
                showSnippets: true,
                preview: true
            }
        };
    }

    dispose(): void {
        if (this.validationTimeout) {
            clearTimeout(this.validationTimeout);
        }

        if (this.modelContentChangeListener) {
            this.modelContentChangeListener.dispose();
            this.modelContentChangeListener = undefined;
        }

        if (this.annotationDecorationCollection) {
            this.annotationDecorationCollection.clear();
        }

        if (this.tokensProvider) {
            this.tokensProvider.dispose();
            this.tokensProvider = undefined;
        }

        if (this.completionProvider) {
            this.completionProvider.dispose();
            this.completionProvider = undefined;
        }

        if (this.editor) {
            this.editor.dispose();
            this.editor = undefined;
        }
    }
}