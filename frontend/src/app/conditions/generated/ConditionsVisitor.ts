// Generated from Conditions.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { ExpContext } from "./ConditionsParser";
import { ComparatorxContext } from "./ConditionsParser";
import { LambdaxContext } from "./ConditionsParser";
import { ParenxContext } from "./ConditionsParser";
import { NotxContext } from "./ConditionsParser";
import { BoolxContext } from "./ConditionsParser";
import { EqualityxContext } from "./ConditionsParser";
import { BinaryxContext } from "./ConditionsParser";
import { ExpressionsequalityxContext } from "./ConditionsParser";
import { PowerxContext } from "./ConditionsParser";
import { DecimalxContext } from "./ConditionsParser";
import { NumberIteratorxContext } from "./ConditionsParser";
import { NumberIdentifierxContext } from "./ConditionsParser";
import { ParensxContext } from "./ConditionsParser";
import { NegationxContext } from "./ConditionsParser";
import { MultiplicationxContext } from "./ConditionsParser";
import { AdditionxContext } from "./ConditionsParser";
import { DateConstructorxContext } from "./ConditionsParser";
import { DateIteratorxContext } from "./ConditionsParser";
import { DateIdentifierxContext } from "./ConditionsParser";
import { DateTextxContext } from "./ConditionsParser";
import { IteratorStringxContext } from "./ConditionsParser";
import { TextStringxContext } from "./ConditionsParser";
import { IdentifierStringxContext } from "./ConditionsParser";
import { UnfinishedStringxContext } from "./ConditionsParser";
import { EquatableContext } from "./ConditionsParser";
import { EqualityContext } from "./ConditionsParser";
import { BinaryContext } from "./ConditionsParser";
import { ComparableContext } from "./ConditionsParser";
import { IteratorContext } from "./ConditionsParser";
import { ComparatorContext } from "./ConditionsParser";
import { ArrayContext } from "./ConditionsParser";
import { ArrayelementsContext } from "./ConditionsParser";
import { TextarrayelementContext } from "./ConditionsParser";
import { DecimalarrayelementContext } from "./ConditionsParser";
import { IdentifierContext } from "./ConditionsParser";
import { BoolContext } from "./ConditionsParser";
import { DecimalConstContext } from "./ConditionsParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ConditionsParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class ConditionsVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ConditionsParser.exp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExp?: (ctx: ExpContext) => Result;
	/**
	 * Visit a parse tree produced by the `comparatorx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparatorx?: (ctx: ComparatorxContext) => Result;
	/**
	 * Visit a parse tree produced by the `lambdax`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLambdax?: (ctx: LambdaxContext) => Result;
	/**
	 * Visit a parse tree produced by the `parenx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenx?: (ctx: ParenxContext) => Result;
	/**
	 * Visit a parse tree produced by the `notx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotx?: (ctx: NotxContext) => Result;
	/**
	 * Visit a parse tree produced by the `boolx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolx?: (ctx: BoolxContext) => Result;
	/**
	 * Visit a parse tree produced by the `equalityx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityx?: (ctx: EqualityxContext) => Result;
	/**
	 * Visit a parse tree produced by the `binaryx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinaryx?: (ctx: BinaryxContext) => Result;
	/**
	 * Visit a parse tree produced by the `expressionsequalityx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionsequalityx?: (ctx: ExpressionsequalityxContext) => Result;
	/**
	 * Visit a parse tree produced by the `powerx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPowerx?: (ctx: PowerxContext) => Result;
	/**
	 * Visit a parse tree produced by the `decimalx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimalx?: (ctx: DecimalxContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberIteratorx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberIteratorx?: (ctx: NumberIteratorxContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberIdentifierx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberIdentifierx?: (ctx: NumberIdentifierxContext) => Result;
	/**
	 * Visit a parse tree produced by the `parensx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParensx?: (ctx: ParensxContext) => Result;
	/**
	 * Visit a parse tree produced by the `negationx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNegationx?: (ctx: NegationxContext) => Result;
	/**
	 * Visit a parse tree produced by the `multiplicationx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicationx?: (ctx: MultiplicationxContext) => Result;
	/**
	 * Visit a parse tree produced by the `additionx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditionx?: (ctx: AdditionxContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateConstructorx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateConstructorx?: (ctx: DateConstructorxContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateIteratorx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateIteratorx?: (ctx: DateIteratorxContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateIdentifierx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateIdentifierx?: (ctx: DateIdentifierxContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateTextx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTextx?: (ctx: DateTextxContext) => Result;
	/**
	 * Visit a parse tree produced by the `iteratorStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIteratorStringx?: (ctx: IteratorStringxContext) => Result;
	/**
	 * Visit a parse tree produced by the `textStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTextStringx?: (ctx: TextStringxContext) => Result;
	/**
	 * Visit a parse tree produced by the `identifierStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierStringx?: (ctx: IdentifierStringxContext) => Result;
	/**
	 * Visit a parse tree produced by the `unfinishedStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnfinishedStringx?: (ctx: UnfinishedStringxContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.equatable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEquatable?: (ctx: EquatableContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.equality`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEquality?: (ctx: EqualityContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.binary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBinary?: (ctx: BinaryContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.comparable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparable?: (ctx: ComparableContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.iterator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIterator?: (ctx: IteratorContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.comparator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparator?: (ctx: ComparatorContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.array`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArray?: (ctx: ArrayContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.arrayelements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayelements?: (ctx: ArrayelementsContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.textarrayelement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTextarrayelement?: (ctx: TextarrayelementContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.decimalarrayelement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimalarrayelement?: (ctx: DecimalarrayelementContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.bool`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBool?: (ctx: BoolContext) => Result;
	/**
	 * Visit a parse tree produced by `ConditionsParser.decimalConst`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecimalConst?: (ctx: DecimalConstContext) => Result;
}

