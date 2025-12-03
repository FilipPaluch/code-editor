import { ConditionGrammarSuggestion, ConditionGrammarSuggestionType } from './condition-grammar-suggestion.model';

export class FunctionSuggestions {
    static readonly suggestions: ConditionGrammarSuggestion[] = [
        {
            label: 'DATE',
            snippetText: 'DATE(${1:year}, ${2:month}, ${3:day})',
            type: ConditionGrammarSuggestionType.Function,
            documentation: `**DATE**
Creates a date from year, month and day components.

Parameters:
- \`year\`: number
  Year component
- \`month\`: number
  Month component (1-12)
- \`day\`: number
  Day component (1-31)

Returns: date

Example:
\`\`\`
DATE(2024, 1, 1)
\`\`\``
        }
    ];
}