// Generated from Conditions.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import ConditionsListener from "./ConditionsListener.js";
import ConditionsVisitor from "./ConditionsVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class ConditionsParser extends Parser {
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
	public static readonly RULE_exp = 0;
	public static readonly RULE_expression = 1;
	public static readonly RULE_number = 2;
	public static readonly RULE_date = 3;
	public static readonly RULE_string = 4;
	public static readonly RULE_equatable = 5;
	public static readonly RULE_equality = 6;
	public static readonly RULE_binary = 7;
	public static readonly RULE_comparable = 8;
	public static readonly RULE_iterator = 9;
	public static readonly RULE_comparator = 10;
	public static readonly RULE_array = 11;
	public static readonly RULE_arrayelements = 12;
	public static readonly RULE_textarrayelement = 13;
	public static readonly RULE_decimalarrayelement = 14;
	public static readonly RULE_identifier = 15;
	public static readonly RULE_bool = 16;
	public static readonly RULE_decimalConst = 17;
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
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"exp", "expression", "number", "date", "string", "equatable", "equality", 
		"binary", "comparable", "iterator", "comparator", "array", "arrayelements", 
		"textarrayelement", "decimalarrayelement", "identifier", "bool", "decimalConst",
	];
	public get grammarFileName(): string { return "Conditions.g4"; }
	public get literalNames(): (string | null)[] { return ConditionsParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return ConditionsParser.symbolicNames; }
	public get ruleNames(): string[] { return ConditionsParser.ruleNames; }
	public get serializedATN(): number[] { return ConditionsParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, ConditionsParser._ATN, ConditionsParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public exp(): ExpContext {
		let localctx: ExpContext = new ExpContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, ConditionsParser.RULE_exp);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 36;
			this.expression(0);
			this.state = 37;
			this.match(ConditionsParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, _parentState);
		let _prevctx: ExpressionContext = localctx;
		let _startState: number = 2;
		this.enterRecursionRule(localctx, 2, ConditionsParser.RULE_expression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 63;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				{
				localctx = new BoolxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 40;
				this.bool();
				}
				break;
			case 2:
				{
				localctx = new ParenxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 41;
				this.match(ConditionsParser.LPAREN);
				this.state = 42;
				this.expression(0);
				this.state = 43;
				this.match(ConditionsParser.RPAREN);
				}
				break;
			case 3:
				{
				localctx = new NotxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 45;
				this.match(ConditionsParser.NOT);
				this.state = 46;
				this.expression(6);
				}
				break;
			case 4:
				{
				localctx = new EqualityxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 47;
				(localctx as EqualityxContext)._left = this.equatable();
				this.state = 48;
				(localctx as EqualityxContext)._op = this.equality();
				this.state = 49;
				(localctx as EqualityxContext)._right = this.equatable();
				}
				break;
			case 5:
				{
				localctx = new ComparatorxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 51;
				(localctx as ComparatorxContext)._left = this.comparable();
				this.state = 52;
				(localctx as ComparatorxContext)._op = this.comparator();
				this.state = 53;
				(localctx as ComparatorxContext)._right = this.comparable();
				}
				break;
			case 6:
				{
				localctx = new LambdaxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 55;
				this.equatable();
				this.state = 56;
				this.match(ConditionsParser.IS);
				this.state = 57;
				this.match(ConditionsParser.IDENTIFIER);
				this.state = 58;
				this.match(ConditionsParser.LAMBDAARROW);
				this.state = 59;
				this.match(ConditionsParser.LLAMBDAPAREN);
				this.state = 60;
				this.expression(0);
				this.state = 61;
				this.match(ConditionsParser.RLAMBDAPAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 75;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 73;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						localctx = new ExpressionsequalityxContext(this, new ExpressionContext(this, _parentctx, _parentState));
						(localctx as ExpressionsequalityxContext)._left = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, ConditionsParser.RULE_expression);
						this.state = 65;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 66;
						(localctx as ExpressionsequalityxContext)._op = this.equality();
						this.state = 67;
						(localctx as ExpressionsequalityxContext)._right = this.expression(5);
						}
						break;
					case 2:
						{
						localctx = new BinaryxContext(this, new ExpressionContext(this, _parentctx, _parentState));
						(localctx as BinaryxContext)._left = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, ConditionsParser.RULE_expression);
						this.state = 69;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 70;
						(localctx as BinaryxContext)._op = this.binary();
						this.state = 71;
						(localctx as BinaryxContext)._right = this.expression(3);
						}
						break;
					}
					}
				}
				this.state = 77;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public number_(): NumberContext;
	public number_(_p: number): NumberContext;
	// @RuleVersion(0)
	public number_(_p?: number): NumberContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: NumberContext = new NumberContext(this, this._ctx, _parentState);
		let _prevctx: NumberContext = localctx;
		let _startState: number = 4;
		this.enterRecursionRule(localctx, 4, ConditionsParser.RULE_number, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 88;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 22:
				{
				localctx = new ParensxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 79;
				this.match(ConditionsParser.LPAREN);
				this.state = 80;
				this.number_(0);
				this.state = 81;
				this.match(ConditionsParser.RPAREN);
				}
				break;
			case 15:
				{
				localctx = new NegationxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 83;
				this.match(ConditionsParser.MINUS);
				this.state = 84;
				this.number_(6);
				}
				break;
			case 4:
			case 5:
				{
				localctx = new NumberIteratorxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 85;
				this.iterator();
				}
				break;
			case 34:
				{
				localctx = new NumberIdentifierxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 86;
				this.identifier(0);
				}
				break;
			case 31:
				{
				localctx = new DecimalxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 87;
				this.match(ConditionsParser.DECIMAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 101;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 99;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
					case 1:
						{
						localctx = new PowerxContext(this, new NumberContext(this, _parentctx, _parentState));
						(localctx as PowerxContext)._a = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, ConditionsParser.RULE_number);
						this.state = 90;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 91;
						this.match(ConditionsParser.POWER);
						this.state = 92;
						(localctx as PowerxContext)._b = this.number_(8);
						}
						break;
					case 2:
						{
						localctx = new MultiplicationxContext(this, new NumberContext(this, _parentctx, _parentState));
						(localctx as MultiplicationxContext)._a = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, ConditionsParser.RULE_number);
						this.state = 93;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 94;
						(localctx as MultiplicationxContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===12 || _la===13)) {
						    (localctx as MultiplicationxContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 95;
						(localctx as MultiplicationxContext)._b = this.number_(6);
						}
						break;
					case 3:
						{
						localctx = new AdditionxContext(this, new NumberContext(this, _parentctx, _parentState));
						(localctx as AdditionxContext)._a = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, ConditionsParser.RULE_number);
						this.state = 96;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 97;
						(localctx as AdditionxContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===14 || _la===15)) {
						    (localctx as AdditionxContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 98;
						(localctx as AdditionxContext)._b = this.number_(5);
						}
						break;
					}
					}
				}
				this.state = 103;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public date(): DateContext {
		let localctx: DateContext = new DateContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, ConditionsParser.RULE_date);
		try {
			this.state = 116;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				localctx = new DateConstructorxContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 104;
				this.match(ConditionsParser.DATE);
				this.state = 105;
				this.match(ConditionsParser.LPAREN);
				this.state = 106;
				(localctx as DateConstructorxContext)._year = this.number_(0);
				this.state = 107;
				this.match(ConditionsParser.COMMA);
				this.state = 108;
				(localctx as DateConstructorxContext)._month = this.number_(0);
				this.state = 109;
				this.match(ConditionsParser.COMMA);
				this.state = 110;
				(localctx as DateConstructorxContext)._day = this.number_(0);
				this.state = 111;
				this.match(ConditionsParser.RPAREN);
				}
				break;
			case 4:
			case 5:
				localctx = new DateIteratorxContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 113;
				this.iterator();
				}
				break;
			case 34:
				localctx = new DateIdentifierxContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 114;
				this.identifier(0);
				}
				break;
			case 33:
				localctx = new DateTextxContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 115;
				this.match(ConditionsParser.TEXT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public string_(): StringContext {
		let localctx: StringContext = new StringContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, ConditionsParser.RULE_string);
		try {
			this.state = 122;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
				localctx = new IteratorStringxContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 118;
				this.iterator();
				}
				break;
			case 33:
				localctx = new TextStringxContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 119;
				this.match(ConditionsParser.TEXT);
				}
				break;
			case 34:
				localctx = new IdentifierStringxContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 120;
				this.identifier(0);
				}
				break;
			case 32:
				localctx = new UnfinishedStringxContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 121;
				this.match(ConditionsParser.UNFINISHED_STRING);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public equatable(): EquatableContext {
		let localctx: EquatableContext = new EquatableContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, ConditionsParser.RULE_equatable);
		try {
			this.state = 126;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 10:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 124;
				this.bool();
				}
				break;
			case 1:
			case 4:
			case 5:
			case 15:
			case 22:
			case 31:
			case 32:
			case 33:
			case 34:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 125;
				this.comparable();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public equality(): EqualityContext {
		let localctx: EqualityContext = new EqualityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, ConditionsParser.RULE_equality);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 128;
			_la = this._input.LA(1);
			if(!(_la===20 || _la===21)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public binary(): BinaryContext {
		let localctx: BinaryContext = new BinaryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, ConditionsParser.RULE_binary);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 130;
			_la = this._input.LA(1);
			if(!(_la===6 || _la===7)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public comparable(): ComparableContext {
		let localctx: ComparableContext = new ComparableContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, ConditionsParser.RULE_comparable);
		try {
			this.state = 138;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 132;
				this.iterator();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 133;
				this.number_(0);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 134;
				this.date();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 135;
				this.identifier(0);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 136;
				this.match(ConditionsParser.TEXT);
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 137;
				this.match(ConditionsParser.UNFINISHED_STRING);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public iterator(): IteratorContext {
		let localctx: IteratorContext = new IteratorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, ConditionsParser.RULE_iterator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 140;
			_la = this._input.LA(1);
			if(!(_la===4 || _la===5)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 141;
			this.match(ConditionsParser.OF);
			this.state = 144;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
				{
				this.state = 142;
				this.array();
				}
				break;
			case 34:
				{
				this.state = 143;
				this.identifier(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public comparator(): ComparatorContext {
		let localctx: ComparatorContext = new ComparatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, ConditionsParser.RULE_comparator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 146;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 983040) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public array(): ArrayContext {
		let localctx: ArrayContext = new ArrayContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, ConditionsParser.RULE_array);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 148;
			this.match(ConditionsParser.LARRAYPAREN);
			this.state = 150;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 15)) & ~0x1F) === 0 && ((1 << (_la - 15)) & 851969) !== 0)) {
				{
				this.state = 149;
				this.arrayelements();
				}
			}

			this.state = 152;
			this.match(ConditionsParser.RARRAYPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayelements(): ArrayelementsContext {
		let localctx: ArrayelementsContext = new ArrayelementsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, ConditionsParser.RULE_arrayelements);
		let _la: number;
		try {
			this.state = 170;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 154;
				this.textarrayelement();
				this.state = 159;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===30) {
					{
					{
					this.state = 155;
					this.match(ConditionsParser.COMMA);
					this.state = 156;
					this.textarrayelement();
					}
					}
					this.state = 161;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 162;
				this.decimalarrayelement();
				this.state = 167;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===30) {
					{
					{
					this.state = 163;
					this.match(ConditionsParser.COMMA);
					this.state = 164;
					this.decimalarrayelement();
					}
					}
					this.state = 169;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public textarrayelement(): TextarrayelementContext {
		let localctx: TextarrayelementContext = new TextarrayelementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, ConditionsParser.RULE_textarrayelement);
		try {
			this.state = 174;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 34:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 172;
				this.identifier(0);
				}
				break;
			case 33:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 173;
				this.match(ConditionsParser.TEXT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public decimalarrayelement(): DecimalarrayelementContext {
		let localctx: DecimalarrayelementContext = new DecimalarrayelementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, ConditionsParser.RULE_decimalarrayelement);
		try {
			this.state = 178;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
			case 31:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 176;
				this.decimalConst();
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 177;
				this.identifier(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public identifier(): IdentifierContext;
	public identifier(_p: number): IdentifierContext;
	// @RuleVersion(0)
	public identifier(_p?: number): IdentifierContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: IdentifierContext = new IdentifierContext(this, this._ctx, _parentState);
		let _prevctx: IdentifierContext = localctx;
		let _startState: number = 30;
		this.enterRecursionRule(localctx, 30, ConditionsParser.RULE_identifier, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 181;
			this.match(ConditionsParser.IDENTIFIER);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 188;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 17, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new IdentifierContext(this, _parentctx, _parentState);
					this.pushNewRecursionContext(localctx, _startState, ConditionsParser.RULE_identifier);
					this.state = 183;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 184;
					this.match(ConditionsParser.COLON);
					this.state = 185;
					this.match(ConditionsParser.IDENTIFIER);
					}
					}
				}
				this.state = 190;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 17, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public bool(): BoolContext {
		let localctx: BoolContext = new BoolContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, ConditionsParser.RULE_bool);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 191;
			_la = this._input.LA(1);
			if(!(_la===9 || _la===10)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public decimalConst(): DecimalConstContext {
		let localctx: DecimalConstContext = new DecimalConstContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, ConditionsParser.RULE_decimalConst);
		try {
			this.state = 196;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 31:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 193;
				this.match(ConditionsParser.DECIMAL);
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 194;
				this.match(ConditionsParser.MINUS);
				this.state = 195;
				this.match(ConditionsParser.DECIMAL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 1:
			return this.expression_sempred(localctx as ExpressionContext, predIndex);
		case 2:
			return this.number_sempred(localctx as NumberContext, predIndex);
		case 15:
			return this.identifier_sempred(localctx as IdentifierContext, predIndex);
		}
		return true;
	}
	private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 4);
		case 1:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}
	private number_sempred(localctx: NumberContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 7);
		case 3:
			return this.precpred(this._ctx, 5);
		case 4:
			return this.precpred(this._ctx, 4);
		}
		return true;
	}
	private identifier_sempred(localctx: IdentifierContext, predIndex: number): boolean {
		switch (predIndex) {
		case 5:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,36,199,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,64,8,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,5,1,74,8,1,10,1,12,1,77,9,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,3,2,89,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,100,8,2,10,
	2,12,2,103,9,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,117,
	8,3,1,4,1,4,1,4,1,4,3,4,123,8,4,1,5,1,5,3,5,127,8,5,1,6,1,6,1,7,1,7,1,8,
	1,8,1,8,1,8,1,8,1,8,3,8,139,8,8,1,9,1,9,1,9,1,9,3,9,145,8,9,1,10,1,10,1,
	11,1,11,3,11,151,8,11,1,11,1,11,1,12,1,12,1,12,5,12,158,8,12,10,12,12,12,
	161,9,12,1,12,1,12,1,12,5,12,166,8,12,10,12,12,12,169,9,12,3,12,171,8,12,
	1,13,1,13,3,13,175,8,13,1,14,1,14,3,14,179,8,14,1,15,1,15,1,15,1,15,1,15,
	1,15,5,15,187,8,15,10,15,12,15,190,9,15,1,16,1,16,1,17,1,17,1,17,3,17,197,
	8,17,1,17,0,3,2,4,30,18,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
	0,7,1,0,12,13,1,0,14,15,1,0,20,21,1,0,6,7,1,0,4,5,1,0,16,19,1,0,9,10,215,
	0,36,1,0,0,0,2,63,1,0,0,0,4,88,1,0,0,0,6,116,1,0,0,0,8,122,1,0,0,0,10,126,
	1,0,0,0,12,128,1,0,0,0,14,130,1,0,0,0,16,138,1,0,0,0,18,140,1,0,0,0,20,
	146,1,0,0,0,22,148,1,0,0,0,24,170,1,0,0,0,26,174,1,0,0,0,28,178,1,0,0,0,
	30,180,1,0,0,0,32,191,1,0,0,0,34,196,1,0,0,0,36,37,3,2,1,0,37,38,5,0,0,
	1,38,1,1,0,0,0,39,40,6,1,-1,0,40,64,3,32,16,0,41,42,5,22,0,0,42,43,3,2,
	1,0,43,44,5,23,0,0,44,64,1,0,0,0,45,46,5,8,0,0,46,64,3,2,1,6,47,48,3,10,
	5,0,48,49,3,12,6,0,49,50,3,10,5,0,50,64,1,0,0,0,51,52,3,16,8,0,52,53,3,
	20,10,0,53,54,3,16,8,0,54,64,1,0,0,0,55,56,3,10,5,0,56,57,5,2,0,0,57,58,
	5,34,0,0,58,59,5,28,0,0,59,60,5,26,0,0,60,61,3,2,1,0,61,62,5,27,0,0,62,
	64,1,0,0,0,63,39,1,0,0,0,63,41,1,0,0,0,63,45,1,0,0,0,63,47,1,0,0,0,63,51,
	1,0,0,0,63,55,1,0,0,0,64,75,1,0,0,0,65,66,10,4,0,0,66,67,3,12,6,0,67,68,
	3,2,1,5,68,74,1,0,0,0,69,70,10,2,0,0,70,71,3,14,7,0,71,72,3,2,1,3,72,74,
	1,0,0,0,73,65,1,0,0,0,73,69,1,0,0,0,74,77,1,0,0,0,75,73,1,0,0,0,75,76,1,
	0,0,0,76,3,1,0,0,0,77,75,1,0,0,0,78,79,6,2,-1,0,79,80,5,22,0,0,80,81,3,
	4,2,0,81,82,5,23,0,0,82,89,1,0,0,0,83,84,5,15,0,0,84,89,3,4,2,6,85,89,3,
	18,9,0,86,89,3,30,15,0,87,89,5,31,0,0,88,78,1,0,0,0,88,83,1,0,0,0,88,85,
	1,0,0,0,88,86,1,0,0,0,88,87,1,0,0,0,89,101,1,0,0,0,90,91,10,7,0,0,91,92,
	5,11,0,0,92,100,3,4,2,8,93,94,10,5,0,0,94,95,7,0,0,0,95,100,3,4,2,6,96,
	97,10,4,0,0,97,98,7,1,0,0,98,100,3,4,2,5,99,90,1,0,0,0,99,93,1,0,0,0,99,
	96,1,0,0,0,100,103,1,0,0,0,101,99,1,0,0,0,101,102,1,0,0,0,102,5,1,0,0,0,
	103,101,1,0,0,0,104,105,5,1,0,0,105,106,5,22,0,0,106,107,3,4,2,0,107,108,
	5,30,0,0,108,109,3,4,2,0,109,110,5,30,0,0,110,111,3,4,2,0,111,112,5,23,
	0,0,112,117,1,0,0,0,113,117,3,18,9,0,114,117,3,30,15,0,115,117,5,33,0,0,
	116,104,1,0,0,0,116,113,1,0,0,0,116,114,1,0,0,0,116,115,1,0,0,0,117,7,1,
	0,0,0,118,123,3,18,9,0,119,123,5,33,0,0,120,123,3,30,15,0,121,123,5,32,
	0,0,122,118,1,0,0,0,122,119,1,0,0,0,122,120,1,0,0,0,122,121,1,0,0,0,123,
	9,1,0,0,0,124,127,3,32,16,0,125,127,3,16,8,0,126,124,1,0,0,0,126,125,1,
	0,0,0,127,11,1,0,0,0,128,129,7,2,0,0,129,13,1,0,0,0,130,131,7,3,0,0,131,
	15,1,0,0,0,132,139,3,18,9,0,133,139,3,4,2,0,134,139,3,6,3,0,135,139,3,30,
	15,0,136,139,5,33,0,0,137,139,5,32,0,0,138,132,1,0,0,0,138,133,1,0,0,0,
	138,134,1,0,0,0,138,135,1,0,0,0,138,136,1,0,0,0,138,137,1,0,0,0,139,17,
	1,0,0,0,140,141,7,4,0,0,141,144,5,3,0,0,142,145,3,22,11,0,143,145,3,30,
	15,0,144,142,1,0,0,0,144,143,1,0,0,0,145,19,1,0,0,0,146,147,7,5,0,0,147,
	21,1,0,0,0,148,150,5,24,0,0,149,151,3,24,12,0,150,149,1,0,0,0,150,151,1,
	0,0,0,151,152,1,0,0,0,152,153,5,25,0,0,153,23,1,0,0,0,154,159,3,26,13,0,
	155,156,5,30,0,0,156,158,3,26,13,0,157,155,1,0,0,0,158,161,1,0,0,0,159,
	157,1,0,0,0,159,160,1,0,0,0,160,171,1,0,0,0,161,159,1,0,0,0,162,167,3,28,
	14,0,163,164,5,30,0,0,164,166,3,28,14,0,165,163,1,0,0,0,166,169,1,0,0,0,
	167,165,1,0,0,0,167,168,1,0,0,0,168,171,1,0,0,0,169,167,1,0,0,0,170,154,
	1,0,0,0,170,162,1,0,0,0,171,25,1,0,0,0,172,175,3,30,15,0,173,175,5,33,0,
	0,174,172,1,0,0,0,174,173,1,0,0,0,175,27,1,0,0,0,176,179,3,34,17,0,177,
	179,3,30,15,0,178,176,1,0,0,0,178,177,1,0,0,0,179,29,1,0,0,0,180,181,6,
	15,-1,0,181,182,5,34,0,0,182,188,1,0,0,0,183,184,10,1,0,0,184,185,5,29,
	0,0,185,187,5,34,0,0,186,183,1,0,0,0,187,190,1,0,0,0,188,186,1,0,0,0,188,
	189,1,0,0,0,189,31,1,0,0,0,190,188,1,0,0,0,191,192,7,6,0,0,192,33,1,0,0,
	0,193,197,5,31,0,0,194,195,5,15,0,0,195,197,5,31,0,0,196,193,1,0,0,0,196,
	194,1,0,0,0,197,35,1,0,0,0,19,63,73,75,88,99,101,116,122,126,138,144,150,
	159,167,170,174,178,188,196];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ConditionsParser.__ATN) {
			ConditionsParser.__ATN = new ATNDeserializer().deserialize(ConditionsParser._serializedATN);
		}

		return ConditionsParser.__ATN;
	}


	static DecisionsToDFA = ConditionsParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ExpContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(ConditionsParser.EOF, 0);
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_exp;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterExp) {
	 		listener.enterExp(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitExp) {
	 		listener.exitExp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitExp) {
			return visitor.visitExp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_expression;
	}
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class ComparatorxContext extends ExpressionContext {
	public _left!: ComparableContext;
	public _op!: ComparatorContext;
	public _right!: ComparableContext;
	constructor(parser: ConditionsParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public comparable_list(): ComparableContext[] {
		return this.getTypedRuleContexts(ComparableContext) as ComparableContext[];
	}
	public comparable(i: number): ComparableContext {
		return this.getTypedRuleContext(ComparableContext, i) as ComparableContext;
	}
	public comparator(): ComparatorContext {
		return this.getTypedRuleContext(ComparatorContext, 0) as ComparatorContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterComparatorx) {
	 		listener.enterComparatorx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitComparatorx) {
	 		listener.exitComparatorx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitComparatorx) {
			return visitor.visitComparatorx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LambdaxContext extends ExpressionContext {
	constructor(parser: ConditionsParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public equatable(): EquatableContext {
		return this.getTypedRuleContext(EquatableContext, 0) as EquatableContext;
	}
	public IS(): TerminalNode {
		return this.getToken(ConditionsParser.IS, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ConditionsParser.IDENTIFIER, 0);
	}
	public LAMBDAARROW(): TerminalNode {
		return this.getToken(ConditionsParser.LAMBDAARROW, 0);
	}
	public LLAMBDAPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.LLAMBDAPAREN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RLAMBDAPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.RLAMBDAPAREN, 0);
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterLambdax) {
	 		listener.enterLambdax(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitLambdax) {
	 		listener.exitLambdax(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitLambdax) {
			return visitor.visitLambdax(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenxContext extends ExpressionContext {
	constructor(parser: ConditionsParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.LPAREN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.RPAREN, 0);
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterParenx) {
	 		listener.enterParenx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitParenx) {
	 		listener.exitParenx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitParenx) {
			return visitor.visitParenx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotxContext extends ExpressionContext {
	constructor(parser: ConditionsParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NOT(): TerminalNode {
		return this.getToken(ConditionsParser.NOT, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterNotx) {
	 		listener.enterNotx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitNotx) {
	 		listener.exitNotx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitNotx) {
			return visitor.visitNotx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BoolxContext extends ExpressionContext {
	constructor(parser: ConditionsParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public bool(): BoolContext {
		return this.getTypedRuleContext(BoolContext, 0) as BoolContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterBoolx) {
	 		listener.enterBoolx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitBoolx) {
	 		listener.exitBoolx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitBoolx) {
			return visitor.visitBoolx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualityxContext extends ExpressionContext {
	public _left!: EquatableContext;
	public _op!: EqualityContext;
	public _right!: EquatableContext;
	constructor(parser: ConditionsParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public equatable_list(): EquatableContext[] {
		return this.getTypedRuleContexts(EquatableContext) as EquatableContext[];
	}
	public equatable(i: number): EquatableContext {
		return this.getTypedRuleContext(EquatableContext, i) as EquatableContext;
	}
	public equality(): EqualityContext {
		return this.getTypedRuleContext(EqualityContext, 0) as EqualityContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterEqualityx) {
	 		listener.enterEqualityx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitEqualityx) {
	 		listener.exitEqualityx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitEqualityx) {
			return visitor.visitEqualityx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BinaryxContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _op!: BinaryContext;
	public _right!: ExpressionContext;
	constructor(parser: ConditionsParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public binary(): BinaryContext {
		return this.getTypedRuleContext(BinaryContext, 0) as BinaryContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterBinaryx) {
	 		listener.enterBinaryx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitBinaryx) {
	 		listener.exitBinaryx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitBinaryx) {
			return visitor.visitBinaryx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExpressionsequalityxContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _op!: EqualityContext;
	public _right!: ExpressionContext;
	constructor(parser: ConditionsParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public equality(): EqualityContext {
		return this.getTypedRuleContext(EqualityContext, 0) as EqualityContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterExpressionsequalityx) {
	 		listener.enterExpressionsequalityx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitExpressionsequalityx) {
	 		listener.exitExpressionsequalityx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitExpressionsequalityx) {
			return visitor.visitExpressionsequalityx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_number;
	}
	public copyFrom(ctx: NumberContext): void {
		super.copyFrom(ctx);
	}
}
export class PowerxContext extends NumberContext {
	public _a!: NumberContext;
	public _b!: NumberContext;
	constructor(parser: ConditionsParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public POWER(): TerminalNode {
		return this.getToken(ConditionsParser.POWER, 0);
	}
	public number__list(): NumberContext[] {
		return this.getTypedRuleContexts(NumberContext) as NumberContext[];
	}
	public number_(i: number): NumberContext {
		return this.getTypedRuleContext(NumberContext, i) as NumberContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterPowerx) {
	 		listener.enterPowerx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitPowerx) {
	 		listener.exitPowerx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitPowerx) {
			return visitor.visitPowerx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DecimalxContext extends NumberContext {
	constructor(parser: ConditionsParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(ConditionsParser.DECIMAL, 0);
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterDecimalx) {
	 		listener.enterDecimalx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitDecimalx) {
	 		listener.exitDecimalx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitDecimalx) {
			return visitor.visitDecimalx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberIteratorxContext extends NumberContext {
	constructor(parser: ConditionsParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public iterator(): IteratorContext {
		return this.getTypedRuleContext(IteratorContext, 0) as IteratorContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterNumberIteratorx) {
	 		listener.enterNumberIteratorx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitNumberIteratorx) {
	 		listener.exitNumberIteratorx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitNumberIteratorx) {
			return visitor.visitNumberIteratorx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberIdentifierxContext extends NumberContext {
	constructor(parser: ConditionsParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterNumberIdentifierx) {
	 		listener.enterNumberIdentifierx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitNumberIdentifierx) {
	 		listener.exitNumberIdentifierx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitNumberIdentifierx) {
			return visitor.visitNumberIdentifierx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParensxContext extends NumberContext {
	constructor(parser: ConditionsParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.LPAREN, 0);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.RPAREN, 0);
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterParensx) {
	 		listener.enterParensx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitParensx) {
	 		listener.exitParensx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitParensx) {
			return visitor.visitParensx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NegationxContext extends NumberContext {
	constructor(parser: ConditionsParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public MINUS(): TerminalNode {
		return this.getToken(ConditionsParser.MINUS, 0);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterNegationx) {
	 		listener.enterNegationx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitNegationx) {
	 		listener.exitNegationx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitNegationx) {
			return visitor.visitNegationx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicationxContext extends NumberContext {
	public _a!: NumberContext;
	public _op!: Token;
	public _b!: NumberContext;
	constructor(parser: ConditionsParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public number__list(): NumberContext[] {
		return this.getTypedRuleContexts(NumberContext) as NumberContext[];
	}
	public number_(i: number): NumberContext {
		return this.getTypedRuleContext(NumberContext, i) as NumberContext;
	}
	public MULTIPLICATION(): TerminalNode {
		return this.getToken(ConditionsParser.MULTIPLICATION, 0);
	}
	public DIVISION(): TerminalNode {
		return this.getToken(ConditionsParser.DIVISION, 0);
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterMultiplicationx) {
	 		listener.enterMultiplicationx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitMultiplicationx) {
	 		listener.exitMultiplicationx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitMultiplicationx) {
			return visitor.visitMultiplicationx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditionxContext extends NumberContext {
	public _a!: NumberContext;
	public _op!: Token;
	public _b!: NumberContext;
	constructor(parser: ConditionsParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public number__list(): NumberContext[] {
		return this.getTypedRuleContexts(NumberContext) as NumberContext[];
	}
	public number_(i: number): NumberContext {
		return this.getTypedRuleContext(NumberContext, i) as NumberContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(ConditionsParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(ConditionsParser.MINUS, 0);
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterAdditionx) {
	 		listener.enterAdditionx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitAdditionx) {
	 		listener.exitAdditionx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitAdditionx) {
			return visitor.visitAdditionx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_date;
	}
	public copyFrom(ctx: DateContext): void {
		super.copyFrom(ctx);
	}
}
export class DateIteratorxContext extends DateContext {
	constructor(parser: ConditionsParser, ctx: DateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public iterator(): IteratorContext {
		return this.getTypedRuleContext(IteratorContext, 0) as IteratorContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterDateIteratorx) {
	 		listener.enterDateIteratorx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitDateIteratorx) {
	 		listener.exitDateIteratorx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitDateIteratorx) {
			return visitor.visitDateIteratorx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateTextxContext extends DateContext {
	constructor(parser: ConditionsParser, ctx: DateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TEXT(): TerminalNode {
		return this.getToken(ConditionsParser.TEXT, 0);
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterDateTextx) {
	 		listener.enterDateTextx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitDateTextx) {
	 		listener.exitDateTextx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitDateTextx) {
			return visitor.visitDateTextx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateIdentifierxContext extends DateContext {
	constructor(parser: ConditionsParser, ctx: DateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterDateIdentifierx) {
	 		listener.enterDateIdentifierx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitDateIdentifierx) {
	 		listener.exitDateIdentifierx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitDateIdentifierx) {
			return visitor.visitDateIdentifierx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateConstructorxContext extends DateContext {
	public _year!: NumberContext;
	public _month!: NumberContext;
	public _day!: NumberContext;
	constructor(parser: ConditionsParser, ctx: DateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATE(): TerminalNode {
		return this.getToken(ConditionsParser.DATE, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.LPAREN, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ConditionsParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ConditionsParser.COMMA, i);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.RPAREN, 0);
	}
	public number__list(): NumberContext[] {
		return this.getTypedRuleContexts(NumberContext) as NumberContext[];
	}
	public number_(i: number): NumberContext {
		return this.getTypedRuleContext(NumberContext, i) as NumberContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterDateConstructorx) {
	 		listener.enterDateConstructorx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitDateConstructorx) {
	 		listener.exitDateConstructorx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitDateConstructorx) {
			return visitor.visitDateConstructorx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_string;
	}
	public copyFrom(ctx: StringContext): void {
		super.copyFrom(ctx);
	}
}
export class IteratorStringxContext extends StringContext {
	constructor(parser: ConditionsParser, ctx: StringContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public iterator(): IteratorContext {
		return this.getTypedRuleContext(IteratorContext, 0) as IteratorContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterIteratorStringx) {
	 		listener.enterIteratorStringx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitIteratorStringx) {
	 		listener.exitIteratorStringx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitIteratorStringx) {
			return visitor.visitIteratorStringx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnfinishedStringxContext extends StringContext {
	constructor(parser: ConditionsParser, ctx: StringContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public UNFINISHED_STRING(): TerminalNode {
		return this.getToken(ConditionsParser.UNFINISHED_STRING, 0);
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterUnfinishedStringx) {
	 		listener.enterUnfinishedStringx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitUnfinishedStringx) {
	 		listener.exitUnfinishedStringx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitUnfinishedStringx) {
			return visitor.visitUnfinishedStringx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TextStringxContext extends StringContext {
	constructor(parser: ConditionsParser, ctx: StringContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TEXT(): TerminalNode {
		return this.getToken(ConditionsParser.TEXT, 0);
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterTextStringx) {
	 		listener.enterTextStringx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitTextStringx) {
	 		listener.exitTextStringx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitTextStringx) {
			return visitor.visitTextStringx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IdentifierStringxContext extends StringContext {
	constructor(parser: ConditionsParser, ctx: StringContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterIdentifierStringx) {
	 		listener.enterIdentifierStringx(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitIdentifierStringx) {
	 		listener.exitIdentifierStringx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitIdentifierStringx) {
			return visitor.visitIdentifierStringx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EquatableContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public bool(): BoolContext {
		return this.getTypedRuleContext(BoolContext, 0) as BoolContext;
	}
	public comparable(): ComparableContext {
		return this.getTypedRuleContext(ComparableContext, 0) as ComparableContext;
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_equatable;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterEquatable) {
	 		listener.enterEquatable(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitEquatable) {
	 		listener.exitEquatable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitEquatable) {
			return visitor.visitEquatable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EqualityContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EQ(): TerminalNode {
		return this.getToken(ConditionsParser.EQ, 0);
	}
	public NEQ(): TerminalNode {
		return this.getToken(ConditionsParser.NEQ, 0);
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_equality;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterEquality) {
	 		listener.enterEquality(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitEquality) {
	 		listener.exitEquality(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitEquality) {
			return visitor.visitEquality(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BinaryContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public AND(): TerminalNode {
		return this.getToken(ConditionsParser.AND, 0);
	}
	public OR(): TerminalNode {
		return this.getToken(ConditionsParser.OR, 0);
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_binary;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterBinary) {
	 		listener.enterBinary(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitBinary) {
	 		listener.exitBinary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitBinary) {
			return visitor.visitBinary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComparableContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public iterator(): IteratorContext {
		return this.getTypedRuleContext(IteratorContext, 0) as IteratorContext;
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public date(): DateContext {
		return this.getTypedRuleContext(DateContext, 0) as DateContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public TEXT(): TerminalNode {
		return this.getToken(ConditionsParser.TEXT, 0);
	}
	public UNFINISHED_STRING(): TerminalNode {
		return this.getToken(ConditionsParser.UNFINISHED_STRING, 0);
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_comparable;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterComparable) {
	 		listener.enterComparable(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitComparable) {
	 		listener.exitComparable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitComparable) {
			return visitor.visitComparable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IteratorContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OF(): TerminalNode {
		return this.getToken(ConditionsParser.OF, 0);
	}
	public ANY(): TerminalNode {
		return this.getToken(ConditionsParser.ANY, 0);
	}
	public ALL(): TerminalNode {
		return this.getToken(ConditionsParser.ALL, 0);
	}
	public array(): ArrayContext {
		return this.getTypedRuleContext(ArrayContext, 0) as ArrayContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_iterator;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterIterator) {
	 		listener.enterIterator(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitIterator) {
	 		listener.exitIterator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitIterator) {
			return visitor.visitIterator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ComparatorContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public GT(): TerminalNode {
		return this.getToken(ConditionsParser.GT, 0);
	}
	public GE(): TerminalNode {
		return this.getToken(ConditionsParser.GE, 0);
	}
	public LT(): TerminalNode {
		return this.getToken(ConditionsParser.LT, 0);
	}
	public LE(): TerminalNode {
		return this.getToken(ConditionsParser.LE, 0);
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_comparator;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterComparator) {
	 		listener.enterComparator(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitComparator) {
	 		listener.exitComparator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitComparator) {
			return visitor.visitComparator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LARRAYPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.LARRAYPAREN, 0);
	}
	public RARRAYPAREN(): TerminalNode {
		return this.getToken(ConditionsParser.RARRAYPAREN, 0);
	}
	public arrayelements(): ArrayelementsContext {
		return this.getTypedRuleContext(ArrayelementsContext, 0) as ArrayelementsContext;
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_array;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterArray) {
	 		listener.enterArray(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitArray) {
	 		listener.exitArray(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitArray) {
			return visitor.visitArray(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayelementsContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public textarrayelement_list(): TextarrayelementContext[] {
		return this.getTypedRuleContexts(TextarrayelementContext) as TextarrayelementContext[];
	}
	public textarrayelement(i: number): TextarrayelementContext {
		return this.getTypedRuleContext(TextarrayelementContext, i) as TextarrayelementContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ConditionsParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ConditionsParser.COMMA, i);
	}
	public decimalarrayelement_list(): DecimalarrayelementContext[] {
		return this.getTypedRuleContexts(DecimalarrayelementContext) as DecimalarrayelementContext[];
	}
	public decimalarrayelement(i: number): DecimalarrayelementContext {
		return this.getTypedRuleContext(DecimalarrayelementContext, i) as DecimalarrayelementContext;
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_arrayelements;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterArrayelements) {
	 		listener.enterArrayelements(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitArrayelements) {
	 		listener.exitArrayelements(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitArrayelements) {
			return visitor.visitArrayelements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TextarrayelementContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public TEXT(): TerminalNode {
		return this.getToken(ConditionsParser.TEXT, 0);
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_textarrayelement;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterTextarrayelement) {
	 		listener.enterTextarrayelement(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitTextarrayelement) {
	 		listener.exitTextarrayelement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitTextarrayelement) {
			return visitor.visitTextarrayelement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DecimalarrayelementContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public decimalConst(): DecimalConstContext {
		return this.getTypedRuleContext(DecimalConstContext, 0) as DecimalConstContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_decimalarrayelement;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterDecimalarrayelement) {
	 		listener.enterDecimalarrayelement(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitDecimalarrayelement) {
	 		listener.exitDecimalarrayelement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitDecimalarrayelement) {
			return visitor.visitDecimalarrayelement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(ConditionsParser.IDENTIFIER, 0);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(ConditionsParser.COLON, 0);
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_identifier;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterIdentifier) {
	 		listener.enterIdentifier(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitIdentifier) {
	 		listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BoolContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TRUE(): TerminalNode {
		return this.getToken(ConditionsParser.TRUE, 0);
	}
	public FALSE(): TerminalNode {
		return this.getToken(ConditionsParser.FALSE, 0);
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_bool;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterBool) {
	 		listener.enterBool(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitBool) {
	 		listener.exitBool(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitBool) {
			return visitor.visitBool(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DecimalConstContext extends ParserRuleContext {
	constructor(parser?: ConditionsParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(ConditionsParser.DECIMAL, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(ConditionsParser.MINUS, 0);
	}
    public get ruleIndex(): number {
    	return ConditionsParser.RULE_decimalConst;
	}
	public enterRule(listener: ConditionsListener): void {
	    if(listener.enterDecimalConst) {
	 		listener.enterDecimalConst(this);
		}
	}
	public exitRule(listener: ConditionsListener): void {
	    if(listener.exitDecimalConst) {
	 		listener.exitDecimalConst(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ConditionsVisitor<Result>): Result {
		if (visitor.visitDecimalConst) {
			return visitor.visitDecimalConst(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
