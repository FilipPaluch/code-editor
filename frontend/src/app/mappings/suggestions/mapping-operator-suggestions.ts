import { MappingGrammarSuggestion, MappingGrammarSuggestionType } from './mapping-grammar-suggestion.model';

export class MappingOperatorSuggestions {
    static readonly suggestions: MappingGrammarSuggestion[] = [
        {
            label: ':=',
            snippetText: ':=',
            type: MappingGrammarSuggestionType.Operator,
            documentation: `**Assignment Operator (:=)**
Assigns a value to a field.

Example:
\`\`\`
process.form.field := 'value'
task.status := 'COMPLETED'
var.total := 42
\`\`\``
        },
        {
            label: ':?=',
            snippetText: ':?=',
            type: MappingGrammarSuggestionType.Operator,
            documentation: `**Conditional Assignment Operator (:?=)**
Assigns a value only if the target field is empty or null.

Example:
\`\`\`
process.form.field :?= task.defaultValue
var.status :?= 'PENDING'
\`\`\``
        },
        {
            label: '??',
            snippetText: '??',
            type: MappingGrammarSuggestionType.Operator,
            documentation: `**Null Coalescing Operator (??)**
Returns the first non-null value from a chain of expressions.

Example:
\`\`\`
process.field := task.value ?? project.defaultValue ?? 'fallback'
var.name := user.nickname ?? user.fullName ?? 'Anonymous'
\`\`\``
        },
        {
            label: '+',
            snippetText: '+',
            type: MappingGrammarSuggestionType.Operator,
            documentation: `**Addition Operator (+)**
Adds two numeric values or concatenates strings.

Example:
\`\`\`
var.total := task.amount + project.bonus
var.sum := 10 + 20
var.fullName := task.firstName + ' ' + task.lastName
\`\`\``
        },
        {
            label: '-',
            snippetText: '-',
            type: MappingGrammarSuggestionType.Operator,
            documentation: `**Subtraction/Negation Operator (-)**
Subtracts two numeric values or negates a number.

Example:
\`\`\`
var.difference := task.total - task.discount
var.negative := -task.amount
var.result := 100 - 25
\`\`\``
        },
        {
            label: '*',
            snippetText: '*',
            type: MappingGrammarSuggestionType.Operator,
            documentation: `**Multiplication Operator (*)**
Multiplies two numeric values.

Example:
\`\`\`
var.total := task.quantity * task.price
var.area := task.width * task.height
var.result := 5 * 8
\`\`\``
        },
        {
            label: '/',
            snippetText: '/',
            type: MappingGrammarSuggestionType.Operator,
            documentation: `**Division Operator (/)**
Divides two numeric values.

Example:
\`\`\`
var.average := task.total / task.count
var.percentage := task.completed / task.total * 100
var.result := 100 / 4
\`\`\``
        },
        {
            label: '^',
            snippetText: '^',
            type: MappingGrammarSuggestionType.Operator,
            documentation: `**Power Operator (^)**
Raises a number to the power of another number.

Example:
\`\`\`
var.squared := task.value ^ 2
var.cubed := 3 ^ 3
var.result := task.base ^ task.exponent
\`\`\``
        }
    ];
}