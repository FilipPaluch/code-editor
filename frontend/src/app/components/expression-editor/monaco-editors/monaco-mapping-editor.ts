import { Injectable } from '@angular/core';
import * as monaco from 'monaco-editor';
import { ExpressionField } from '../../../expression-fields/expressionField';
import { IMonacoEditor } from './monaco-editor';
import { InitialState } from '../../../conditions/suggestions/monaco-condition-grammar-tokenizer';
import { DropdownOptionAnnotation } from '../../../conditions/validation/condition-expression-validator';
import { MappingSuggestionService } from '../../../mappings/suggestions/mapping-suggestion-service';
import { MonacoMappingGrammarTokenizer } from '../../../mappings/suggestions/monaco-mapping-grammar-tokenizer';
import { MappingExpressionValidator, MappingExpressionValidationError } from '../../../mappings/validation/mapping-expression-validator';

export class MonacoMappingEditor implements IMonacoEditor {
    private editor?: monaco.editor.IStandaloneCodeEditor;
    private expressionFields: ExpressionField[] = [];
    private validationTimeout?: number;
    private suggestionService: MappingSuggestionService;
    private annotationDecorationCollection?: monaco.editor.IEditorDecorationsCollection;
    private modelContentChangeListener?: monaco.IDisposable;
    private tokensProvider?: monaco.IDisposable;
    private completionProvider?: monaco.IDisposable;

    constructor() {
        this.suggestionService = new MappingSuggestionService();
        this.registerLanguage();
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
        });

        this.validateExpression();

        return this.editor;
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
        const validator = new MappingExpressionValidator(this.expressionFields);
        const result = validator.validate(text);

        const allMarkers: monaco.editor.IMarkerData[] = [];
        result.errors.forEach(error => {
            const markers = MonacoMappingEditor.createMarkersFromError(error, model);
            allMarkers.push(...markers);
        });

        monaco.editor.setModelMarkers(model, 'mapping-expression', allMarkers);

        const decorations: monaco.editor.IModelDeltaDecoration[] = result.annotations
            .filter(ann => ann.type === 'dropdown_option')
            .map(ann => MonacoMappingEditor.createDecorationFromAnnotation(ann as DropdownOptionAnnotation, model));

        if (!this.annotationDecorationCollection) {
            this.annotationDecorationCollection = this.editor.createDecorationsCollection();
        }

        if (this.annotationDecorationCollection) {
            this.annotationDecorationCollection.set(decorations);
        }
    }

    public static createDecorationFromAnnotation(
        annotation: DropdownOptionAnnotation,
        model: monaco.editor.ITextModel
    ): monaco.editor.IModelDeltaDecoration {
        const startPos = model.getPositionAt(annotation.position.start);
        const endPos = model.getPositionAt(annotation.position.end);

        return {
            range: new monaco.Range(
                startPos.lineNumber,
                startPos.column,
                endPos.lineNumber - 1,
                endPos.column
            ),
            options: {
                after: {
                    content: ` ${annotation.displayValue} `,
                    inlineClassName: 'option-value-hint'
                },
                hoverMessage: {
                    value: `**${annotation.fieldPath}**\n\nValue: \`${annotation.displayValue}\`\n\Guid: \`${annotation.guid}\``,
                    isTrusted: true
                }
            }
        };
    }

    public static createMarkersFromError(error: MappingExpressionValidationError, model: monaco.editor.ITextModel): monaco.editor.IMarkerData[] {
        const markers: monaco.editor.IMarkerData[] = [];

        switch (error.type) {
            case 'parsing_error': {
                const startPosition = model.getPositionAt(error.position.start);
                const endPosition = model.getPositionAt(error.position.end + 1);

                markers.push({
                    severity: monaco.MarkerSeverity.Error,
                    message: error.message,
                    startLineNumber: startPosition.lineNumber,
                    startColumn: startPosition.column,
                    endLineNumber: endPosition.lineNumber,
                    endColumn: endPosition.column
                });
                break;
            }

            case 'field_not_exists': {
                const startPosition = model.getPositionAt(error.identifier.range.start);
                const endPosition = model.getPositionAt(error.identifier.range.end + 1);

                markers.push({
                    severity: monaco.MarkerSeverity.Error,
                    message: error.message,
                    startLineNumber: startPosition.lineNumber,
                    startColumn: startPosition.column,
                    endLineNumber: endPosition.lineNumber,
                    endColumn: endPosition.column
                });
                break;
            }

            case 'field_not_writable': {
                const startPosition = model.getPositionAt(error.identifier.range.start);
                const endPosition = model.getPositionAt(error.identifier.range.end + 1);

                markers.push({
                    severity: monaco.MarkerSeverity.Error,
                    message: error.message,
                    startLineNumber: startPosition.lineNumber,
                    startColumn: startPosition.column,
                    endLineNumber: endPosition.lineNumber,
                    endColumn: endPosition.column
                });
                break;
            }

            case 'dropdown_invalid_value': {
                const valueStartPos = model.getPositionAt(error.invalidValue.range.start);
                const valueEndPos = model.getPositionAt(error.invalidValue.range.end + 1);

                markers.push({
                    severity: monaco.MarkerSeverity.Error,
                    message: error.message,
                    startLineNumber: valueStartPos.lineNumber,
                    startColumn: valueStartPos.column,
                    endLineNumber: valueEndPos.lineNumber,
                    endColumn: valueEndPos.column
                });

                const fieldStartPos = model.getPositionAt(error.identifier.range.start);
                const fieldEndPos = model.getPositionAt(error.identifier.range.end + 1);

                markers.push({
                    severity: monaco.MarkerSeverity.Info,
                    message: `Dropdown field: ${error.identifier.value}`,
                    startLineNumber: fieldStartPos.lineNumber,
                    startColumn: fieldStartPos.column,
                    endLineNumber: fieldEndPos.lineNumber,
                    endColumn: fieldEndPos.column
                });
                break;
            }

            default: {
                markers.push({
                    severity: monaco.MarkerSeverity.Error,
                    message: 'Unknown error',
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: 1,
                    endColumn: 1
                });
            }
        }

        return markers;
    }


    private registerLanguage() {
        monaco.languages.register({ id: 'mapping-expression' });
        this.registerLanguageConfiguration();
        this.registerTheme();
        this.registerTokensProvider();
        this.registerCompletionItemProvider();
    }

    private registerLanguageConfiguration() {
        monaco.languages.setLanguageConfiguration('mapping-expression', {
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
        monaco.editor.defineTheme('mapping-expression-theme', {
            base: 'vs',
            inherit: true,
            rules: [
                // Operators
                { token: 'operator.assignment', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'operator.conditional', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'operator.append', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'operator.remove', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'operator.nullcoalescing', foreground: '000080' },
                { token: 'operator.mathematical', foreground: '000080' },

                // Keywords
                { token: 'keyword', foreground: '0000FF' },

                // Functions
                { token: 'function', foreground: '795E26' },

                // Literals
                { token: 'constant.boolean', foreground: '0000FF' },
                { token: 'number', foreground: '098658' },
                { token: 'string', foreground: 'A31515' },

                // Interpolation
                { token: 'string.interpolation.begin', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'string.interpolation.end', foreground: '0000FF', fontStyle: 'bold' },
                { token: 'string.interpolated', foreground: 'A31515' },

                // Identifiers
                { token: 'identifier', foreground: '001080' },

                // Delimiters
                { token: 'delimiter.parenthesis', foreground: '000000' },
                { token: 'delimiter.bracket', foreground: '000000' },
                { token: 'delimiter.brace', foreground: '0000FF' },
                { token: 'delimiter.comma', foreground: '000000' },
                { token: 'delimiter.colon', foreground: '000000' },
                { token: 'delimiter.semicolon', foreground: '000000' },

                // Errors
                { token: 'string.invalid', foreground: 'FF0000', fontStyle: 'bold underline' }
            ],
            colors: {
                'editor.foreground': '#000000'
            }
        });
    }

    private registerTokensProvider() {
        this.tokensProvider = monaco.languages.setTokensProvider('mapping-expression', {
            getInitialState: () => new InitialState(),
            tokenize: (line: string) => {
                return MonacoMappingGrammarTokenizer.tokenizeMonacoLine(line);
            }
        });
    }

    private registerCompletionItemProvider() {
        this.completionProvider = monaco.languages.registerCompletionItemProvider('mapping-expression', {
            triggerCharacters: ['.', ' '],
            provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position, context: monaco.languages.CompletionContext, token: monaco.CancellationToken) => {

                const fullText = model.getValue();
                const offset = model.getOffsetAt(position);
                const wordAtPosition = model.getWordUntilPosition(position);
                const currentWord = wordAtPosition.word;

                const suggestions = this.suggestionService.getSuggestions(
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

    getEditorOptions(): monaco.editor.IStandaloneEditorConstructionOptions {
        return {
            theme: 'mapping-expression-theme',
            language: 'mapping-expression',
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

    dispose() {
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

        if(this.tokensProvider) {
            this.tokensProvider.dispose();
            this.tokensProvider = undefined;
        }

        if(this.completionProvider){
            this.completionProvider.dispose();
            this.completionProvider = undefined;
        }

        if (this.editor) {
            this.editor.dispose();
            this.editor = undefined;
        }
    }
}