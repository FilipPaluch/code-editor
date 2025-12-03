import { CharStreams } from 'antlr4';
import ConditionsLexer from '../generated/ConditionsLexer';

export class MonacoConditionGrammarTokenizer {

    public static tokenizeMonacoLine(conditionLine: string) {

        const input = CharStreams.fromString(conditionLine);
        const lexer = new ConditionsLexer(input);
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
            case ConditionsLexer.AND:
            case ConditionsLexer.OR:
            case ConditionsLexer.NOT:
                return 'keyword.logical';

            case ConditionsLexer.GT:
            case ConditionsLexer.GE:
            case ConditionsLexer.LT:
            case ConditionsLexer.LE:
            case ConditionsLexer.EQ:
            case ConditionsLexer.NEQ:
                return 'operator.comparison';

            case ConditionsLexer.PLUS:
            case ConditionsLexer.MINUS:
            case ConditionsLexer.MULTIPLICATION:
            case ConditionsLexer.DIVISION:
            case ConditionsLexer.POWER:
                return 'operator.mathematical';

            case ConditionsLexer.IS:
            case ConditionsLexer.OF:
            case ConditionsLexer.ANY:
            case ConditionsLexer.ALL:
                return 'keyword';

            case ConditionsLexer.DATE:
                return 'function';

            case ConditionsLexer.TRUE:
            case ConditionsLexer.FALSE:
                return 'constant.boolean';

            case ConditionsLexer.DECIMAL:
                return 'number';

            case ConditionsLexer.TEXT:
                return 'string';

            case ConditionsLexer.IDENTIFIER:
                return 'identifier';

            case ConditionsLexer.LPAREN:
            case ConditionsLexer.RPAREN:
            case ConditionsLexer.LARRAYPAREN:
            case ConditionsLexer.RARRAYPAREN:
            case ConditionsLexer.LLAMBDAPAREN:
            case ConditionsLexer.RLAMBDAPAREN:
                return 'delimiter.parenthesis';

            case ConditionsLexer.COMMA:
            case ConditionsLexer.COLON:
                return 'delimiter';

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