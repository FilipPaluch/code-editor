// Generated from MappingsGrammar.g4 by ANTLR 4.13.1
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
import MappingsGrammarListener from "./MappingsGrammarListener.js";
import MappingsGrammarVisitor from "./MappingsGrammarVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class MappingsGrammarParser extends Parser {
	public static readonly NULL = 1;
	public static readonly NULLCOALESCING = 2;
	public static readonly ASSIGN = 3;
	public static readonly CONDITIONALASSIGN = 4;
	public static readonly END = 5;
	public static readonly FORMAT = 6;
	public static readonly LENGTH = 7;
	public static readonly COUNT = 8;
	public static readonly BOOL = 9;
	public static readonly POWER = 10;
	public static readonly MULTIPLICATION = 11;
	public static readonly DIVISION = 12;
	public static readonly PLUS = 13;
	public static readonly MINUS = 14;
	public static readonly LPAREN = 15;
	public static readonly RPAREN = 16;
	public static readonly LARRAYPAREN = 17;
	public static readonly RARRAYPAREN = 18;
	public static readonly COLON = 19;
	public static readonly COMMA = 20;
	public static readonly DECIMAL = 21;
	public static readonly UNFINISHED_STRING = 22;
	public static readonly TEXT = 23;
	public static readonly IDENTIFIER = 24;
	public static readonly WS = 25;
	public static readonly ERROR_CHAR = 26;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_exp = 0;
	public static readonly RULE_mapping = 1;
	public static readonly RULE_expression = 2;
	public static readonly RULE_formatExpression = 3;
	public static readonly RULE_nullCoalescing = 4;
	public static readonly RULE_nullCoalescingRightSide = 5;
	public static readonly RULE_roundedNumber = 6;
	public static readonly RULE_number = 7;
	public static readonly RULE_date = 8;
	public static readonly RULE_indexer = 9;
	public static readonly RULE_array = 10;
	public static readonly RULE_arrayElements = 11;
	public static readonly RULE_constant = 12;
	public static readonly RULE_input = 13;
	public static readonly RULE_output = 14;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            "'??'", "':='", 
                                                            "':?='", "';'", 
                                                            null, null, 
                                                            null, null, 
                                                            "'^'", "'*'", 
                                                            "'/'", "'+'", 
                                                            "'-'", "'('", 
                                                            "')'", "'['", 
                                                            "']'", "':'", 
                                                            "','" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "NULL", 
                                                             "NULLCOALESCING", 
                                                             "ASSIGN", "CONDITIONALASSIGN", 
                                                             "END", "FORMAT", 
                                                             "LENGTH", "COUNT", 
                                                             "BOOL", "POWER", 
                                                             "MULTIPLICATION", 
                                                             "DIVISION", 
                                                             "PLUS", "MINUS", 
                                                             "LPAREN", "RPAREN", 
                                                             "LARRAYPAREN", 
                                                             "RARRAYPAREN", 
                                                             "COLON", "COMMA", 
                                                             "DECIMAL", 
                                                             "UNFINISHED_STRING", 
                                                             "TEXT", "IDENTIFIER", 
                                                             "WS", "ERROR_CHAR" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"exp", "mapping", "expression", "formatExpression", "nullCoalescing", 
		"nullCoalescingRightSide", "roundedNumber", "number", "date", "indexer", 
		"array", "arrayElements", "constant", "input", "output",
	];
	public get grammarFileName(): string { return "MappingsGrammar.g4"; }
	public get literalNames(): (string | null)[] { return MappingsGrammarParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return MappingsGrammarParser.symbolicNames; }
	public get ruleNames(): string[] { return MappingsGrammarParser.ruleNames; }
	public get serializedATN(): number[] { return MappingsGrammarParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, MappingsGrammarParser._ATN, MappingsGrammarParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public exp(): ExpContext {
		let localctx: ExpContext = new ExpContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, MappingsGrammarParser.RULE_exp);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 30;
			this.mapping(0);
			this.state = 31;
			this.match(MappingsGrammarParser.EOF);
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

	public mapping(): MappingContext;
	public mapping(_p: number): MappingContext;
	// @RuleVersion(0)
	public mapping(_p?: number): MappingContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: MappingContext = new MappingContext(this, this._ctx, _parentState);
		let _prevctx: MappingContext = localctx;
		let _startState: number = 2;
		this.enterRecursionRule(localctx, 2, MappingsGrammarParser.RULE_mapping, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 46;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				{
				localctx = new BasicMappingContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 34;
				this.output();
				this.state = 35;
				this.match(MappingsGrammarParser.ASSIGN);
				this.state = 36;
				this.expression();
				this.state = 38;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
				case 1:
					{
					this.state = 37;
					this.match(MappingsGrammarParser.END);
					}
					break;
				}
				}
				break;
			case 2:
				{
				localctx = new ConditionalMappingContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 40;
				this.output();
				this.state = 41;
				this.match(MappingsGrammarParser.CONDITIONALASSIGN);
				this.state = 42;
				this.input();
				this.state = 44;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
				case 1:
					{
					this.state = 43;
					this.match(MappingsGrammarParser.END);
					}
					break;
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 53;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new ManyMappingsContext(this, new MappingContext(this, _parentctx, _parentState));
					this.pushNewRecursionContext(localctx, _startState, MappingsGrammarParser.RULE_mapping);
					this.state = 48;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 49;
					this.match(MappingsGrammarParser.END);
					this.state = 50;
					this.mapping(2);
					}
					}
				}
				this.state = 55;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
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
	public expression(): ExpressionContext {
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, MappingsGrammarParser.RULE_expression);
		try {
			this.state = 65;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 56;
				this.constant();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 57;
				this.input();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 58;
				this.nullCoalescing();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 59;
				this.indexer();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 60;
				this.array();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 61;
				this.roundedNumber();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 62;
				this.date();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 63;
				this.formatExpression();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 64;
				this.match(MappingsGrammarParser.NULL);
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
	public formatExpression(): FormatExpressionContext {
		let localctx: FormatExpressionContext = new FormatExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, MappingsGrammarParser.RULE_formatExpression);
		try {
			this.state = 81;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				localctx = new FormatExpressionVarDateFormatContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 67;
				this.match(MappingsGrammarParser.FORMAT);
				this.state = 68;
				this.match(MappingsGrammarParser.LPAREN);
				this.state = 69;
				(localctx as FormatExpressionVarDateFormatContext)._value = this.input();
				this.state = 70;
				this.match(MappingsGrammarParser.COMMA);
				this.state = 71;
				(localctx as FormatExpressionVarDateFormatContext)._dateFormat = this.input();
				this.state = 72;
				this.match(MappingsGrammarParser.RPAREN);
				}
				break;
			case 2:
				localctx = new FormatExpressionConstDateFormatContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 74;
				this.match(MappingsGrammarParser.FORMAT);
				this.state = 75;
				this.match(MappingsGrammarParser.LPAREN);
				this.state = 76;
				(localctx as FormatExpressionConstDateFormatContext)._value = this.input();
				this.state = 77;
				this.match(MappingsGrammarParser.COMMA);
				this.state = 78;
				(localctx as FormatExpressionConstDateFormatContext)._dateFormat = this.match(MappingsGrammarParser.TEXT);
				this.state = 79;
				this.match(MappingsGrammarParser.RPAREN);
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
	public nullCoalescing(): NullCoalescingContext {
		let localctx: NullCoalescingContext = new NullCoalescingContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, MappingsGrammarParser.RULE_nullCoalescing);
		try {
			let _alt: number;
			this.state = 93;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 83;
				this.input();
				this.state = 85;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 84;
						this.nullCoalescingRightSide();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 87;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 89;
				this.match(MappingsGrammarParser.LPAREN);
				this.state = 90;
				this.nullCoalescing();
				this.state = 91;
				this.match(MappingsGrammarParser.RPAREN);
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
	public nullCoalescingRightSide(): NullCoalescingRightSideContext {
		let localctx: NullCoalescingRightSideContext = new NullCoalescingRightSideContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, MappingsGrammarParser.RULE_nullCoalescingRightSide);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 95;
			this.match(MappingsGrammarParser.NULLCOALESCING);
			this.state = 99;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 24:
				{
				this.state = 96;
				this.input();
				}
				break;
			case 9:
			case 14:
			case 21:
			case 23:
				{
				this.state = 97;
				this.constant();
				}
				break;
			case 1:
				{
				this.state = 98;
				this.match(MappingsGrammarParser.NULL);
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
	public roundedNumber(): RoundedNumberContext {
		let localctx: RoundedNumberContext = new RoundedNumberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, MappingsGrammarParser.RULE_roundedNumber);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 101;
			this.number_(0);
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
		let _startState: number = 14;
		this.enterRecursionRule(localctx, 14, MappingsGrammarParser.RULE_number, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 126;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				localctx = new ParensxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 104;
				this.match(MappingsGrammarParser.LPAREN);
				this.state = 105;
				this.number_(0);
				this.state = 106;
				this.match(MappingsGrammarParser.RPAREN);
				}
				break;
			case 2:
				{
				localctx = new NegationxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 108;
				this.match(MappingsGrammarParser.MINUS);
				this.state = 109;
				this.number_(8);
				}
				break;
			case 3:
				{
				localctx = new MathNullCoalescingxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 110;
				this.nullCoalescing();
				}
				break;
			case 4:
				{
				localctx = new DecimalxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 111;
				this.match(MappingsGrammarParser.DECIMAL);
				}
				break;
			case 5:
				{
				localctx = new MathIdentifierxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 112;
				this.input();
				}
				break;
			case 6:
				{
				localctx = new LengthxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 113;
				this.match(MappingsGrammarParser.LENGTH);
				this.state = 114;
				this.match(MappingsGrammarParser.LPAREN);
				this.state = 115;
				this.input();
				this.state = 116;
				this.match(MappingsGrammarParser.RPAREN);
				}
				break;
			case 7:
				{
				localctx = new CountxContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 118;
				this.match(MappingsGrammarParser.COUNT);
				this.state = 119;
				this.match(MappingsGrammarParser.LPAREN);
				this.state = 122;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 17:
					{
					this.state = 120;
					this.array();
					}
					break;
				case 24:
					{
					this.state = 121;
					this.input();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 124;
				this.match(MappingsGrammarParser.RPAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 139;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 137;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 11, this._ctx) ) {
					case 1:
						{
						localctx = new PowerxContext(this, new NumberContext(this, _parentctx, _parentState));
						(localctx as PowerxContext)._a = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, MappingsGrammarParser.RULE_number);
						this.state = 128;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 129;
						this.match(MappingsGrammarParser.POWER);
						this.state = 130;
						(localctx as PowerxContext)._b = this.number_(10);
						}
						break;
					case 2:
						{
						localctx = new MultiplicationxContext(this, new NumberContext(this, _parentctx, _parentState));
						(localctx as MultiplicationxContext)._a = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, MappingsGrammarParser.RULE_number);
						this.state = 131;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 132;
						(localctx as MultiplicationxContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===11 || _la===12)) {
						    (localctx as MultiplicationxContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 133;
						(localctx as MultiplicationxContext)._b = this.number_(8);
						}
						break;
					case 3:
						{
						localctx = new AdditionxContext(this, new NumberContext(this, _parentctx, _parentState));
						(localctx as AdditionxContext)._a = _prevctx;
						this.pushNewRecursionContext(localctx, _startState, MappingsGrammarParser.RULE_number);
						this.state = 134;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 135;
						(localctx as AdditionxContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(_la===13 || _la===14)) {
						    (localctx as AdditionxContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 136;
						(localctx as AdditionxContext)._b = this.number_(7);
						}
						break;
					}
					}
				}
				this.state = 141;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
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
		this.enterRule(localctx, 16, MappingsGrammarParser.RULE_date);
		try {
			this.state = 145;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				localctx = new DateNullCoalescingxContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 142;
				this.nullCoalescing();
				}
				break;
			case 2:
				localctx = new DateTextxContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 143;
				this.match(MappingsGrammarParser.TEXT);
				}
				break;
			case 3:
				localctx = new DateIdentifierxContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 144;
				this.input();
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
	public indexer(): IndexerContext {
		let localctx: IndexerContext = new IndexerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, MappingsGrammarParser.RULE_indexer);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 149;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 17:
				{
				this.state = 147;
				this.array();
				}
				break;
			case 24:
				{
				this.state = 148;
				this.input();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 151;
			this.match(MappingsGrammarParser.LARRAYPAREN);
			this.state = 152;
			localctx._index = this.number_(0);
			this.state = 153;
			this.match(MappingsGrammarParser.RARRAYPAREN);
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
		this.enterRule(localctx, 20, MappingsGrammarParser.RULE_array);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 155;
			this.match(MappingsGrammarParser.LARRAYPAREN);
			this.state = 157;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 27444162) !== 0)) {
				{
				this.state = 156;
				this.arrayElements();
				}
			}

			this.state = 159;
			this.match(MappingsGrammarParser.RARRAYPAREN);
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
	public arrayElements(): ArrayElementsContext {
		let localctx: ArrayElementsContext = new ArrayElementsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, MappingsGrammarParser.RULE_arrayElements);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 161;
			this.expression();
			this.state = 166;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===20) {
				{
				{
				this.state = 162;
				this.match(MappingsGrammarParser.COMMA);
				this.state = 163;
				this.expression();
				}
				}
				this.state = 168;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
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
	public constant(): ConstantContext {
		let localctx: ConstantContext = new ConstantContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, MappingsGrammarParser.RULE_constant);
		try {
			this.state = 174;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 21:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 169;
				this.match(MappingsGrammarParser.DECIMAL);
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 170;
				this.match(MappingsGrammarParser.MINUS);
				this.state = 171;
				this.match(MappingsGrammarParser.DECIMAL);
				}
				break;
			case 23:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 172;
				this.match(MappingsGrammarParser.TEXT);
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 173;
				this.match(MappingsGrammarParser.BOOL);
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
	public input(): InputContext {
		let localctx: InputContext = new InputContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, MappingsGrammarParser.RULE_input);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 176;
			this.match(MappingsGrammarParser.IDENTIFIER);
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
	public output(): OutputContext {
		let localctx: OutputContext = new OutputContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, MappingsGrammarParser.RULE_output);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 178;
			this.match(MappingsGrammarParser.IDENTIFIER);
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
			return this.mapping_sempred(localctx as MappingContext, predIndex);
		case 7:
			return this.number_sempred(localctx as NumberContext, predIndex);
		}
		return true;
	}
	private mapping_sempred(localctx: MappingContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private number_sempred(localctx: NumberContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 9);
		case 2:
			return this.precpred(this._ctx, 7);
		case 3:
			return this.precpred(this._ctx, 6);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,26,181,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,1,0,1,0,1,0,1,1,1,1,1,1,
	1,1,1,1,3,1,39,8,1,1,1,1,1,1,1,1,1,3,1,45,8,1,3,1,47,8,1,1,1,1,1,1,1,5,
	1,52,8,1,10,1,12,1,55,9,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,66,8,
	2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,82,8,3,1,
	4,1,4,4,4,86,8,4,11,4,12,4,87,1,4,1,4,1,4,1,4,3,4,94,8,4,1,5,1,5,1,5,1,
	5,3,5,100,8,5,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,7,1,
	7,1,7,1,7,1,7,1,7,1,7,1,7,3,7,123,8,7,1,7,1,7,3,7,127,8,7,1,7,1,7,1,7,1,
	7,1,7,1,7,1,7,1,7,1,7,5,7,138,8,7,10,7,12,7,141,9,7,1,8,1,8,1,8,3,8,146,
	8,8,1,9,1,9,3,9,150,8,9,1,9,1,9,1,9,1,9,1,10,1,10,3,10,158,8,10,1,10,1,
	10,1,11,1,11,1,11,5,11,165,8,11,10,11,12,11,168,9,11,1,12,1,12,1,12,1,12,
	1,12,3,12,175,8,12,1,13,1,13,1,14,1,14,1,14,0,2,2,14,15,0,2,4,6,8,10,12,
	14,16,18,20,22,24,26,28,0,2,1,0,11,12,1,0,13,14,200,0,30,1,0,0,0,2,46,1,
	0,0,0,4,65,1,0,0,0,6,81,1,0,0,0,8,93,1,0,0,0,10,95,1,0,0,0,12,101,1,0,0,
	0,14,126,1,0,0,0,16,145,1,0,0,0,18,149,1,0,0,0,20,155,1,0,0,0,22,161,1,
	0,0,0,24,174,1,0,0,0,26,176,1,0,0,0,28,178,1,0,0,0,30,31,3,2,1,0,31,32,
	5,0,0,1,32,1,1,0,0,0,33,34,6,1,-1,0,34,35,3,28,14,0,35,36,5,3,0,0,36,38,
	3,4,2,0,37,39,5,5,0,0,38,37,1,0,0,0,38,39,1,0,0,0,39,47,1,0,0,0,40,41,3,
	28,14,0,41,42,5,4,0,0,42,44,3,26,13,0,43,45,5,5,0,0,44,43,1,0,0,0,44,45,
	1,0,0,0,45,47,1,0,0,0,46,33,1,0,0,0,46,40,1,0,0,0,47,53,1,0,0,0,48,49,10,
	1,0,0,49,50,5,5,0,0,50,52,3,2,1,2,51,48,1,0,0,0,52,55,1,0,0,0,53,51,1,0,
	0,0,53,54,1,0,0,0,54,3,1,0,0,0,55,53,1,0,0,0,56,66,3,24,12,0,57,66,3,26,
	13,0,58,66,3,8,4,0,59,66,3,18,9,0,60,66,3,20,10,0,61,66,3,12,6,0,62,66,
	3,16,8,0,63,66,3,6,3,0,64,66,5,1,0,0,65,56,1,0,0,0,65,57,1,0,0,0,65,58,
	1,0,0,0,65,59,1,0,0,0,65,60,1,0,0,0,65,61,1,0,0,0,65,62,1,0,0,0,65,63,1,
	0,0,0,65,64,1,0,0,0,66,5,1,0,0,0,67,68,5,6,0,0,68,69,5,15,0,0,69,70,3,26,
	13,0,70,71,5,20,0,0,71,72,3,26,13,0,72,73,5,16,0,0,73,82,1,0,0,0,74,75,
	5,6,0,0,75,76,5,15,0,0,76,77,3,26,13,0,77,78,5,20,0,0,78,79,5,23,0,0,79,
	80,5,16,0,0,80,82,1,0,0,0,81,67,1,0,0,0,81,74,1,0,0,0,82,7,1,0,0,0,83,85,
	3,26,13,0,84,86,3,10,5,0,85,84,1,0,0,0,86,87,1,0,0,0,87,85,1,0,0,0,87,88,
	1,0,0,0,88,94,1,0,0,0,89,90,5,15,0,0,90,91,3,8,4,0,91,92,5,16,0,0,92,94,
	1,0,0,0,93,83,1,0,0,0,93,89,1,0,0,0,94,9,1,0,0,0,95,99,5,2,0,0,96,100,3,
	26,13,0,97,100,3,24,12,0,98,100,5,1,0,0,99,96,1,0,0,0,99,97,1,0,0,0,99,
	98,1,0,0,0,100,11,1,0,0,0,101,102,3,14,7,0,102,13,1,0,0,0,103,104,6,7,-1,
	0,104,105,5,15,0,0,105,106,3,14,7,0,106,107,5,16,0,0,107,127,1,0,0,0,108,
	109,5,14,0,0,109,127,3,14,7,8,110,127,3,8,4,0,111,127,5,21,0,0,112,127,
	3,26,13,0,113,114,5,7,0,0,114,115,5,15,0,0,115,116,3,26,13,0,116,117,5,
	16,0,0,117,127,1,0,0,0,118,119,5,8,0,0,119,122,5,15,0,0,120,123,3,20,10,
	0,121,123,3,26,13,0,122,120,1,0,0,0,122,121,1,0,0,0,123,124,1,0,0,0,124,
	125,5,16,0,0,125,127,1,0,0,0,126,103,1,0,0,0,126,108,1,0,0,0,126,110,1,
	0,0,0,126,111,1,0,0,0,126,112,1,0,0,0,126,113,1,0,0,0,126,118,1,0,0,0,127,
	139,1,0,0,0,128,129,10,9,0,0,129,130,5,10,0,0,130,138,3,14,7,10,131,132,
	10,7,0,0,132,133,7,0,0,0,133,138,3,14,7,8,134,135,10,6,0,0,135,136,7,1,
	0,0,136,138,3,14,7,7,137,128,1,0,0,0,137,131,1,0,0,0,137,134,1,0,0,0,138,
	141,1,0,0,0,139,137,1,0,0,0,139,140,1,0,0,0,140,15,1,0,0,0,141,139,1,0,
	0,0,142,146,3,8,4,0,143,146,5,23,0,0,144,146,3,26,13,0,145,142,1,0,0,0,
	145,143,1,0,0,0,145,144,1,0,0,0,146,17,1,0,0,0,147,150,3,20,10,0,148,150,
	3,26,13,0,149,147,1,0,0,0,149,148,1,0,0,0,150,151,1,0,0,0,151,152,5,17,
	0,0,152,153,3,14,7,0,153,154,5,18,0,0,154,19,1,0,0,0,155,157,5,17,0,0,156,
	158,3,22,11,0,157,156,1,0,0,0,157,158,1,0,0,0,158,159,1,0,0,0,159,160,5,
	18,0,0,160,21,1,0,0,0,161,166,3,4,2,0,162,163,5,20,0,0,163,165,3,4,2,0,
	164,162,1,0,0,0,165,168,1,0,0,0,166,164,1,0,0,0,166,167,1,0,0,0,167,23,
	1,0,0,0,168,166,1,0,0,0,169,175,5,21,0,0,170,171,5,14,0,0,171,175,5,21,
	0,0,172,175,5,23,0,0,173,175,5,9,0,0,174,169,1,0,0,0,174,170,1,0,0,0,174,
	172,1,0,0,0,174,173,1,0,0,0,175,25,1,0,0,0,176,177,5,24,0,0,177,27,1,0,
	0,0,178,179,5,24,0,0,179,29,1,0,0,0,18,38,44,46,53,65,81,87,93,99,122,126,
	137,139,145,149,157,166,174];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!MappingsGrammarParser.__ATN) {
			MappingsGrammarParser.__ATN = new ATNDeserializer().deserialize(MappingsGrammarParser._serializedATN);
		}

		return MappingsGrammarParser.__ATN;
	}


	static DecisionsToDFA = MappingsGrammarParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ExpContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public mapping(): MappingContext {
		return this.getTypedRuleContext(MappingContext, 0) as MappingContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(MappingsGrammarParser.EOF, 0);
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_exp;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterExp) {
	 		listener.enterExp(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitExp) {
	 		listener.exitExp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitExp) {
			return visitor.visitExp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MappingContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_mapping;
	}
	public copyFrom(ctx: MappingContext): void {
		super.copyFrom(ctx);
	}
}
export class BasicMappingContext extends MappingContext {
	constructor(parser: MappingsGrammarParser, ctx: MappingContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public output(): OutputContext {
		return this.getTypedRuleContext(OutputContext, 0) as OutputContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.ASSIGN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public END(): TerminalNode {
		return this.getToken(MappingsGrammarParser.END, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterBasicMapping) {
	 		listener.enterBasicMapping(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitBasicMapping) {
	 		listener.exitBasicMapping(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitBasicMapping) {
			return visitor.visitBasicMapping(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ManyMappingsContext extends MappingContext {
	constructor(parser: MappingsGrammarParser, ctx: MappingContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public mapping_list(): MappingContext[] {
		return this.getTypedRuleContexts(MappingContext) as MappingContext[];
	}
	public mapping(i: number): MappingContext {
		return this.getTypedRuleContext(MappingContext, i) as MappingContext;
	}
	public END(): TerminalNode {
		return this.getToken(MappingsGrammarParser.END, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterManyMappings) {
	 		listener.enterManyMappings(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitManyMappings) {
	 		listener.exitManyMappings(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitManyMappings) {
			return visitor.visitManyMappings(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConditionalMappingContext extends MappingContext {
	constructor(parser: MappingsGrammarParser, ctx: MappingContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public output(): OutputContext {
		return this.getTypedRuleContext(OutputContext, 0) as OutputContext;
	}
	public CONDITIONALASSIGN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.CONDITIONALASSIGN, 0);
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
	public END(): TerminalNode {
		return this.getToken(MappingsGrammarParser.END, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterConditionalMapping) {
	 		listener.enterConditionalMapping(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitConditionalMapping) {
	 		listener.exitConditionalMapping(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitConditionalMapping) {
			return visitor.visitConditionalMapping(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public constant(): ConstantContext {
		return this.getTypedRuleContext(ConstantContext, 0) as ConstantContext;
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
	public nullCoalescing(): NullCoalescingContext {
		return this.getTypedRuleContext(NullCoalescingContext, 0) as NullCoalescingContext;
	}
	public indexer(): IndexerContext {
		return this.getTypedRuleContext(IndexerContext, 0) as IndexerContext;
	}
	public array(): ArrayContext {
		return this.getTypedRuleContext(ArrayContext, 0) as ArrayContext;
	}
	public roundedNumber(): RoundedNumberContext {
		return this.getTypedRuleContext(RoundedNumberContext, 0) as RoundedNumberContext;
	}
	public date(): DateContext {
		return this.getTypedRuleContext(DateContext, 0) as DateContext;
	}
	public formatExpression(): FormatExpressionContext {
		return this.getTypedRuleContext(FormatExpressionContext, 0) as FormatExpressionContext;
	}
	public NULL(): TerminalNode {
		return this.getToken(MappingsGrammarParser.NULL, 0);
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_expression;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterExpression) {
	 		listener.enterExpression(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitExpression) {
	 		listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormatExpressionContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_formatExpression;
	}
	public copyFrom(ctx: FormatExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class FormatExpressionConstDateFormatContext extends FormatExpressionContext {
	public _value!: InputContext;
	public _dateFormat!: Token;
	constructor(parser: MappingsGrammarParser, ctx: FormatExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public FORMAT(): TerminalNode {
		return this.getToken(MappingsGrammarParser.FORMAT, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.LPAREN, 0);
	}
	public COMMA(): TerminalNode {
		return this.getToken(MappingsGrammarParser.COMMA, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.RPAREN, 0);
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
	public TEXT(): TerminalNode {
		return this.getToken(MappingsGrammarParser.TEXT, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterFormatExpressionConstDateFormat) {
	 		listener.enterFormatExpressionConstDateFormat(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitFormatExpressionConstDateFormat) {
	 		listener.exitFormatExpressionConstDateFormat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitFormatExpressionConstDateFormat) {
			return visitor.visitFormatExpressionConstDateFormat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FormatExpressionVarDateFormatContext extends FormatExpressionContext {
	public _value!: InputContext;
	public _dateFormat!: InputContext;
	constructor(parser: MappingsGrammarParser, ctx: FormatExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public FORMAT(): TerminalNode {
		return this.getToken(MappingsGrammarParser.FORMAT, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.LPAREN, 0);
	}
	public COMMA(): TerminalNode {
		return this.getToken(MappingsGrammarParser.COMMA, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.RPAREN, 0);
	}
	public input_list(): InputContext[] {
		return this.getTypedRuleContexts(InputContext) as InputContext[];
	}
	public input(i: number): InputContext {
		return this.getTypedRuleContext(InputContext, i) as InputContext;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterFormatExpressionVarDateFormat) {
	 		listener.enterFormatExpressionVarDateFormat(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitFormatExpressionVarDateFormat) {
	 		listener.exitFormatExpressionVarDateFormat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitFormatExpressionVarDateFormat) {
			return visitor.visitFormatExpressionVarDateFormat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NullCoalescingContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
	public nullCoalescingRightSide_list(): NullCoalescingRightSideContext[] {
		return this.getTypedRuleContexts(NullCoalescingRightSideContext) as NullCoalescingRightSideContext[];
	}
	public nullCoalescingRightSide(i: number): NullCoalescingRightSideContext {
		return this.getTypedRuleContext(NullCoalescingRightSideContext, i) as NullCoalescingRightSideContext;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.LPAREN, 0);
	}
	public nullCoalescing(): NullCoalescingContext {
		return this.getTypedRuleContext(NullCoalescingContext, 0) as NullCoalescingContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.RPAREN, 0);
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_nullCoalescing;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterNullCoalescing) {
	 		listener.enterNullCoalescing(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitNullCoalescing) {
	 		listener.exitNullCoalescing(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitNullCoalescing) {
			return visitor.visitNullCoalescing(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NullCoalescingRightSideContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NULLCOALESCING(): TerminalNode {
		return this.getToken(MappingsGrammarParser.NULLCOALESCING, 0);
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
	public constant(): ConstantContext {
		return this.getTypedRuleContext(ConstantContext, 0) as ConstantContext;
	}
	public NULL(): TerminalNode {
		return this.getToken(MappingsGrammarParser.NULL, 0);
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_nullCoalescingRightSide;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterNullCoalescingRightSide) {
	 		listener.enterNullCoalescingRightSide(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitNullCoalescingRightSide) {
	 		listener.exitNullCoalescingRightSide(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitNullCoalescingRightSide) {
			return visitor.visitNullCoalescingRightSide(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RoundedNumberContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_roundedNumber;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterRoundedNumber) {
	 		listener.enterRoundedNumber(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitRoundedNumber) {
	 		listener.exitRoundedNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitRoundedNumber) {
			return visitor.visitRoundedNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_number;
	}
	public copyFrom(ctx: NumberContext): void {
		super.copyFrom(ctx);
	}
}
export class MathNullCoalescingxContext extends NumberContext {
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public nullCoalescing(): NullCoalescingContext {
		return this.getTypedRuleContext(NullCoalescingContext, 0) as NullCoalescingContext;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterMathNullCoalescingx) {
	 		listener.enterMathNullCoalescingx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitMathNullCoalescingx) {
	 		listener.exitMathNullCoalescingx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitMathNullCoalescingx) {
			return visitor.visitMathNullCoalescingx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MathIdentifierxContext extends NumberContext {
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterMathIdentifierx) {
	 		listener.enterMathIdentifierx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitMathIdentifierx) {
	 		listener.exitMathIdentifierx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitMathIdentifierx) {
			return visitor.visitMathIdentifierx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PowerxContext extends NumberContext {
	public _a!: NumberContext;
	public _b!: NumberContext;
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public POWER(): TerminalNode {
		return this.getToken(MappingsGrammarParser.POWER, 0);
	}
	public number__list(): NumberContext[] {
		return this.getTypedRuleContexts(NumberContext) as NumberContext[];
	}
	public number_(i: number): NumberContext {
		return this.getTypedRuleContext(NumberContext, i) as NumberContext;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterPowerx) {
	 		listener.enterPowerx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitPowerx) {
	 		listener.exitPowerx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitPowerx) {
			return visitor.visitPowerx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DecimalxContext extends NumberContext {
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(MappingsGrammarParser.DECIMAL, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterDecimalx) {
	 		listener.enterDecimalx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitDecimalx) {
	 		listener.exitDecimalx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitDecimalx) {
			return visitor.visitDecimalx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParensxContext extends NumberContext {
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.LPAREN, 0);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.RPAREN, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterParensx) {
	 		listener.enterParensx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitParensx) {
	 		listener.exitParensx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitParensx) {
			return visitor.visitParensx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NegationxContext extends NumberContext {
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public MINUS(): TerminalNode {
		return this.getToken(MappingsGrammarParser.MINUS, 0);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterNegationx) {
	 		listener.enterNegationx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitNegationx) {
	 		listener.exitNegationx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
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
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
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
		return this.getToken(MappingsGrammarParser.MULTIPLICATION, 0);
	}
	public DIVISION(): TerminalNode {
		return this.getToken(MappingsGrammarParser.DIVISION, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterMultiplicationx) {
	 		listener.enterMultiplicationx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitMultiplicationx) {
	 		listener.exitMultiplicationx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitMultiplicationx) {
			return visitor.visitMultiplicationx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LengthxContext extends NumberContext {
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LENGTH(): TerminalNode {
		return this.getToken(MappingsGrammarParser.LENGTH, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.LPAREN, 0);
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.RPAREN, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterLengthx) {
	 		listener.enterLengthx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitLengthx) {
	 		listener.exitLengthx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitLengthx) {
			return visitor.visitLengthx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CountxContext extends NumberContext {
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public COUNT(): TerminalNode {
		return this.getToken(MappingsGrammarParser.COUNT, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.RPAREN, 0);
	}
	public array(): ArrayContext {
		return this.getTypedRuleContext(ArrayContext, 0) as ArrayContext;
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterCountx) {
	 		listener.enterCountx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitCountx) {
	 		listener.exitCountx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitCountx) {
			return visitor.visitCountx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditionxContext extends NumberContext {
	public _a!: NumberContext;
	public _op!: Token;
	public _b!: NumberContext;
	constructor(parser: MappingsGrammarParser, ctx: NumberContext) {
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
		return this.getToken(MappingsGrammarParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(MappingsGrammarParser.MINUS, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterAdditionx) {
	 		listener.enterAdditionx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitAdditionx) {
	 		listener.exitAdditionx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitAdditionx) {
			return visitor.visitAdditionx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_date;
	}
	public copyFrom(ctx: DateContext): void {
		super.copyFrom(ctx);
	}
}
export class DateTextxContext extends DateContext {
	constructor(parser: MappingsGrammarParser, ctx: DateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TEXT(): TerminalNode {
		return this.getToken(MappingsGrammarParser.TEXT, 0);
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterDateTextx) {
	 		listener.enterDateTextx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitDateTextx) {
	 		listener.exitDateTextx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitDateTextx) {
			return visitor.visitDateTextx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateIdentifierxContext extends DateContext {
	constructor(parser: MappingsGrammarParser, ctx: DateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterDateIdentifierx) {
	 		listener.enterDateIdentifierx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitDateIdentifierx) {
	 		listener.exitDateIdentifierx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitDateIdentifierx) {
			return visitor.visitDateIdentifierx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateNullCoalescingxContext extends DateContext {
	constructor(parser: MappingsGrammarParser, ctx: DateContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public nullCoalescing(): NullCoalescingContext {
		return this.getTypedRuleContext(NullCoalescingContext, 0) as NullCoalescingContext;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterDateNullCoalescingx) {
	 		listener.enterDateNullCoalescingx(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitDateNullCoalescingx) {
	 		listener.exitDateNullCoalescingx(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitDateNullCoalescingx) {
			return visitor.visitDateNullCoalescingx(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IndexerContext extends ParserRuleContext {
	public _index!: NumberContext;
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LARRAYPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.LARRAYPAREN, 0);
	}
	public RARRAYPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.RARRAYPAREN, 0);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public array(): ArrayContext {
		return this.getTypedRuleContext(ArrayContext, 0) as ArrayContext;
	}
	public input(): InputContext {
		return this.getTypedRuleContext(InputContext, 0) as InputContext;
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_indexer;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterIndexer) {
	 		listener.enterIndexer(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitIndexer) {
	 		listener.exitIndexer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitIndexer) {
			return visitor.visitIndexer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LARRAYPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.LARRAYPAREN, 0);
	}
	public RARRAYPAREN(): TerminalNode {
		return this.getToken(MappingsGrammarParser.RARRAYPAREN, 0);
	}
	public arrayElements(): ArrayElementsContext {
		return this.getTypedRuleContext(ArrayElementsContext, 0) as ArrayElementsContext;
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_array;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterArray) {
	 		listener.enterArray(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitArray) {
	 		listener.exitArray(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitArray) {
			return visitor.visitArray(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayElementsContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(MappingsGrammarParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(MappingsGrammarParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_arrayElements;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterArrayElements) {
	 		listener.enterArrayElements(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitArrayElements) {
	 		listener.exitArrayElements(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitArrayElements) {
			return visitor.visitArrayElements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(MappingsGrammarParser.DECIMAL, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(MappingsGrammarParser.MINUS, 0);
	}
	public TEXT(): TerminalNode {
		return this.getToken(MappingsGrammarParser.TEXT, 0);
	}
	public BOOL(): TerminalNode {
		return this.getToken(MappingsGrammarParser.BOOL, 0);
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_constant;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterConstant) {
	 		listener.enterConstant(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitConstant) {
	 		listener.exitConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitConstant) {
			return visitor.visitConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InputContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(MappingsGrammarParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_input;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterInput) {
	 		listener.enterInput(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitInput) {
	 		listener.exitInput(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitInput) {
			return visitor.visitInput(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OutputContext extends ParserRuleContext {
	constructor(parser?: MappingsGrammarParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(MappingsGrammarParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return MappingsGrammarParser.RULE_output;
	}
	public enterRule(listener: MappingsGrammarListener): void {
	    if(listener.enterOutput) {
	 		listener.enterOutput(this);
		}
	}
	public exitRule(listener: MappingsGrammarListener): void {
	    if(listener.exitOutput) {
	 		listener.exitOutput(this);
		}
	}
	// @Override
	public accept<Result>(visitor: MappingsGrammarVisitor<Result>): Result {
		if (visitor.visitOutput) {
			return visitor.visitOutput(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
