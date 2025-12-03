import { Injectable } from '@angular/core';
import * as monaco from 'monaco-editor';
import { ConditionExpressionAnalyzer, AnalysisContextType, AvailableField, FieldType } from '../context/condition-expression-analyzer';
import { ExpressionField } from '../../expression-fields/expressionField';
import { CollectionFunctionSuggestions } from './collection-function-suggestions';
import { ConditionGrammarSuggestion, ConditionGrammarSuggestionType } from './condition-grammar-suggestion.model';
import { FunctionSuggestions } from './function-suggestions';
import { OperatorSuggestions } from './operator-suggestions';

export interface ConditionSuggestion extends monaco.languages.CompletionItem {
    sortText: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConditionSuggestionService {
    constructor() { }

    public getSuggestions(
        text: string,
        position: number,
        expressionFields: ExpressionField[]
    ): ConditionSuggestion[] {

        const analyzer = new ConditionExpressionAnalyzer(expressionFields);

        const context = analyzer.analyze(text, position);

        const suggestions: ConditionSuggestion[] = [];

        const fieldSuggestions = this.getFieldSuggestions(context.positionContext);
        suggestions.push(...fieldSuggestions);

        if (context.positionContext.contextType !== AnalysisContextType.DROPDOWN) {
            const grammarSuggestions = this.getGrammarSuggestions(context.positionContext.contextType);
            suggestions.push(...grammarSuggestions);
        }

        return suggestions;
    }

    private getFieldSuggestions(positionContext: any): ConditionSuggestion[] {
        return positionContext.availableFields.map((field: AvailableField, index: number) => {
            const suggestion: ConditionSuggestion = {
                label: field.name,
                kind: this.getCompletionItemKind(field.type),
                insertText: field.insertText,
                detail: this.getFieldDetail(field),
                documentation: this.getFieldDocumentation(field),
                sortText: this.getFieldSortText(field.type, index, positionContext),
                range: undefined as any
            };

            if (this.shouldTriggerNextSuggestion(field.type)) {
                suggestion.command = {
                    id: 'editor.action.triggerSuggest',
                    title: 'Trigger Suggest'
                };
            }

            return suggestion;
        });
    }

    private getGrammarSuggestions(contextType: AnalysisContextType): ConditionSuggestion[] {
        const suggestions: ConditionGrammarSuggestion[] = [];

        suggestions.push(...OperatorSuggestions.suggestions);
        suggestions.push(...FunctionSuggestions.suggestions);
        suggestions.push(...CollectionFunctionSuggestions.suggestions);

        return suggestions.map((suggestion, index) => ({
            label: suggestion.label,
            kind: this.getGrammarCompletionItemKind(suggestion.type),
            insertText: suggestion.snippetText,
            insertTextRules: suggestion.snippetText.includes('${')
                ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                : undefined,
            detail: this.getGrammarDetail(suggestion.type),
            documentation: {
                value: suggestion.documentation,
                isTrusted: true
            },
            sortText: this.getGrammarSortText(suggestion.type, index),
            range: undefined as any
        }));
    }

    private getCompletionItemKind(fieldType: FieldType): monaco.languages.CompletionItemKind {
        switch (fieldType) {
            case FieldType.CONTAINER:
                return monaco.languages.CompletionItemKind.Module;
            case FieldType.FORM:
            case FieldType.SUBFORM:
                return monaco.languages.CompletionItemKind.Class;
            case FieldType.FIELD:
                return monaco.languages.CompletionItemKind.Field;
            case FieldType.DROPDOWN:
                return monaco.languages.CompletionItemKind.Enum;
            case FieldType.DROPDOWN_OPTION:
                return monaco.languages.CompletionItemKind.EnumMember;
            case FieldType.COLLECTION:
                return monaco.languages.CompletionItemKind.Reference;
            case FieldType.LAMBDA_VARIABLE:
                return monaco.languages.CompletionItemKind.Variable;
            default:
                return monaco.languages.CompletionItemKind.Text;
        }
    }

    private getGrammarCompletionItemKind(type: ConditionGrammarSuggestionType): monaco.languages.CompletionItemKind {
        switch (type) {
            case ConditionGrammarSuggestionType.Operator:
                return monaco.languages.CompletionItemKind.Operator;
            case ConditionGrammarSuggestionType.Function:
                return monaco.languages.CompletionItemKind.Function;
            case ConditionGrammarSuggestionType.CollectionFunction:
                return monaco.languages.CompletionItemKind.Keyword;
            default:
                return monaco.languages.CompletionItemKind.Text;
        }
    }

    private getFieldDetail(field: AvailableField): string {
        const typeLabel = this.getFieldTypeLabel(field.type);

        return typeLabel;
    }

    private getFieldTypeLabel(fieldType: FieldType): string {
        switch (fieldType) {
            case FieldType.CONTAINER:
                return 'Container';
            case FieldType.FORM:
                return 'Form';
            case FieldType.SUBFORM:
                return 'Subform';
            case FieldType.FIELD:
                return 'Field';
            case FieldType.DROPDOWN:
                return 'Dropdown';
            case FieldType.DROPDOWN_OPTION:
                return 'Option';
            case FieldType.COLLECTION:
                return 'Collection';
            case FieldType.LAMBDA_VARIABLE:
                return 'Lambda Variable';
            default:
                return 'Unknown';
        }
    }

    private getGrammarDetail(type: ConditionGrammarSuggestionType): string {
        switch (type) {
            case ConditionGrammarSuggestionType.Operator:
                return 'Operator';
            case ConditionGrammarSuggestionType.Function:
                return 'Function';
            case ConditionGrammarSuggestionType.CollectionFunction:
                return 'Collection Function';
            default:
                return '';
        }
    }

    private getFieldDocumentation(field: AvailableField): monaco.IMarkdownString | undefined {
        if (field.type === FieldType.DROPDOWN_OPTION && field.description) {
            return {
                value: `**${field.description}**\n\nGUID: \`${field.value}\``,
                isTrusted: true
            };
        }

        if (field.type === FieldType.LAMBDA_VARIABLE && field.description) {
            return {
                value: field.description,
                isTrusted: true
            };
        }

        return undefined;
    }

    private getFieldSortText(fieldType: FieldType, index: number, contextType?: AnalysisContextType): string {
        if (contextType === AnalysisContextType.DROPDOWN && fieldType === FieldType.DROPDOWN_OPTION) {
            return `0-${String(index).padStart(3, '0')}`;
        }

        if (fieldType === FieldType.LAMBDA_VARIABLE) {
            return `0-${String(index).padStart(3, '0')}`;
        }

        if ([FieldType.CONTAINER, FieldType.FORM, FieldType.SUBFORM, FieldType.FIELD, FieldType.COLLECTION, FieldType.DROPDOWN].includes(fieldType)) {
            return `1-${String(index).padStart(3, '0')}`;
        }

        if (fieldType === FieldType.DROPDOWN_OPTION) {
            return `2-${String(index).padStart(3, '0')}`;
        }

        return `9-${String(index).padStart(3, '0')}`;
    }

    private getGrammarSortText(type: ConditionGrammarSuggestionType, index: number): string {
        switch (type) {
            case ConditionGrammarSuggestionType.Operator:
                return `3-${String(index).padStart(3, '0')}`;
            case ConditionGrammarSuggestionType.CollectionFunction:
                return `4-${String(index).padStart(3, '0')}`;
            case ConditionGrammarSuggestionType.Function:
                return `5-${String(index).padStart(3, '0')}`;
            default:
                return `9-${String(index).padStart(3, '0')}`;
        }
    }

    private shouldTriggerNextSuggestion(fieldType: FieldType): boolean {
        return [
            FieldType.CONTAINER,
            FieldType.FORM,
            FieldType.SUBFORM,
            FieldType.LAMBDA_VARIABLE
        ].includes(fieldType);
    }
}