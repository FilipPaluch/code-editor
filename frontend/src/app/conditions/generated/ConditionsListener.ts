// Generated from Conditions.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


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
 * This interface defines a complete listener for a parse tree produced by
 * `ConditionsParser`.
 */
export default class ConditionsListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ConditionsParser.exp`.
	 * @param ctx the parse tree
	 */
	enterExp?: (ctx: ExpContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.exp`.
	 * @param ctx the parse tree
	 */
	exitExp?: (ctx: ExpContext) => void;
	/**
	 * Enter a parse tree produced by the `comparatorx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	enterComparatorx?: (ctx: ComparatorxContext) => void;
	/**
	 * Exit a parse tree produced by the `comparatorx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	exitComparatorx?: (ctx: ComparatorxContext) => void;
	/**
	 * Enter a parse tree produced by the `lambdax`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	enterLambdax?: (ctx: LambdaxContext) => void;
	/**
	 * Exit a parse tree produced by the `lambdax`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	exitLambdax?: (ctx: LambdaxContext) => void;
	/**
	 * Enter a parse tree produced by the `parenx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	enterParenx?: (ctx: ParenxContext) => void;
	/**
	 * Exit a parse tree produced by the `parenx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	exitParenx?: (ctx: ParenxContext) => void;
	/**
	 * Enter a parse tree produced by the `notx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNotx?: (ctx: NotxContext) => void;
	/**
	 * Exit a parse tree produced by the `notx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNotx?: (ctx: NotxContext) => void;
	/**
	 * Enter a parse tree produced by the `boolx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	enterBoolx?: (ctx: BoolxContext) => void;
	/**
	 * Exit a parse tree produced by the `boolx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	exitBoolx?: (ctx: BoolxContext) => void;
	/**
	 * Enter a parse tree produced by the `equalityx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	enterEqualityx?: (ctx: EqualityxContext) => void;
	/**
	 * Exit a parse tree produced by the `equalityx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	exitEqualityx?: (ctx: EqualityxContext) => void;
	/**
	 * Enter a parse tree produced by the `binaryx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	enterBinaryx?: (ctx: BinaryxContext) => void;
	/**
	 * Exit a parse tree produced by the `binaryx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	exitBinaryx?: (ctx: BinaryxContext) => void;
	/**
	 * Enter a parse tree produced by the `expressionsequalityx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpressionsequalityx?: (ctx: ExpressionsequalityxContext) => void;
	/**
	 * Exit a parse tree produced by the `expressionsequalityx`
	 * labeled alternative in `ConditionsParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpressionsequalityx?: (ctx: ExpressionsequalityxContext) => void;
	/**
	 * Enter a parse tree produced by the `powerx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	enterPowerx?: (ctx: PowerxContext) => void;
	/**
	 * Exit a parse tree produced by the `powerx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	exitPowerx?: (ctx: PowerxContext) => void;
	/**
	 * Enter a parse tree produced by the `decimalx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	enterDecimalx?: (ctx: DecimalxContext) => void;
	/**
	 * Exit a parse tree produced by the `decimalx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	exitDecimalx?: (ctx: DecimalxContext) => void;
	/**
	 * Enter a parse tree produced by the `numberIteratorx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	enterNumberIteratorx?: (ctx: NumberIteratorxContext) => void;
	/**
	 * Exit a parse tree produced by the `numberIteratorx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	exitNumberIteratorx?: (ctx: NumberIteratorxContext) => void;
	/**
	 * Enter a parse tree produced by the `numberIdentifierx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	enterNumberIdentifierx?: (ctx: NumberIdentifierxContext) => void;
	/**
	 * Exit a parse tree produced by the `numberIdentifierx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	exitNumberIdentifierx?: (ctx: NumberIdentifierxContext) => void;
	/**
	 * Enter a parse tree produced by the `parensx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	enterParensx?: (ctx: ParensxContext) => void;
	/**
	 * Exit a parse tree produced by the `parensx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	exitParensx?: (ctx: ParensxContext) => void;
	/**
	 * Enter a parse tree produced by the `negationx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	enterNegationx?: (ctx: NegationxContext) => void;
	/**
	 * Exit a parse tree produced by the `negationx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	exitNegationx?: (ctx: NegationxContext) => void;
	/**
	 * Enter a parse tree produced by the `multiplicationx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	enterMultiplicationx?: (ctx: MultiplicationxContext) => void;
	/**
	 * Exit a parse tree produced by the `multiplicationx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	exitMultiplicationx?: (ctx: MultiplicationxContext) => void;
	/**
	 * Enter a parse tree produced by the `additionx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	enterAdditionx?: (ctx: AdditionxContext) => void;
	/**
	 * Exit a parse tree produced by the `additionx`
	 * labeled alternative in `ConditionsParser.number`.
	 * @param ctx the parse tree
	 */
	exitAdditionx?: (ctx: AdditionxContext) => void;
	/**
	 * Enter a parse tree produced by the `dateConstructorx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 */
	enterDateConstructorx?: (ctx: DateConstructorxContext) => void;
	/**
	 * Exit a parse tree produced by the `dateConstructorx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 */
	exitDateConstructorx?: (ctx: DateConstructorxContext) => void;
	/**
	 * Enter a parse tree produced by the `dateIteratorx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 */
	enterDateIteratorx?: (ctx: DateIteratorxContext) => void;
	/**
	 * Exit a parse tree produced by the `dateIteratorx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 */
	exitDateIteratorx?: (ctx: DateIteratorxContext) => void;
	/**
	 * Enter a parse tree produced by the `dateIdentifierx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 */
	enterDateIdentifierx?: (ctx: DateIdentifierxContext) => void;
	/**
	 * Exit a parse tree produced by the `dateIdentifierx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 */
	exitDateIdentifierx?: (ctx: DateIdentifierxContext) => void;
	/**
	 * Enter a parse tree produced by the `dateTextx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 */
	enterDateTextx?: (ctx: DateTextxContext) => void;
	/**
	 * Exit a parse tree produced by the `dateTextx`
	 * labeled alternative in `ConditionsParser.date`.
	 * @param ctx the parse tree
	 */
	exitDateTextx?: (ctx: DateTextxContext) => void;
	/**
	 * Enter a parse tree produced by the `iteratorStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 */
	enterIteratorStringx?: (ctx: IteratorStringxContext) => void;
	/**
	 * Exit a parse tree produced by the `iteratorStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 */
	exitIteratorStringx?: (ctx: IteratorStringxContext) => void;
	/**
	 * Enter a parse tree produced by the `textStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 */
	enterTextStringx?: (ctx: TextStringxContext) => void;
	/**
	 * Exit a parse tree produced by the `textStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 */
	exitTextStringx?: (ctx: TextStringxContext) => void;
	/**
	 * Enter a parse tree produced by the `identifierStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 */
	enterIdentifierStringx?: (ctx: IdentifierStringxContext) => void;
	/**
	 * Exit a parse tree produced by the `identifierStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 */
	exitIdentifierStringx?: (ctx: IdentifierStringxContext) => void;
	/**
	 * Enter a parse tree produced by the `unfinishedStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 */
	enterUnfinishedStringx?: (ctx: UnfinishedStringxContext) => void;
	/**
	 * Exit a parse tree produced by the `unfinishedStringx`
	 * labeled alternative in `ConditionsParser.string`.
	 * @param ctx the parse tree
	 */
	exitUnfinishedStringx?: (ctx: UnfinishedStringxContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.equatable`.
	 * @param ctx the parse tree
	 */
	enterEquatable?: (ctx: EquatableContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.equatable`.
	 * @param ctx the parse tree
	 */
	exitEquatable?: (ctx: EquatableContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.equality`.
	 * @param ctx the parse tree
	 */
	enterEquality?: (ctx: EqualityContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.equality`.
	 * @param ctx the parse tree
	 */
	exitEquality?: (ctx: EqualityContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.binary`.
	 * @param ctx the parse tree
	 */
	enterBinary?: (ctx: BinaryContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.binary`.
	 * @param ctx the parse tree
	 */
	exitBinary?: (ctx: BinaryContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.comparable`.
	 * @param ctx the parse tree
	 */
	enterComparable?: (ctx: ComparableContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.comparable`.
	 * @param ctx the parse tree
	 */
	exitComparable?: (ctx: ComparableContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.iterator`.
	 * @param ctx the parse tree
	 */
	enterIterator?: (ctx: IteratorContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.iterator`.
	 * @param ctx the parse tree
	 */
	exitIterator?: (ctx: IteratorContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.comparator`.
	 * @param ctx the parse tree
	 */
	enterComparator?: (ctx: ComparatorContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.comparator`.
	 * @param ctx the parse tree
	 */
	exitComparator?: (ctx: ComparatorContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.array`.
	 * @param ctx the parse tree
	 */
	enterArray?: (ctx: ArrayContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.array`.
	 * @param ctx the parse tree
	 */
	exitArray?: (ctx: ArrayContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.arrayelements`.
	 * @param ctx the parse tree
	 */
	enterArrayelements?: (ctx: ArrayelementsContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.arrayelements`.
	 * @param ctx the parse tree
	 */
	exitArrayelements?: (ctx: ArrayelementsContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.textarrayelement`.
	 * @param ctx the parse tree
	 */
	enterTextarrayelement?: (ctx: TextarrayelementContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.textarrayelement`.
	 * @param ctx the parse tree
	 */
	exitTextarrayelement?: (ctx: TextarrayelementContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.decimalarrayelement`.
	 * @param ctx the parse tree
	 */
	enterDecimalarrayelement?: (ctx: DecimalarrayelementContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.decimalarrayelement`.
	 * @param ctx the parse tree
	 */
	exitDecimalarrayelement?: (ctx: DecimalarrayelementContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.bool`.
	 * @param ctx the parse tree
	 */
	enterBool?: (ctx: BoolContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.bool`.
	 * @param ctx the parse tree
	 */
	exitBool?: (ctx: BoolContext) => void;
	/**
	 * Enter a parse tree produced by `ConditionsParser.decimalConst`.
	 * @param ctx the parse tree
	 */
	enterDecimalConst?: (ctx: DecimalConstContext) => void;
	/**
	 * Exit a parse tree produced by `ConditionsParser.decimalConst`.
	 * @param ctx the parse tree
	 */
	exitDecimalConst?: (ctx: DecimalConstContext) => void;
}

