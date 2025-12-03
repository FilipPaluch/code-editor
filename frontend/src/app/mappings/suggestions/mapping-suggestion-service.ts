import { Injectable } from '@angular/core';
import * as monaco from 'monaco-editor';
import { MappingExpressionContextAnalyzer, MappingAnalysisContextType, AvailableField, FieldType } from '../context/mapping-expression-context-analyzer';
import { MappingGrammarSuggestion, MappingGrammarSuggestionType } from './mapping-grammar-suggestion.model';
import { MappingOperatorSuggestions } from './mapping-operator-suggestions';
import { MappingFunctionSuggestions } from './mapping-function-suggestions';
import { MappingKeywordSuggestions } from './mapping-keyword-suggestions';
import { ExpressionField } from '../../expression-fields/expressionField';

export interface MappingSuggestion extends monaco.languages.CompletionItem {
    sortText: string;
}

@Injectable({
    providedIn: 'root'
})
export class MappingSuggestionService {
    constructor() { }

    public getSuggestions(
        text: string,
        position: number,
        expressionFields: ExpressionField[]
    ): MappingSuggestion[] {

        const analyzer = new MappingExpressionContextAnalyzer(expressionFields);
        const context = analyzer.analyze(text, position);

        const suggestions: MappingSuggestion[] = [];

        const fieldSuggestions = this.getFieldSuggestions(context.positionContext);
        suggestions.push(...fieldSuggestions);

        if (context.positionContext.contextType !== MappingAnalysisContextType.DROPDOWN_VALUE) {
            const grammarSuggestions = this.getGrammarSuggestions(context.positionContext.contextType);
            suggestions.push(...grammarSuggestions);
        }

        return suggestions;
    }

    private getFieldSuggestions(positionContext: any): MappingSuggestion[] {
        return positionContext.availableFields.map((field: AvailableField, index: number) => {
            const suggestion: MappingSuggestion = {
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

    private getGrammarSuggestions(contextType: MappingAnalysisContextType): MappingSuggestion[] {
        const suggestions: MappingGrammarSuggestion[] = [];

        suggestions.push(...MappingOperatorSuggestions.suggestions);
        
        suggestions.push(...MappingFunctionSuggestions.suggestions);
        
        suggestions.push(...MappingKeywordSuggestions.suggestions);

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
            case FieldType.VARIABLE:
                return monaco.languages.CompletionItemKind.Variable;
            default:
                return monaco.languages.CompletionItemKind.Text;
        }
    }

    private getGrammarCompletionItemKind(type: MappingGrammarSuggestionType): monaco.languages.CompletionItemKind {
        switch (type) {
            case MappingGrammarSuggestionType.Operator:
                return monaco.languages.CompletionItemKind.Operator;
            case MappingGrammarSuggestionType.Function:
                return monaco.languages.CompletionItemKind.Function;
            case MappingGrammarSuggestionType.Keyword:
                return monaco.languages.CompletionItemKind.Keyword;
            default:
                return monaco.languages.CompletionItemKind.Text;
        }
    }

    private getFieldDetail(field: AvailableField): string {
        const typeLabel = this.getFieldTypeLabel(field.type);
        
        if (field.type === FieldType.VARIABLE) {
            return `${typeLabel} - ${field.fullPath}`;
        }
        
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
            case FieldType.VARIABLE:
                return 'Variable';
            default:
                return 'Unknown';
        }
    }

    private getGrammarDetail(type: MappingGrammarSuggestionType): string {
        switch (type) {
            case MappingGrammarSuggestionType.Operator:
                return 'Operator';
            case MappingGrammarSuggestionType.Function:
                return 'Function';
            case MappingGrammarSuggestionType.Keyword:
                return 'Keyword';
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

        if (field.type === FieldType.VARIABLE) {
            return {
                value: `**Variable**\n\nDeclared variable: \`${field.fullPath}\``,
                isTrusted: true
            };
        }

        return undefined;
    }

    private getFieldSortText(fieldType: FieldType, index: number, contextType?: any): string {

        if (fieldType === FieldType.VARIABLE) {
            return `0-${String(index).padStart(3, '0')}`;
        }

        if (contextType?.contextType === MappingAnalysisContextType.DROPDOWN_VALUE && 
            fieldType === FieldType.DROPDOWN_OPTION) {
            return `1-${String(index).padStart(3, '0')}`;
        }

        if ([FieldType.CONTAINER, FieldType.FORM, FieldType.SUBFORM, FieldType.FIELD, 
             FieldType.COLLECTION, FieldType.DROPDOWN].includes(fieldType)) {
            return `2-${String(index).padStart(3, '0')}`;
        }

        if (fieldType === FieldType.DROPDOWN_OPTION) {
            return `3-${String(index).padStart(3, '0')}`;
        }

        return `9-${String(index).padStart(3, '0')}`;
    }

    private getGrammarSortText(type: MappingGrammarSuggestionType, index: number): string {
        switch (type) {
            case MappingGrammarSuggestionType.Operator:
                return `4-${String(index).padStart(3, '0')}`;
            case MappingGrammarSuggestionType.Keyword:
                return `5-${String(index).padStart(3, '0')}`;
            case MappingGrammarSuggestionType.Function:
                return `6-${String(index).padStart(3, '0')}`;
            default:
                return `9-${String(index).padStart(3, '0')}`;
        }
    }

    private shouldTriggerNextSuggestion(fieldType: FieldType): boolean {
        return [
            FieldType.CONTAINER,
            FieldType.FORM,
            FieldType.SUBFORM,
            FieldType.VARIABLE
        ].includes(fieldType);
    }
}