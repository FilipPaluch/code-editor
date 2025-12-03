import { MappingGrammarSuggestion, MappingGrammarSuggestionType } from './mapping-grammar-suggestion.model';

export class MappingKeywordSuggestions {
    static readonly suggestions: MappingGrammarSuggestion[] = [
        {
            label: 'NULL',
            snippetText: 'NULL',
            type: MappingGrammarSuggestionType.Keyword,
            documentation: `**NULL Keyword**
Represents a null value.

Example:
\`\`\`
process.form.field := NULL
var.result := task.value ?? NULL
process.attachments:FILES := NULL
\`\`\``
        },
        {
            label: 'true',
            snippetText: 'true',
            type: MappingGrammarSuggestionType.Keyword,
            documentation: `**true Keyword**
Boolean true value.

Example:
\`\`\`
process.form.isActive := true
var.completed := true
\`\`\``
        },
        {
            label: 'false',
            snippetText: 'false',
            type: MappingGrammarSuggestionType.Keyword,
            documentation: `**false Keyword**
Boolean false value.

Example:
\`\`\`
process.form.isActive := false
var.completed := false
\`\`\``
        }
    ];
}