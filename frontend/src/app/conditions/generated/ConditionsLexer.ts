// Generated from Conditions.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class ConditionsLexer extends Lexer {
	public static readonly DATE = 1;
	public static readonly IS = 2;
	public static readonly OF = 3;
	public static readonly ANY = 4;
	public static readonly ALL = 5;
	public static readonly AND = 6;
	public static readonly OR = 7;
	public static readonly NOT = 8;
	public static readonly TRUE = 9;
	public static readonly FALSE = 10;
	public static readonly POWER = 11;
	public static readonly MULTIPLICATION = 12;
	public static readonly DIVISION = 13;
	public static readonly PLUS = 14;
	public static readonly MINUS = 15;
	public static readonly GT = 16;
	public static readonly GE = 17;
	public static readonly LT = 18;
	public static readonly LE = 19;
	public static readonly EQ = 20;
	public static readonly NEQ = 21;
	public static readonly LPAREN = 22;
	public static readonly RPAREN = 23;
	public static readonly LARRAYPAREN = 24;
	public static readonly RARRAYPAREN = 25;
	public static readonly LLAMBDAPAREN = 26;
	public static readonly RLAMBDAPAREN = 27;
	public static readonly LAMBDAARROW = 28;
	public static readonly COLON = 29;
	public static readonly COMMA = 30;
	public static readonly DECIMAL = 31;
	public static readonly UNFINISHED_STRING = 32;
	public static readonly TEXT = 33;
	public static readonly IDENTIFIER = 34;
	public static readonly WS = 35;
	public static readonly ERROR_CHAR = 36;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'^'", 
                                                            "'*'", "'/'", 
                                                            "'+'", "'-'", 
                                                            "'>'", "'>='", 
                                                            "'<'", "'<='", 
                                                            "'='", "'!='", 
                                                            "'('", "')'", 
                                                            "'['", "']'", 
                                                            "'{'", "'}'", 
                                                            "'->'", "':'", 
                                                            "','" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "DATE", 
                                                             "IS", "OF", 
                                                             "ANY", "ALL", 
                                                             "AND", "OR", 
                                                             "NOT", "TRUE", 
                                                             "FALSE", "POWER", 
                                                             "MULTIPLICATION", 
                                                             "DIVISION", 
                                                             "PLUS", "MINUS", 
                                                             "GT", "GE", 
                                                             "LT", "LE", 
                                                             "EQ", "NEQ", 
                                                             "LPAREN", "RPAREN", 
                                                             "LARRAYPAREN", 
                                                             "RARRAYPAREN", 
                                                             "LLAMBDAPAREN", 
                                                             "RLAMBDAPAREN", 
                                                             "LAMBDAARROW", 
                                                             "COLON", "COMMA", 
                                                             "DECIMAL", 
                                                             "UNFINISHED_STRING", 
                                                             "TEXT", "IDENTIFIER", 
                                                             "WS", "ERROR_CHAR" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"DATE", "IS", "OF", "ANY", "ALL", "AND", "OR", "NOT", "TRUE", "FALSE", 
		"POWER", "MULTIPLICATION", "DIVISION", "PLUS", "MINUS", "GT", "GE", "LT", 
		"LE", "EQ", "NEQ", "LPAREN", "RPAREN", "LARRAYPAREN", "RARRAYPAREN", "LLAMBDAPAREN", 
		"RLAMBDAPAREN", "LAMBDAARROW", "COLON", "COMMA", "DECIMAL", "UNFINISHED_STRING", 
		"TEXT", "IDENTIFIER", "WS", "ERROR_CHAR",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, ConditionsLexer._ATN, ConditionsLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "Conditions.g4"; }

	public get literalNames(): (string | null)[] { return ConditionsLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return ConditionsLexer.symbolicNames; }
	public get ruleNames(): string[] { return ConditionsLexer.ruleNames; }

	public get serializedATN(): number[] { return ConditionsLexer._serializedATN; }

	public get channelNames(): string[] { return ConditionsLexer.channelNames; }

	public get modeNames(): string[] { return ConditionsLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,36,203,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,
	2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,
	31,7,31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,1,0,1,0,1,0,1,0,1,0,1,1,
	1,1,1,1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,6,
	1,6,1,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,10,
	1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,15,1,15,1,16,1,16,1,16,1,
	17,1,17,1,18,1,18,1,18,1,19,1,19,1,20,1,20,1,20,1,21,1,21,1,22,1,22,1,23,
	1,23,1,24,1,24,1,25,1,25,1,26,1,26,1,27,1,27,1,27,1,28,1,28,1,29,1,29,1,
	30,4,30,160,8,30,11,30,12,30,161,1,30,1,30,4,30,166,8,30,11,30,12,30,167,
	3,30,170,8,30,1,31,1,31,5,31,174,8,31,10,31,12,31,177,9,31,1,32,1,32,5,
	32,181,8,32,10,32,12,32,184,9,32,1,32,1,32,1,33,1,33,5,33,190,8,33,10,33,
	12,33,193,9,33,1,34,4,34,196,8,34,11,34,12,34,197,1,34,1,34,1,35,1,35,0,
	0,36,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,
	14,29,15,31,16,33,17,35,18,37,19,39,20,41,21,43,22,45,23,47,24,49,25,51,
	26,53,27,55,28,57,29,59,30,61,31,63,32,65,33,67,34,69,35,71,36,1,0,19,2,
	0,68,68,100,100,2,0,65,65,97,97,2,0,84,84,116,116,2,0,69,69,101,101,2,0,
	73,73,105,105,2,0,83,83,115,115,2,0,79,79,111,111,2,0,70,70,102,102,2,0,
	78,78,110,110,2,0,89,89,121,121,2,0,76,76,108,108,2,0,82,82,114,114,2,0,
	85,85,117,117,1,0,48,57,1,0,39,39,5,0,32,33,35,38,40,58,63,95,97,126,4,
	0,46,46,65,90,95,95,97,122,5,0,46,46,48,57,65,90,95,95,97,122,3,0,9,10,
	12,13,32,32,209,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,
	0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,
	21,1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,
	0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,
	43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,1,0,0,0,0,53,1,0,
	0,0,0,55,1,0,0,0,0,57,1,0,0,0,0,59,1,0,0,0,0,61,1,0,0,0,0,63,1,0,0,0,0,
	65,1,0,0,0,0,67,1,0,0,0,0,69,1,0,0,0,0,71,1,0,0,0,1,73,1,0,0,0,3,78,1,0,
	0,0,5,81,1,0,0,0,7,84,1,0,0,0,9,88,1,0,0,0,11,92,1,0,0,0,13,96,1,0,0,0,
	15,99,1,0,0,0,17,103,1,0,0,0,19,108,1,0,0,0,21,114,1,0,0,0,23,116,1,0,0,
	0,25,118,1,0,0,0,27,120,1,0,0,0,29,122,1,0,0,0,31,124,1,0,0,0,33,126,1,
	0,0,0,35,129,1,0,0,0,37,131,1,0,0,0,39,134,1,0,0,0,41,136,1,0,0,0,43,139,
	1,0,0,0,45,141,1,0,0,0,47,143,1,0,0,0,49,145,1,0,0,0,51,147,1,0,0,0,53,
	149,1,0,0,0,55,151,1,0,0,0,57,154,1,0,0,0,59,156,1,0,0,0,61,159,1,0,0,0,
	63,171,1,0,0,0,65,178,1,0,0,0,67,187,1,0,0,0,69,195,1,0,0,0,71,201,1,0,
	0,0,73,74,7,0,0,0,74,75,7,1,0,0,75,76,7,2,0,0,76,77,7,3,0,0,77,2,1,0,0,
	0,78,79,7,4,0,0,79,80,7,5,0,0,80,4,1,0,0,0,81,82,7,6,0,0,82,83,7,7,0,0,
	83,6,1,0,0,0,84,85,7,1,0,0,85,86,7,8,0,0,86,87,7,9,0,0,87,8,1,0,0,0,88,
	89,7,1,0,0,89,90,7,10,0,0,90,91,7,10,0,0,91,10,1,0,0,0,92,93,7,1,0,0,93,
	94,7,8,0,0,94,95,7,0,0,0,95,12,1,0,0,0,96,97,7,6,0,0,97,98,7,11,0,0,98,
	14,1,0,0,0,99,100,7,8,0,0,100,101,7,6,0,0,101,102,7,2,0,0,102,16,1,0,0,
	0,103,104,7,2,0,0,104,105,7,11,0,0,105,106,7,12,0,0,106,107,7,3,0,0,107,
	18,1,0,0,0,108,109,7,7,0,0,109,110,7,1,0,0,110,111,7,10,0,0,111,112,7,5,
	0,0,112,113,7,3,0,0,113,20,1,0,0,0,114,115,5,94,0,0,115,22,1,0,0,0,116,
	117,5,42,0,0,117,24,1,0,0,0,118,119,5,47,0,0,119,26,1,0,0,0,120,121,5,43,
	0,0,121,28,1,0,0,0,122,123,5,45,0,0,123,30,1,0,0,0,124,125,5,62,0,0,125,
	32,1,0,0,0,126,127,5,62,0,0,127,128,5,61,0,0,128,34,1,0,0,0,129,130,5,60,
	0,0,130,36,1,0,0,0,131,132,5,60,0,0,132,133,5,61,0,0,133,38,1,0,0,0,134,
	135,5,61,0,0,135,40,1,0,0,0,136,137,5,33,0,0,137,138,5,61,0,0,138,42,1,
	0,0,0,139,140,5,40,0,0,140,44,1,0,0,0,141,142,5,41,0,0,142,46,1,0,0,0,143,
	144,5,91,0,0,144,48,1,0,0,0,145,146,5,93,0,0,146,50,1,0,0,0,147,148,5,123,
	0,0,148,52,1,0,0,0,149,150,5,125,0,0,150,54,1,0,0,0,151,152,5,45,0,0,152,
	153,5,62,0,0,153,56,1,0,0,0,154,155,5,58,0,0,155,58,1,0,0,0,156,157,5,44,
	0,0,157,60,1,0,0,0,158,160,7,13,0,0,159,158,1,0,0,0,160,161,1,0,0,0,161,
	159,1,0,0,0,161,162,1,0,0,0,162,169,1,0,0,0,163,165,5,46,0,0,164,166,7,
	13,0,0,165,164,1,0,0,0,166,167,1,0,0,0,167,165,1,0,0,0,167,168,1,0,0,0,
	168,170,1,0,0,0,169,163,1,0,0,0,169,170,1,0,0,0,170,62,1,0,0,0,171,175,
	7,14,0,0,172,174,7,15,0,0,173,172,1,0,0,0,174,177,1,0,0,0,175,173,1,0,0,
	0,175,176,1,0,0,0,176,64,1,0,0,0,177,175,1,0,0,0,178,182,7,14,0,0,179,181,
	7,15,0,0,180,179,1,0,0,0,181,184,1,0,0,0,182,180,1,0,0,0,182,183,1,0,0,
	0,183,185,1,0,0,0,184,182,1,0,0,0,185,186,7,14,0,0,186,66,1,0,0,0,187,191,
	7,16,0,0,188,190,7,17,0,0,189,188,1,0,0,0,190,193,1,0,0,0,191,189,1,0,0,
	0,191,192,1,0,0,0,192,68,1,0,0,0,193,191,1,0,0,0,194,196,7,18,0,0,195,194,
	1,0,0,0,196,197,1,0,0,0,197,195,1,0,0,0,197,198,1,0,0,0,198,199,1,0,0,0,
	199,200,6,34,0,0,200,70,1,0,0,0,201,202,9,0,0,0,202,72,1,0,0,0,8,0,161,
	167,169,175,182,191,197,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ConditionsLexer.__ATN) {
			ConditionsLexer.__ATN = new ATNDeserializer().deserialize(ConditionsLexer._serializedATN);
		}

		return ConditionsLexer.__ATN;
	}


	static DecisionsToDFA = ConditionsLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}