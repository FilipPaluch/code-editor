// Generated from MappingsGrammar.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `MappingsGrammarParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class MappingsGrammarVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.exp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExp?: (ctx: ExpContext) => Result;
	/**
	 * Visit a parse tree produced by the `basicMapping`
	 * labeled alternative in `MappingsGrammarParser.mapping`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBasicMapping?: (ctx: BasicMappingContext) => Result;
	/**
	 * Visit a parse tree produced by the `manyMappings`
	 * labeled alternative in `MappingsGrammarParser.mapping`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitManyMappings?: (ctx: ManyMappingsContext) => Result;
	/**
	 * Visit a parse tree produced by the `conditionalMapping`
	 * labeled alternative in `MappingsGrammarParser.mapping`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionalMapping?: (ctx: ConditionalMappingContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `formatExpressionVarDateFormat`
	 * labeled alternative in `MappingsGrammarParser.formatExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormatExpressionVarDateFormat?: (ctx: FormatExpressionVarDateFormatContext) => Result;
	/**
	 * Visit a parse tree produced by the `formatExpressionConstDateFormat`
	 * labeled alternative in `MappingsGrammarParser.formatExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFormatExpressionConstDateFormat?: (ctx: FormatExpressionConstDateFormatContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.nullCoalescing`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullCoalescing?: (ctx: NullCoalescingContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.nullCoalescingRightSide`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullCoalescingRightSide?: (ctx: NullCoalescingRightSideContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.roundedNumber`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRoundedNumber?: (ctx: RoundedNumberContext) => Result;
	/**
	 * Visit a parse tree produced by the `mathNullCoalescingx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMathNullCoalescingx?: (ctx: MathNullCoalescingxContext) => Result;
	/**
	 * Visit a parse tree produced by the `mathIdentifierx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMathIdentifierx?: (ctx: MathIdentifierxContext) => Result;
	/**
	 * Visit a parse tree produced by the `powerx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPowerx?: (ctx: PowerxContext) => Result;
	/**
	 * Visit a parse tree produced by the `decimalx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimalx?: (ctx: DecimalxContext) => Result;
	/**
	 * Visit a parse tree produced by the `parensx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParensx?: (ctx: ParensxContext) => Result;
	/**
	 * Visit a parse tree produced by the `negationx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNegationx?: (ctx: NegationxContext) => Result;
	/**
	 * Visit a parse tree produced by the `multiplicationx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicationx?: (ctx: MultiplicationxContext) => Result;
	/**
	 * Visit a parse tree produced by the `lengthx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLengthx?: (ctx: LengthxContext) => Result;
	/**
	 * Visit a parse tree produced by the `countx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCountx?: (ctx: CountxContext) => Result;
	/**
	 * Visit a parse tree produced by the `additionx`
	 * labeled alternative in `MappingsGrammarParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditionx?: (ctx: AdditionxContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateNullCoalescingx`
	 * labeled alternative in `MappingsGrammarParser.date`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateNullCoalescingx?: (ctx: DateNullCoalescingxContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateTextx`
	 * labeled alternative in `MappingsGrammarParser.date`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTextx?: (ctx: DateTextxContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateIdentifierx`
	 * labeled alternative in `MappingsGrammarParser.date`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateIdentifierx?: (ctx: DateIdentifierxContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.indexer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexer?: (ctx: IndexerContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray?: (ctx: ArrayContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.arrayElements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayElements?: (ctx: ArrayElementsContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.constant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant?: (ctx: ConstantContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.input`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInput?: (ctx: InputContext) => Result;
	/**
	 * Visit a parse tree produced by `MappingsGrammarParser.output`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutput?: (ctx: OutputContext) => Result;
}

