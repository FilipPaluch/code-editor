export interface ConditionGrammarSuggestion {
    label: string;
    documentation: string;
    snippetText: string;
    type: ConditionGrammarSuggestionType;
}

export enum ConditionGrammarSuggestionType {
    Function = 'function',
    Operator = 'operator',
    CollectionFunction = 'collectionFunction'
}