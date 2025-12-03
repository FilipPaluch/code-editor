// Generated from MappingsGrammar.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { ExpContext } from "./MappingsGrammarParser";
import { BasicMappingContext } from "./MappingsGrammarParser";
import { ManyMappingsContext } from "./MappingsGrammarParser";
import { ConditionalMappingContext } from "./MappingsGrammarParser";
import { ExpressionContext } from "./MappingsGrammarParser";
import { FormatExpressionVarDateFormatContext } from "./MappingsGrammarParser";
import { FormatExpressionConstDateFormatContext } from "./MappingsGrammarParser";
import { NullCoalescingContext } from "./MappingsGrammarParser";
import { NullCoalescingRightSideContext } from "./MappingsGrammarParser";
import { RoundedNumberContext } from "./MappingsGrammarParser";
import { MathNullCoalescingxContext } from "./MappingsGrammarParser";
import { MathIdentifierxContext } from "./MappingsGrammarParser";
import { PowerxContext } from "./MappingsGrammarParser";
import { DecimalxContext } from "./MappingsGrammarParser";
import { ParensxContext } from "./MappingsGrammarParser";
import { NegationxContext } from "./MappingsGrammarParser";
import { MultiplicationxContext } from "./MappingsGrammarParser";
import { LengthxContext } from "./MappingsGrammarParser";
import { CountxContext } from "./MappingsGrammarParser";
import { AdditionxContext } from "./MappingsGrammarParser";
import { DateNullCoalescingxContext } from "./MappingsGrammarParser";
import { DateTextxContext } from "./MappingsGrammarParser";
import { DateIdentifierxContext } from "./MappingsGrammarParser";
import { IndexerContext } from "./MappingsGrammarParser";
import { ArrayContext } from "./MappingsGrammarParser";
import { ArrayElementsContext } from "./MappingsGrammarParser";
import { ConstantContext } from "./MappingsGrammarParser";
import { InputContext } from "./MappingsGrammarParser";
import { OutputContext } from "./MappingsGrammarParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `MappingsGrammarParser`.
 */
export default class MappingsGrammarListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.exp`.
	 * @param ctx the parse tree
	 */
	enterExp?: (ctx: ExpContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.exp`.
	 * @param ctx the parse tree
	 */
	exitExp?: (ctx: ExpContext) => void;
	/**
	 * Enter a parse tree produced by the `basicMapping`
	 * labeled alternative in `MappingsGrammarParser.mapping`.
	 * @param ctx the parse tree
	 */
	enterBasicMapping?: (ctx: BasicMappingContext) => void;
	/**
	 * Exit a parse tree produced by the `basicMapping`
	 * labeled alternative in `MappingsGrammarParser.mapping`.
	 * @param ctx the parse tree
	 */
	exitBasicMapping?: (ctx: BasicMappingContext) => void;
	/**
	 * Enter a parse tree produced by the `manyMappings`
	 * labeled alternative in `MappingsGrammarParser.mapping`.
	 * @param ctx the parse tree
	 */
	enterManyMappings?: (ctx: ManyMappingsContext) => void;
	/**
	 * Exit a parse tree produced by the `manyMappings`
	 * labeled alternative in `MappingsGrammarParser.mapping`.
	 * @param ctx the parse tree
	 */
	exitManyMappings?: (ctx: ManyMappingsContext) => void;
	/**
	 * Enter a parse tree produced by the `conditionalMapping`
	 * labeled alternative in `MappingsGrammarParser.mapping`.
	 * @param ctx the parse tree
	 */
	enterConditionalMapping?: (ctx: ConditionalMappingContext) => void;
	/**
	 * Exit a parse tree produced by the `conditionalMapping`
	 * labeled alternative in `MappingsGrammarParser.mapping`.
	 * @param ctx the parse tree
	 */
	exitConditionalMapping?: (ctx: ConditionalMappingContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `formatExpressionVarDateFormat`
	 * labeled alternative in `MappingsGrammarParser.formatExpression`.
	 * @param ctx the parse tree
	 */
	enterFormatExpressionVarDateFormat?: (ctx: FormatExpressionVarDateFormatContext) => void;
	/**
	 * Exit a parse tree produced by the `formatExpressionVarDateFormat`
	 * labeled alternative in `MappingsGrammarParser.formatExpression`.
	 * @param ctx the parse tree
	 */
	exitFormatExpressionVarDateFormat?: (ctx: FormatExpressionVarDateFormatContext) => void;
	/**
	 * Enter a parse tree produced by the `formatExpressionConstDateFormat`
	 * labeled alternative in `MappingsGrammarParser.formatExpression`.
	 * @param ctx the parse tree
	 */
	enterFormatExpressionConstDateFormat?: (ctx: FormatExpressionConstDateFormatContext) => void;
	/**
	 * Exit a parse tree produced by the `formatExpressionConstDateFormat`
	 * labeled alternative in `MappingsGrammarParser.formatExpression`.
	 * @param ctx the parse tree
	 */
	exitFormatExpressionConstDateFormat?: (ctx: FormatExpressionConstDateFormatContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.nullCoalescing`.
	 * @param ctx the parse tree
	 */
	enterNullCoalescing?: (ctx: NullCoalescingContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.nullCoalescing`.
	 * @param ctx the parse tree
	 */
	exitNullCoalescing?: (ctx: NullCoalescingContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.nullCoalescingRightSide`.
	 * @param ctx the parse tree
	 */
	enterNullCoalescingRightSide?: (ctx: NullCoalescingRightSideContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.nullCoalescingRightSide`.
	 * @param ctx the parse tree
	 */
	exitNullCoalescingRightSide?: (ctx: NullCoalescingRightSideContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.roundedNumber`.
	 * @param ctx the parse tree
	 */
	enterRoundedNumber?: (ctx: RoundedNumberContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.roundedNumber`.
	 * @param ctx the parse tree
	 */
	exitRoundedNumber?: (ctx: RoundedNumberContext) => void;
	/**
	 * Enter a parse tree produced by the `mathNullCoalescingx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterMathNullCoalescingx?: (ctx: MathNullCoalescingxContext) => void;
	/**
	 * Exit a parse tree produced by the `mathNullCoalescingx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitMathNullCoalescingx?: (ctx: MathNullCoalescingxContext) => void;
	/**
	 * Enter a parse tree produced by the `mathIdentifierx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterMathIdentifierx?: (ctx: MathIdentifierxContext) => void;
	/**
	 * Exit a parse tree produced by the `mathIdentifierx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitMathIdentifierx?: (ctx: MathIdentifierxContext) => void;
	/**
	 * Enter a parse tree produced by the `powerx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterPowerx?: (ctx: PowerxContext) => void;
	/**
	 * Exit a parse tree produced by the `powerx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitPowerx?: (ctx: PowerxContext) => void;
	/**
	 * Enter a parse tree produced by the `decimalx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterDecimalx?: (ctx: DecimalxContext) => void;
	/**
	 * Exit a parse tree produced by the `decimalx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitDecimalx?: (ctx: DecimalxContext) => void;
	/**
	 * Enter a parse tree produced by the `parensx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterParensx?: (ctx: ParensxContext) => void;
	/**
	 * Exit a parse tree produced by the `parensx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitParensx?: (ctx: ParensxContext) => void;
	/**
	 * Enter a parse tree produced by the `negationx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterNegationx?: (ctx: NegationxContext) => void;
	/**
	 * Exit a parse tree produced by the `negationx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitNegationx?: (ctx: NegationxContext) => void;
	/**
	 * Enter a parse tree produced by the `multiplicationx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterMultiplicationx?: (ctx: MultiplicationxContext) => void;
	/**
	 * Exit a parse tree produced by the `multiplicationx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitMultiplicationx?: (ctx: MultiplicationxContext) => void;
	/**
	 * Enter a parse tree produced by the `lengthx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterLengthx?: (ctx: LengthxContext) => void;
	/**
	 * Exit a parse tree produced by the `lengthx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitLengthx?: (ctx: LengthxContext) => void;
	/**
	 * Enter a parse tree produced by the `countx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterCountx?: (ctx: CountxContext) => void;
	/**
	 * Exit a parse tree produced by the `countx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitCountx?: (ctx: CountxContext) => void;
	/**
	 * Enter a parse tree produced by the `additionx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	enterAdditionx?: (ctx: AdditionxContext) => void;
	/**
	 * Exit a parse tree produced by the `additionx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 */
	exitAdditionx?: (ctx: AdditionxContext) => void;
	/**
	 * Enter a parse tree produced by the `dateNullCoalescingx`
	 * labeled alternative in `MappingsGrammarParser.date`.
	 * @param ctx the parse tree
	 */
	enterDateNullCoalescingx?: (ctx: DateNullCoalescingxContext) => void;
	/**
	 * Exit a parse tree produced by the `dateNullCoalescingx`
	 * labeled alternative in `MappingsGrammarParser.date`.
	 * @param ctx the parse tree
	 */
	exitDateNullCoalescingx?: (ctx: DateNullCoalescingxContext) => void;
	/**
	 * Enter a parse tree produced by the `dateTextx`
	 * labeled alternative in `MappingsGrammarParser.date`.
	 * @param ctx the parse tree
	 */
	enterDateTextx?: (ctx: DateTextxContext) => void;
	/**
	 * Exit a parse tree produced by the `dateTextx`
	 * labeled alternative in `MappingsGrammarParser.date`.
	 * @param ctx the parse tree
	 */
	exitDateTextx?: (ctx: DateTextxContext) => void;
	/**
	 * Enter a parse tree produced by the `dateIdentifierx`
	 * labeled alternative in `MappingsGrammarParser.date`.
	 * @param ctx the parse tree
	 */
	enterDateIdentifierx?: (ctx: DateIdentifierxContext) => void;
	/**
	 * Exit a parse tree produced by the `dateIdentifierx`
	 * labeled alternative in `MappingsGrammarParser.date`.
	 * @param ctx the parse tree
	 */
	exitDateIdentifierx?: (ctx: DateIdentifierxContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.indexer`.
	 * @param ctx the parse tree
	 */
	enterIndexer?: (ctx: IndexerContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.indexer`.
	 * @param ctx the parse tree
	 */
	exitIndexer?: (ctx: IndexerContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.arrayElements`.
	 * @param ctx the parse tree
	 */
	enterArrayElements?: (ctx: ArrayElementsContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.arrayElements`.
	 * @param ctx the parse tree
	 */
	exitArrayElements?: (ctx: ArrayElementsContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.constant`.
	 * @param ctx the parse tree
	 */
	enterConstant?: (ctx: ConstantContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.constant`.
	 * @param ctx the parse tree
	 */
	exitConstant?: (ctx: ConstantContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.input`.
	 * @param ctx the parse tree
	 */
	enterInput?: (ctx: InputContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.input`.
	 * @param ctx the parse tree
	 */
	exitInput?: (ctx: InputContext) => void;
	/**
	 * Enter a parse tree produced by `MappingsGrammarParser.output`.
	 * @param ctx the parse tree
	 */
	enterOutput?: (ctx: OutputContext) => void;
	/**
	 * Exit a parse tree produced by `MappingsGrammarParser.output`.
	 * @param ctx the parse tree
	 */
	exitOutput?: (ctx: OutputContext) => void;
}

