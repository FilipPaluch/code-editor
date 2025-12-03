import { ConditionGrammarSuggestion, ConditionGrammarSuggestionType } from './condition-grammar-suggestion.model';

export class CollectionFunctionSuggestions {
    static readonly suggestions: ConditionGrammarSuggestion[] = [
        {
            label: 'ANY OF',
            snippetText: 'ANY OF ${1} IS x -> { }',
            type: ConditionGrammarSuggestionType.CollectionFunction,
            documentation: `**ANY OF Collection Function**
Checks if any element in the collection satisfies the condition.

Usage:
- Works with collections/arrays
- Requires lambda variable declaration
- Returns boolean
- Short-circuit evaluation (stops at first match)

Syntax:
- ANY OF collection IS variable -> { condition }
- Variable can be used inside lambda expression

Example:
\`\`\`
ANY OF tasks IS task -> { task.status = 'COMPLETED' }
ANY OF items IS x -> { x.quantity > 10 AND x.price < 100 }
\`\`\``
        },
        {
            label: 'ALL OF',
            snippetText: 'ALL OF ${1} IS x -> { }',
            type: ConditionGrammarSuggestionType.CollectionFunction,
            documentation: `**ALL OF Collection Function**
Checks if all elements in the collection satisfy the condition.

Usage:
- Works with collections/arrays
- Requires lambda variable declaration
- Returns boolean
- Short-circuit evaluation (stops at first non-match)

Syntax:
- ALL OF collection IS variable -> { condition }
- Variable can be used inside lambda expression

Example:
\`\`\`
ALL OF tasks IS task -> { task.priority > 0 }
ALL OF items IS x -> { x.isValid AND x.quantity > 0 }
\`\`\``
        }
    ];
}