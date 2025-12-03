import { MappingGrammarSuggestion, MappingGrammarSuggestionType } from './mapping-grammar-suggestion.model';

export class MappingFunctionSuggestions {
    static readonly suggestions: MappingGrammarSuggestion[] = [
        {
            label: 'DATE',
            snippetText: 'DATE(${1:year}, ${2:month}, ${3:day})',
            type: MappingGrammarSuggestionType.Function,
            documentation: `**DATE Function**
Constructs a date from year, month, and day components.

Parameters:
- \`year\`: number - Year component
- \`month\`: number - Month component (1-12)
- \`day\`: number - Day component (1-31)

Returns: date

Example:
\`\`\`
var.customDate := DATE(2024, 3, 15)
process.form.deadline := DATE(YEAR(task.startDate), 12, 31)
\`\`\``
        },
        {
            label: 'FORMAT',
            snippetText: 'FORMAT(${1:value}, ${2:format})',
            type: MappingGrammarSuggestionType.Function,
            documentation: `**FORMAT Function**
Formats a value (usually a date) according to a format string.

Parameters:
- \`value\`: any - Value to format (typically a date)
- \`format\`: string - Format pattern

Returns: string

Example:
\`\`\`
var.formattedDate := FORMAT(task.dueDate, 'yyyy-MM-dd')
process.form.displayDate := FORMAT(task.createdDate, 'dd/MM/yyyy HH:mm')
var.formatted := FORMAT($'Today is {task.date}', 'MMMM dd, yyyy')
\`\`\``
        },
        {
            label: 'LENGTH',
            snippetText: 'LENGTH(${1:text})',
            type: MappingGrammarSuggestionType.Function,
            documentation: `**LENGTH Function**
Returns the length of a string or array.

Parameters:
- \`text\`: string | array - String or array to measure

Returns: number

Example:
\`\`\`
var.nameLength := LENGTH(task.title)
process.form.itemCount := LENGTH(task.subtasks)
\`\`\``
        },
        {
            label: 'COUNT',
            snippetText: 'COUNT(${1:collection})',
            type: MappingGrammarSuggestionType.Function,
            documentation: `**COUNT Function**
Counts the number of elements in a collection or array.

Parameters:
- \`collection\`: array - Array or collection to count

Returns: number

Example:
\`\`\`
var.totalTasks := COUNT(project.tasks)
process.form.attachmentCount := COUNT(task.files)
var.selectedCount := COUNT(['option1', 'option2', 'option3'])
\`\`\``
        }
    ];
}