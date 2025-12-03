import { ConditionSuggestionService } from '../../conditions/suggestions/condition-suggestion-service';
import { ExpressionField } from '../../expression-fields/expressionField';

import * as monaco from 'monaco-editor';
import { ConditionalMappingStructureParser } from '../code-structure/conditional-mapping-structure-parser';
import { MappingSuggestion, MappingSuggestionService } from '../../mappings/suggestions/mapping-suggestion-service';

export class ConditionalMappingSuggestionService {
    private conditionSuggestionService: ConditionSuggestionService;
    private mappingSuggestionService: MappingSuggestionService;
    private structureParser = new ConditionalMappingStructureParser();

    constructor() {
        this.conditionSuggestionService = new ConditionSuggestionService();
        this.mappingSuggestionService = new MappingSuggestionService();
    }

    public getSuggestions(
        text: string,
        position: number,
        expressionFields: ExpressionField[]
    ): monaco.languages.CompletionItem[] {
        const section = this.structureParser.getSectionAtPosition(text, position);

        if (!section) {
            return [
                {
                    label: '#IF/#THEN',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: '#IF\n$0\n#THEN',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Conditional statement',
                    sortText: '0',
                    range: undefined as any
                }
            ];
        }

        const relativePosition = position - section.start;

        if (section.type === 'condition') {
            return this.conditionSuggestionService.getSuggestions(
                section.content,
                relativePosition,
                expressionFields
            );
        } else {
            const suggestions: MappingSuggestion[] = [];

            const mappingSuggestions = this.mappingSuggestionService.getSuggestions(
                section.content,
                relativePosition,
                expressionFields
            );
            suggestions.push(...mappingSuggestions);

            //To improve
            if (section.content.endsWith('\r\n')) {
                suggestions.push({
                    label: '#IF/#THEN',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: '#IF\n$0\n#THEN',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    detail: 'Conditional statement',
                    sortText: '4-000',
                    range: undefined as any
                });
            }

            return suggestions;
        }
    }
}