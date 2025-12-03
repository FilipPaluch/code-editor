import { ConditionGrammarSuggestion, ConditionGrammarSuggestionType } from './condition-grammar-suggestion.model';

export class OperatorSuggestions {
    static readonly suggestions: ConditionGrammarSuggestion[] = [
        {
            label: '=',
            snippetText: '=',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**Equality Operator (=)**
Checks if two values are equal.

Example:
\`\`\`
field = value
task.status = 'COMPLETED'
count = 42
\`\`\``
        },
        {
            label: '!=',
            snippetText: '!=',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**Inequality Operator (!=)**
Checks if two values are not equal.

Example:
\`\`\`
field != value
task.status != 'COMPLETED'
count != 0
\`\`\``
        },
        {
            label: '>',
            snippetText: '>',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**Greater Than Operator (>)**
Checks if first value is greater than second value.

Example:
\`\`\`
count > 10
task.dueDate > '2024-01-01'
\`\`\``
        },
        {
            label: '>=',
            snippetText: '>=',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**Greater Than or Equal Operator (>=)**
Checks if first value is greater than or equal to second value.
        
Example:
\`\`\`
count >= 10
task.dueDate >= '2024-01-01'
\`\`\``
        },
        {
            label: '<',
            snippetText: '<',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**Less Than Operator (<)**
Checks if first value is less than second value.

Example:
\`\`\`
count < 10
task.dueDate < '2024-01-01'
\`\`\``
        },
        {
            label: '<=',
            snippetText: '<=',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**Less Than or Equal Operator (<=)**
Checks if first value is less than or equal to second value.

Example:
\`\`\`
count <= 10
task.dueDate <= '2024-01-01'
\`\`\``
        },
        {
            label: 'AND',
            snippetText: 'AND',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**Logical AND Operator**
Returns true only if both conditions are true.

Example:
\`\`\`
condition1 AND condition2
task.status = 'ACTIVE' AND task.priority > 1
\`\`\``
        },
        {
            label: 'OR',
            snippetText: 'OR',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**Logical OR Operator**
Returns true if at least one condition is true.

Example:
\`\`\`
condition1 OR condition2
task.status = 'COMPLETED' OR task.priority = 0
\`\`\``
        },
        {
            label: 'NOT',
            snippetText: 'NOT',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**Logical NOT Operator**
Negates a boolean condition.

Example:
\`\`\`
NOT condition
NOT task.isCompleted
NOT (status = 'ACTIVE')
\`\`\``
        },
        {
            label: 'IN',
            snippetText: 'IN',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**IN Operator**
Checks if a value is present in an array.

Example:
\`\`\`
value IN [1, 2, 3]
status IN ['ACTIVE', 'PENDING']
\`\`\``
        },
        {
            label: 'NOT IN',
            snippetText: 'NOT IN',
            type: ConditionGrammarSuggestionType.Operator,
            documentation: `**NOT IN Operator**
Checks if a value is not present in an array.

Example:
\`\`\`
value NOT IN [1, 2, 3]
status NOT IN ['COMPLETED', 'CANCELLED']
\`\`\``
        }
    ];
}