import { CharStreams } from 'antlr4';
import MappingsGrammarLexer from '../generated/MappingsGrammarLexer';

export class MonacoMappingGrammarTokenizer {

    public static tokenizeMonacoLine(mappingLine: string) {

        const input = CharStreams.fromString(mappingLine);
        const lexer = new MappingsGrammarLexer(input);
        const tokens = lexer.getAllTokens();

        return {
          tokens: tokens.map((token: { column: any; type: number; }) => ({
            startIndex: token.column,
            scopes: this.getTokenTypeName(token.type)
          })),
          endState: new InitialState()
        };
    }
    
    private static getTokenTypeName(tokenType: number) {
        switch (tokenType) {
            // Assignment operators
            case MappingsGrammarLexer.ASSIGN:
                return 'operator.assignment';
            case MappingsGrammarLexer.CONDITIONALASSIGN:
                return 'operator.conditional';
            case MappingsGrammarLexer.NULLCOALESCING:
                return 'operator.nullcoalescing';

            // Mathematical operators
            case MappingsGrammarLexer.PLUS:
            case MappingsGrammarLexer.MINUS:
            case MappingsGrammarLexer.MULTIPLICATION:
            case MappingsGrammarLexer.DIVISION:
            case MappingsGrammarLexer.POWER:
                return 'operator.mathematical';

            // Keywords
            case MappingsGrammarLexer.NULL:
                return 'keyword';

            // Functions
            case MappingsGrammarLexer.FORMAT:
            case MappingsGrammarLexer.LENGTH:
            case MappingsGrammarLexer.COUNT:
                return 'function';

            // Boolean literals
            case MappingsGrammarLexer.BOOL:
                return 'constant.boolean';

            // Numeric literals
            case MappingsGrammarLexer.DECIMAL:
                return 'number';

            // String literals and interpolation
            case MappingsGrammarLexer.TEXT:
                return 'string';

            // Identifiers
            case MappingsGrammarLexer.IDENTIFIER:
                return 'identifier';

            // Delimiters and brackets
            case MappingsGrammarLexer.LPAREN:
            case MappingsGrammarLexer.RPAREN:
                return 'delimiter.parenthesis';
            case MappingsGrammarLexer.LARRAYPAREN:
            case MappingsGrammarLexer.RARRAYPAREN:
                return 'delimiter.bracket';

            // Other delimiters
            case MappingsGrammarLexer.COMMA:
                return 'delimiter.comma';
            case MappingsGrammarLexer.COLON:
                return 'delimiter.colon';
            case MappingsGrammarLexer.END:
                return 'delimiter.semicolon';

            // Error cases
            case MappingsGrammarLexer.UNFINISHED_STRING:
                return 'string.invalid';

            default:
                return '';
        }
    }
}

export class InitialState {
  clone(): InitialState {
    return new InitialState();
  }
  equals(other: InitialState): boolean {
    return true;
  }
}