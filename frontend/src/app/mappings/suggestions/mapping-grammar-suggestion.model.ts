export interface MappingGrammarSuggestion {
    label: string;
    documentation: string;
    snippetText: string;
    type: MappingGrammarSuggestionType;
}

export enum MappingGrammarSuggestionType {
    Function = 'function',
    Operator = 'operator',
    Keyword = 'keyword'
}