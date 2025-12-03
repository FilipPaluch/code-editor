import * as monaco from 'monaco-editor';
import { ConditionExpressionValidationError, ConditionExpressionValidator, DropdownOptionAnnotation } from '../../../conditions/validation/condition-expression-validator';
import { ExpressionField } from '../../../expression-fields/expressionField';
import { ConditionSuggestionService } from '../../../conditions/suggestions/condition-suggestion-service';
import { InitialState, MonacoConditionGrammarTokenizer } from '../../../conditions/suggestions/monaco-condition-grammar-tokenizer';
import { IMonacoEditor } from './monaco-editor';


export class MonacoConditionEditor implements IMonacoEditor {
  private editor?: monaco.editor.IStandaloneCodeEditor;
  private expressionFields: ExpressionField[] = [];
  private validationTimeout?: number;
  private annotationDecorationCollection?: monaco.editor.IEditorDecorationsCollection;
  private suggestionService: ConditionSuggestionService;
  private modelContentChangeListener?: monaco.IDisposable;
  private tokensProvider?: monaco.IDisposable;
  private completionProvider?: monaco.IDisposable;

  constructor() {
    this.suggestionService = new ConditionSuggestionService();
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

  private registerLanguage() {
    monaco.languages.register({ id: 'condition-expression' });
    this.registerLanguageConfiguration();
    this.registerTheme();
    this.registerTokensProvider();
    this.registerCompletionItemProvider();
  }

  private registerLanguageConfiguration() {
    monaco.languages.setLanguageConfiguration('condition-expression', {
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '\'', close: '\'' }
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
    monaco.editor.defineTheme('condition-expression-theme', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword.logical', foreground: '0000FF', fontStyle: 'bold' },
        { token: 'keyword.operator', foreground: '0000FF' },
        { token: 'operator.comparison', foreground: '000080' },
        { token: 'operator.mathematical', foreground: '000080' },
        { token: 'keyword', foreground: '0000FF' },
        { token: 'function', foreground: '795E26' },
        { token: 'boolean', foreground: '0000FF' },
        { token: 'number', foreground: '098658' },
        { token: 'string', foreground: 'A31515' },
        { token: 'identifier', foreground: '001080' },
        { token: 'field', foreground: '001080' },
        { token: 'lambda.variable', foreground: '0070C1', fontStyle: 'italic' },
        { token: 'delimiter.parenthesis', foreground: '000000' },
        { token: 'delimiter', foreground: '000000' },
        { token: 'error', foreground: 'FF0000', fontStyle: 'bold underline' }
      ],
      colors: {
        'editor.foreground': '#000000'
      }
    });
  }

  private registerTokensProvider() {
    this.tokensProvider = monaco.languages.setTokensProvider('condition-expression', {
      getInitialState: () => new InitialState(),
      tokenize: (line: string) => {
        return MonacoConditionGrammarTokenizer.tokenizeMonacoLine(line);
      }
    });
  }


  private registerCompletionItemProvider() {
    this.completionProvider = monaco.languages.registerCompletionItemProvider('condition-expression', {
      triggerCharacters: ['.', ' ', ':'],
      provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position) => {

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
    const validator = new ConditionExpressionValidator(this.expressionFields);
    const result = validator.validate(text);

    const allMarkers: monaco.editor.IMarkerData[] = [];
    result.errors.forEach(error => {
      const markers = MonacoConditionEditor.createMarkersFromError(error, model);
      allMarkers.push(...markers);
    });

    monaco.editor.setModelMarkers(model, 'condition-expression', allMarkers);

    const decorations: monaco.editor.IModelDeltaDecoration[] = result.annotations
      .filter(ann => ann.type === 'dropdown_option')
      .map(ann => MonacoConditionEditor.createDecorationFromAnnotation(ann as DropdownOptionAnnotation, model));

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

  public static createMarkersFromError(error: ConditionExpressionValidationError, model: monaco.editor.ITextModel): monaco.editor.IMarkerData[] {
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

      case 'property_not_in_collection': {
        const propStartPos = model.getPositionAt(error.property.range.start);
        const propEndPos = model.getPositionAt(error.property.range.end + 1);

        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: error.message,
          startLineNumber: propStartPos.lineNumber,
          startColumn: propStartPos.column,
          endLineNumber: propEndPos.lineNumber,
          endColumn: propEndPos.column
        });

        const collStartPos = model.getPositionAt(error.collection.range.start);
        const collEndPos = model.getPositionAt(error.collection.range.end + 1);

        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: error.message,
          startLineNumber: collStartPos.lineNumber,
          startColumn: collStartPos.column,
          endLineNumber: collEndPos.lineNumber,
          endColumn: collEndPos.column
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

      case 'collection_not_iterable': {
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

      case 'lambda_variable_not_available': {
        const startPosition = model.getPositionAt(error.lambdaVariable.range.start);
        const endPosition = model.getPositionAt(error.lambdaVariable.range.end + 1);

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


  getEditorOptions(): monaco.editor.IStandaloneEditorConstructionOptions {
    return {
      theme: 'condition-expression-theme',
      language: 'condition-expression',
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