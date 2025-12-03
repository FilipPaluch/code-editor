import { CharStreams, CommonTokenStream, ErrorListener, ErrorNode, ParserRuleContext, TerminalNode, Token } from 'antlr4';
import MappingsGrammarLexer from '../generated/MappingsGrammarLexer';
import MappingsGrammarParser, {
    BasicMappingContext,
    ConditionalMappingContext,
    ManyMappingsContext,
    NullCoalescingContext,
    NumberContext,
    ExpressionContext,
    NullCoalescingRightSideContext
} from '../generated/MappingsGrammarParser';
import MappingsGrammarVisitor from '../generated/MappingsGrammarVisitor';

interface MappingLexerError {
    exception?: any;
    msg: string;
    offendingSymbol: number;
    line: number;
    position: number;
}

interface MappingParserError {
    exception?: any;
    msg: string;
    offendingSymbol: Token;
    line: number;
    position: number;
}

class MappingLexerErrorListener extends ErrorListener<number> {
    constructor(private onError: (error: MappingLexerError) => void) {
        super();
    }

    syntaxError(recognizer: any, offendingSymbol: number, line: number, column: number, msg: string, e: any): void {
        this.onError({
            msg,
            offendingSymbol,
            line,
            position: column,
            exception: e
        });
    }
}

class MappingParserErrorListener extends ErrorListener<Token> {
    constructor(private onError: (error: MappingParserError) => void) {
        super();
    }

    syntaxError(recognizer: any, offendingSymbol: Token, line: number, column: number, msg: string, e: any): void {
        this.onError({
            msg,
            offendingSymbol,
            line,
            position: column,
            exception: e
        });
    }
}

export interface Position {
    start: number;
    end: number;
}

export type MappingParsedElement =
    | MappingWhitespaceElement
    | MappingIdentifierElement
    | MappingLiteralElement
    | MappingOperatorElement
    | MappingKeywordElement
    | MappingBracketElement
    | MappingSeparatorElement
    | MappingFunctionElement
    | MappingErrorElement;

export interface MappingBaseElement {
    id: number;
    value: string;
    position: Position;
    isValid: boolean;
    errorMessage?: string;
}

export interface MappingWhitespaceElement extends MappingBaseElement {
    type: MappingElementType.WHITESPACE;
}

export interface MappingIdentifierElement extends MappingBaseElement {
    type: MappingElementType.IDENTIFIER;
    identifierContext?: MappingIdentifierElementContext;
}

export interface MappingSeparatorElement extends MappingBaseElement {
    type: MappingElementType.SEPARATOR_COMMA | MappingElementType.SEPARATOR_COLON | MappingElementType.SEPARATOR_END;
}

export interface MappingLiteralElement extends MappingBaseElement {
    type: MappingElementType.LITERAL_TEXT | MappingElementType.LITERAL_NUMBER | MappingElementType.LITERAL_BOOLEAN | MappingElementType.LITERAL_NULL;
}

export interface MappingOperatorElement extends MappingBaseElement {
    type: MappingElementType.OPERATOR_ASSIGNMENT | MappingElementType.OPERATOR_MATH | MappingElementType.OPERATOR_NULL_COALESCING;
}

export interface MappingKeywordElement extends MappingBaseElement {
    type: MappingElementType.KEYWORD;
}

export interface MappingBracketElement extends MappingBaseElement {
    type: MappingElementType.BRACKET_OPEN | MappingElementType.BRACKET_CLOSE;
}

export interface MappingFunctionElement extends MappingBaseElement {
    type: MappingElementType.FUNCTION_NAME;
}

export interface MappingErrorElement extends MappingBaseElement {
    type: MappingElementType.ERROR | MappingElementType.INCOMPLETE;
}

export type MappingIdentifierElementContext =
    | MappingInputFieldContext
    | MappingOutputFieldContext;

export interface MappingInputFieldContext {
    type: 'input_field';
}

export interface MappingOutputFieldContext {
    type: 'output_field';
}

export enum MappingElementType {
    WHITESPACE = 'white-space',

    // Literals
    LITERAL_NUMBER = 'literal-number',
    LITERAL_TEXT = 'literal-text',
    LITERAL_BOOLEAN = 'literal-boolean',
    LITERAL_NULL = 'literal-null',

    // Identifiers
    IDENTIFIER = 'identifier',

    // Operators
    OPERATOR_ASSIGNMENT = 'operator-assignment',     // :=, :?=, +=, -=
    OPERATOR_MATH = 'operator-math',                 // +, -, *, /, ^
    OPERATOR_NULL_COALESCING = 'operator-null-coalescing', // ??

    // Keywords
    KEYWORD = 'keyword',                             // NULL, etc.

    // Functions
    FUNCTION_NAME = 'function-name',                 // FORMAT, etc.

    // Brackets
    BRACKET_OPEN = 'bracket-open',                   // (, [, {
    BRACKET_CLOSE = 'bracket-close',                 // ), ], }

    // Separators
    SEPARATOR_COMMA = 'separator-comma',             // ,
    SEPARATOR_COLON = 'separator-colon',             // :
    SEPARATOR_END = 'separator-end',                 // ;

    // Special
    INCOMPLETE = 'incomplete',                       // Unfinished strings, etc.
    ERROR = 'error'                                  // Unrecognized tokens
}

export interface MappingContext {
    id: number;
    type: MappingContextType;
    elementIds: number[];
    position: Position;
    isComplete: boolean;
    parentContextId?: number;
    metadata: MappingContextMetadata;
}

export enum MappingContextType {
    ASSIGNMENT = 'assignment',           // output := input
    CONDITIONAL_ASSIGNMENT = 'conditional_assignment', // output :?= input
    NULL_COALESCING = 'null_coalescing',         // expr ?? expr
    INDEXER = 'indexer',                        // array[index]
    GROUP = 'group'                             // (expression)
}

export type MappingContextMetadata =
    | MappingAssignmentMetadata
    | MappingNullCoalescingMetadata
    | MappingIndexerMetadata
    | MappingGroupMetadata;

export interface MappingAssignmentMetadata {
    type: 'assignment' | 'conditional_assignment';
    operatorId: number;
    outputElementId: number;
    inputElementIds: number[];
}

export interface MappingNullCoalescingMetadata {
    type: 'null_coalescing';
    operatorId: number;                 // single ?? operator
    leftElementIds: number[];           // left side elements
    rightElementIds: number[];          // right side elements
}

export interface MappingIndexerMetadata {
    type: 'indexer';
    arrayElementIds: number[];
    openBracketId: number;
    closeBracketId?: number;
    indexElementIds: number[];
}

export interface MappingGroupMetadata {
    type: 'group';
    openParenId: number;
    closeParenId?: number;
}

export interface MappingDiagnostic {
    code: MappingDiagnosticCode;
    message: string;
    position: Position;
    severity: 'error' | 'warning';
    contextId?: number;
}

export enum MappingDiagnosticCode {
    MISSING_CLOSING_BRACKET = 'MISSING_CLOSING_BRACKET',
    MISSING_OPENING_BRACKET = 'MISSING_OPENING_BRACKET',
    INCOMPLETE_EXPRESSION = 'INCOMPLETE_EXPRESSION',
    UNFINISHED_STRING = 'UNFINISHED_STRING',
    UNEXPECTED_TOKEN = 'UNEXPECTED_TOKEN',
    INVALID_ASSIGNMENT = 'INVALID_ASSIGNMENT'
}

export interface MappingExpressionParsingResult {
    elements: MappingParsedElement[];
    contexts: MappingContext[];
    diagnostics: MappingDiagnostic[];
    isValid: boolean;
}

export class MappingExpressionElementsVisitor extends MappingsGrammarVisitor<void> {
    private elements: MappingParsedElement[] = [];
    private contexts: MappingContext[] = [];
    private diagnostics: MappingDiagnostic[] = [];
    private elementIdCounter = 0;
    private contextIdCounter = 0;

    private terminalToElementMap = new Map<TerminalNode, MappingParsedElement>();

    parse(input: string): MappingExpressionParsingResult {
        const lexerErrors: MappingLexerError[] = [];
        const parserErrors: MappingParserError[] = [];

        const chars = CharStreams.fromString(input);
        const lexer = new MappingsGrammarLexer(chars);

        lexer.removeErrorListeners();
        lexer.addErrorListener(new MappingLexerErrorListener(
            (error: MappingLexerError) => lexerErrors.push(error)
        ));

        const tokens = new CommonTokenStream(lexer);
        const parser = new MappingsGrammarParser(tokens);

        parser.removeErrorListeners();
        parser.addErrorListener(new MappingParserErrorListener(
            (error: MappingParserError) => parserErrors.push(error)
        ));

        this.elements = [];
        this.contexts = [];
        this.diagnostics = [];
        this.elementIdCounter = 0;
        this.contextIdCounter = 0;
        this.terminalToElementMap.clear();

        const tree = parser.exp();

        console.log('Parse tree for "task := ":', tree.toStringTree(null, parser));
        if (tree) {
            this.visit(tree);
        }

        lexerErrors.forEach(err => {
            this.diagnostics.push({
                code: MappingDiagnosticCode.UNEXPECTED_TOKEN,
                message: `Lexer error: ${err.msg}`,
                position: { start: err.position, end: err.position },
                severity: 'error'
            });
        });

        parserErrors.forEach(err => {
            this.diagnostics.push({
                code: MappingDiagnosticCode.UNEXPECTED_TOKEN,
                message: `Parser error: ${err.msg}`,
                position: {
                    start: err.offendingSymbol?.start ?? err.position ?? 0,
                    end: err.offendingSymbol?.stop ?? err.position ?? 0
                },
                severity: 'error'
            });
        });

        this.elements.sort((a, b) => a.position.start - b.position.start);
        this.insertWhitespaceElements(input);
        this.updateContextsWithWhitespace();

        return {
            elements: this.elements,
            contexts: this.contexts,
            diagnostics: this.diagnostics,
            isValid: this.diagnostics.length === 0
        };
    }

    private insertWhitespaceElements(input: string): void {
        const newElements: MappingParsedElement[] = [];
        let currentPosition = 0;

        for (const element of this.elements) {
            if (currentPosition < element.position.start) {
                const gap = input.substring(currentPosition, element.position.start);
                if (gap.length > 0) {
                    const whitespaceElements = this.splitWhitespace(gap, currentPosition);
                    newElements.push(...whitespaceElements);
                }
            }

            newElements.push(element);
            currentPosition = element.position.end + 1;
        }

        if (currentPosition < input.length) {
            const gap = input.substring(currentPosition);
            const whitespaceElements = this.splitWhitespace(gap, currentPosition);
            newElements.push(...whitespaceElements);
        }

        this.elements = newElements;
    }

    private splitWhitespace(text: string, startPosition: number): MappingWhitespaceElement[] {
        const elements: MappingWhitespaceElement[] = [];
        let spacesCount = 0;
        let spacesStartIndex = -1;

        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);

            if (char === ' ' || char === '\t') {
                if (spacesCount === 0) {
                    spacesStartIndex = i;
                }
                spacesCount++;
            } else if (char === '\r' || char === '\n') {
                if (spacesCount > 0) {
                    const spacesText = text.substring(spacesStartIndex, spacesStartIndex + spacesCount);
                    elements.push(this.createWhitespaceElement(
                        spacesText,
                        startPosition + spacesStartIndex,
                        startPosition + spacesStartIndex + spacesCount - 1
                    ));
                    spacesCount = 0;
                }

                let lineBreakText = char;
                let lineBreakEnd = i;

                if (char === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    lineBreakText = '\r\n';
                    lineBreakEnd = i + 1;
                    i++;
                }

                elements.push(this.createWhitespaceElement(
                    lineBreakText,
                    startPosition + lineBreakEnd - (lineBreakText.length - 1),
                    startPosition + lineBreakEnd
                ));
            }
        }

        if (spacesCount > 0) {
            const spacesText = text.substring(spacesStartIndex, spacesStartIndex + spacesCount);
            elements.push(this.createWhitespaceElement(
                spacesText,
                startPosition + spacesStartIndex,
                startPosition + spacesStartIndex + spacesCount - 1
            ));
        }

        return elements;
    }

    private createWhitespaceElement(value: string, start: number, end: number): MappingWhitespaceElement {
        return {
            id: ++this.elementIdCounter,
            type: MappingElementType.WHITESPACE,
            value: value,
            position: {
                start: start,
                end: end
            },
            isValid: true
        };
    }

    private updateContextsWithWhitespace(): void {
        for (const context of this.contexts) {
            const contextElements = this.elements.filter(el =>
                el.position.start >= context.position.start &&
                el.position.end <= context.position.end
            );

            context.elementIds = contextElements.map(el => el.id);

            if (context.type === MappingContextType.ASSIGNMENT ||
                context.type === MappingContextType.CONDITIONAL_ASSIGNMENT) {
                this.extendAssignmentContextIfNeeded(context);
            } else if (!context.isComplete) {
                this.extendIncompleteContext(context);
            }
        }
    }

    private extendAssignmentContextIfNeeded(context: MappingContext): void {
        const metadata = context.metadata as MappingAssignmentMetadata;

        if (metadata.inputElementIds.length === 0) {

            const operatorElement = this.elements.find(el => el.id === metadata.operatorId);
            if (!operatorElement) return;

            let lastPosition = operatorElement.position.end;
            const followingElements: number[] = [];

            for (const element of this.elements) {
                if (element.position.start > lastPosition) {
                    if (element.type === MappingElementType.WHITESPACE) {
                        followingElements.push(element.id);
                        lastPosition = element.position.end;
                        context.position.end = element.position.end;
                    } else {
                        break;
                    }
                }
            }

            context.elementIds.push(...followingElements);
        }
    }

    private extendIncompleteContext(context: MappingContext): void {
        const lastElementId = Math.max(...context.elementIds);
        const lastElement = this.elements.find(el => el.id === lastElementId);
        if (!lastElement) return;

        let lastPosition = lastElement.position.end;
        const followingElements: number[] = [];

        for (const element of this.elements) {
            if (element.position.start > lastPosition) {
                if ((element.type as MappingElementType) === MappingElementType.WHITESPACE) {
                    followingElements.push(element.id);
                    lastPosition = element.position.end;
                    context.position.end = element.position.end;
                } else {
                    break;
                }
            }
        }

        context.elementIds.push(...followingElements);
    }

    override visitTerminal(node: TerminalNode): void {
        if (node.symbol.type === MappingsGrammarParser.EOF) {
            return;
        }

        if (this.isVirtualToken(node)) {
            return;
        }

        const elementType = this.getElementType(node);
        let element: MappingParsedElement;

        switch (elementType) {
            case MappingElementType.IDENTIFIER:
                element = this.createIdentifierElement(node);
                break;
            case MappingElementType.SEPARATOR_COMMA:
            case MappingElementType.SEPARATOR_END:
            case MappingElementType.SEPARATOR_COLON:
                element = this.createSeparatorElement(node, elementType);
                break;
            case MappingElementType.LITERAL_TEXT:
            case MappingElementType.LITERAL_NUMBER:
            case MappingElementType.LITERAL_BOOLEAN:
            case MappingElementType.LITERAL_NULL:
                element = this.createLiteralElement(node, elementType);
                break;
            case MappingElementType.OPERATOR_ASSIGNMENT:
            case MappingElementType.OPERATOR_MATH:
            case MappingElementType.OPERATOR_NULL_COALESCING:
                element = this.createOperatorElement(node, elementType);
                break;
            case MappingElementType.KEYWORD:
                element = this.createKeywordElement(node);
                break;
            case MappingElementType.BRACKET_OPEN:
            case MappingElementType.BRACKET_CLOSE:
                element = this.createBracketElement(node, elementType);
                break;
            case MappingElementType.FUNCTION_NAME:
                element = this.createFunctionElement(node);
                break;
            default:
                element = this.createErrorElement(node, elementType);
                break;
        }

        if (node.symbol.type === MappingsGrammarLexer.UNFINISHED_STRING) {
            const errorElement = element as MappingErrorElement;
            errorElement.type = MappingElementType.INCOMPLETE;
            errorElement.isValid = false;
            errorElement.errorMessage = `Unfinished string literal: ${element.value}`;

            this.diagnostics.push({
                code: MappingDiagnosticCode.UNFINISHED_STRING,
                message: errorElement.errorMessage,
                position: element.position,
                severity: 'error'
            });
        }

        this.elements.push(element);
        this.terminalToElementMap.set(node, element);
    }

    override visitErrorNode(node: ErrorNode): void {
        this.visitTerminal(node);
    }

    private isVirtualToken(terminal: TerminalNode): boolean {
        return terminal.symbol.start === -1 && terminal.symbol.stop === -1;
    }

    override visitBasicMapping?: ((ctx: BasicMappingContext) => void) | undefined = (ctx) => {
        super.visitChildren(ctx);

        const outputCtx = ctx.output();
        const assignCtx = ctx.ASSIGN();
        const expressionCtx = ctx.expression();

        if (!outputCtx || !assignCtx) return;

        const outputElement = this.findElement(outputCtx.IDENTIFIER());
        const assignElement = this.findElement(assignCtx);

        if (!outputElement || !assignElement) return;

        (outputElement as MappingIdentifierElement).identifierContext = {
            type: 'output_field'
        };

        if (expressionCtx) {
            this.markInputIdentifiers(expressionCtx);
        }

        const allElements = this.collectElementsInContext(ctx);
        const { leftElements, rightElements } = this.splitElementsByOperator(allElements, assignElement);

        const context: MappingContext = {
            id: this.nextContextId(),
            type: MappingContextType.ASSIGNMENT,
            elementIds: allElements.map(el => el.id),
            position: this.getContextPosition(ctx),
            isComplete: leftElements.length > 0 && !!expressionCtx && rightElements.length > 0,
            metadata: {
                type: 'assignment',
                operatorId: assignElement.id,
                outputElementId: outputElement.id,
                inputElementIds: rightElements.map(el => el.id)
            } as MappingAssignmentMetadata
        };

        this.contexts.push(context);
    }

    override visitConditionalMapping?: ((ctx: ConditionalMappingContext) => void) | undefined = (ctx) => {
        super.visitChildren(ctx);

        const outputCtx = ctx.output();
        const assignCtx = ctx.CONDITIONALASSIGN();
        const inputCtx = ctx.input();

        if (!outputCtx || !assignCtx || !inputCtx) return;

        const outputElement = this.findElement(outputCtx.IDENTIFIER());
        const assignElement = this.findElement(assignCtx);
        const inputElement = this.findElement(inputCtx.IDENTIFIER());

        if (!outputElement || !assignElement) return;

        (outputElement as MappingIdentifierElement).identifierContext = {
            type: 'output_field'
        };

        if (inputElement) {
            (inputElement as MappingIdentifierElement).identifierContext = {
                type: 'input_field'
            };
        }


        const allElements = this.collectElementsInContext(ctx);
        const { leftElements, rightElements } = this.splitElementsByOperator(allElements, assignElement);

        const context: MappingContext = {
            id: this.nextContextId(),
            type: MappingContextType.CONDITIONAL_ASSIGNMENT,
            elementIds: allElements.map(el => el.id),
            position: this.getContextPosition(ctx),
            isComplete: leftElements.length > 0 && rightElements.length > 0,
            metadata: {
                type: 'conditional_assignment',
                operatorId: assignElement.id,
                outputElementId: outputElement.id,
                inputElementIds: rightElements.map(el => el.id)
            } as MappingAssignmentMetadata
        };

        this.contexts.push(context);
    }

    /**
 * HACK: Handle incomplete mapping expressions that aren't captured by the grammar
 * 
 * The ANTLR grammar requires a complete expression after assignment operators (e.g., ':=').
 * However, during user typing, we often have incomplete expressions like 'field := |' where
 * the cursor is after the operator with no right-hand side expression yet.
 * 
 * In these cases, the parser fails to match any mapping rule and creates a generic MappingContext
 * without calling specific visit methods like visitBasicMapping. This prevents us from creating
 * proper contexts for autocompletion and validation.
 * 
 * This workaround detects these orphaned MappingContext nodes and manually creates the
 * appropriate context structure, allowing autocompletion to work even for incomplete expressions.
 *
 */
    override visitChildren(node: ParserRuleContext): void {
        super.visitChildren(node);

        if (node.constructor.name === 'MappingContext') {
            const nodeStart = node.start.start;
            const nodeEnd = node.stop?.stop ?? node.start.stop;

            const existingContext = this.contexts.find(ctx =>
                ctx.position.start === nodeStart && ctx.position.end === nodeEnd
            );

            if (!existingContext) {
                this.handleIncompleteMappingContext(node);
            }
        }
    }

    private handleIncompleteMappingContext(ctx: ParserRuleContext): void {
        const allElements = this.collectElementsInContext(ctx);

        const assignmentOp = allElements.find(el =>
            el.type === MappingElementType.OPERATOR_ASSIGNMENT
        );

        if (!assignmentOp) return;

        const outputElement = allElements.find(el =>
            el.type === MappingElementType.IDENTIFIER &&
            el.position.end < assignmentOp.position.start
        );

        if (!outputElement) return;

        (outputElement as MappingIdentifierElement).identifierContext = {
            type: 'output_field'
        };

        const context: MappingContext = {
            id: this.nextContextId(),
            type: MappingContextType.ASSIGNMENT,
            elementIds: allElements.map(el => el.id),
            position: this.getContextPosition(ctx),
            isComplete: false,
            metadata: {
                type: 'assignment',
                operatorId: assignmentOp.id,
                outputElementId: outputElement.id,
                inputElementIds: []
            } as MappingAssignmentMetadata
        };

        this.contexts.push(context);
    }


    override visitNullCoalescing?: ((ctx: NullCoalescingContext) => void) | undefined = (ctx) => {
        super.visitChildren(ctx);

        const rightSides = ctx.nullCoalescingRightSide_list();
        if (!rightSides || rightSides.length === 0) return;

        const allElements = this.collectElementsInContext(ctx);
        let currentLeftStart = 0;

        rightSides.forEach((rightSide, index) => {
            const nullCoalescingOperator = rightSide.NULLCOALESCING();
            if (!nullCoalescingOperator) return;

            const operatorElement = this.findElement(nullCoalescingOperator);
            if (!operatorElement) return;

            const operatorIndex = allElements.findIndex(el => el.id === operatorElement.id);
            if (operatorIndex === -1) return;

            const leftElements = allElements.slice(currentLeftStart, operatorIndex);
            const rightElements = this.findRightSideElements(rightSide, allElements, operatorIndex + 1);

            const context: MappingContext = {
                id: this.nextContextId(),
                type: MappingContextType.NULL_COALESCING,
                elementIds: [...leftElements, operatorElement, ...rightElements].map(el => el.id),
                position: {
                    start: leftElements[0]?.position.start ?? operatorElement.position.start,
                    end: rightElements[rightElements.length - 1]?.position.end ?? operatorElement.position.end
                },
                isComplete: leftElements.length > 0 && rightElements.length > 0,
                metadata: {
                    type: 'null_coalescing',
                    operatorId: operatorElement.id,
                    leftElementIds: leftElements.map(el => el.id),
                    rightElementIds: rightElements.map(el => el.id)
                } as MappingNullCoalescingMetadata
            };

            this.contexts.push(context);

            currentLeftStart = 0;
        });
    }

    override visitManyMappings?: ((ctx: ManyMappingsContext) => void) | undefined = (ctx) => {
        super.visitChildren(ctx);
    }

    private findRightSideElements(rightSide: NullCoalescingRightSideContext, allElements: MappingParsedElement[], startIndex: number): MappingParsedElement[] {
        const rightSideElements = this.collectElementsInContext(rightSide);
        const operatorElement = this.findElement(rightSide.NULLCOALESCING());

        return rightSideElements.filter(el =>
            operatorElement && el.position.start > operatorElement.position.end
        );
    }

    private markInputIdentifiers(expressionCtx: ExpressionContext): void {
        const elements = this.collectElementsInContext(expressionCtx);
        elements
            .filter(el => el.type === MappingElementType.IDENTIFIER)
            .forEach(el => {
                const identifierEl = el as MappingIdentifierElement;
                if (!identifierEl.identifierContext) {
                    identifierEl.identifierContext = {
                        type: 'input_field'
                    };
                }
            });
    }

    private splitElementsByOperator(
        elements: MappingParsedElement[],
        operatorElement: MappingParsedElement
    ): { leftElements: MappingParsedElement[], rightElements: MappingParsedElement[] } {
        const operatorIndex = elements.findIndex(el => el.id === operatorElement.id);

        return {
            leftElements: elements.slice(0, operatorIndex),
            rightElements: elements.slice(operatorIndex + 1)
        };
    }

    private collectElementsInContext(ctx: ParserRuleContext): MappingParsedElement[] {
        const start = ctx.start.start;
        const end = ctx.stop?.stop ?? ctx.start.stop;

        return this.elements
            .filter(el => el.position.start >= start && el.position.end <= end)
            .sort((a, b) => a.position.start - b.position.start);
    }

    private getContextPosition(ctx: ParserRuleContext): Position {
        return {
            start: ctx.start.start,
            end: ctx.stop?.stop ?? ctx.start.stop
        };
    }

    private getElementType(node: TerminalNode): MappingElementType {
        const tokenType = node.symbol.type;

        // Literals
        if (tokenType === MappingsGrammarLexer.DECIMAL) return MappingElementType.LITERAL_NUMBER;
        if (tokenType === MappingsGrammarLexer.TEXT) return MappingElementType.LITERAL_TEXT;
        if (tokenType === MappingsGrammarLexer.BOOL) return MappingElementType.LITERAL_BOOLEAN;
        if (tokenType === MappingsGrammarLexer.NULL) return MappingElementType.LITERAL_NULL;

        // Identifiers
        if (tokenType === MappingsGrammarLexer.IDENTIFIER) return MappingElementType.IDENTIFIER;

        // Assignment operators
        if ([MappingsGrammarLexer.ASSIGN, MappingsGrammarLexer.CONDITIONALASSIGN].includes(tokenType)) {
            return MappingElementType.OPERATOR_ASSIGNMENT;
        }

        // Math operators
        if ([MappingsGrammarLexer.PLUS, MappingsGrammarLexer.MINUS, MappingsGrammarLexer.MULTIPLICATION,
        MappingsGrammarLexer.DIVISION, MappingsGrammarLexer.POWER].includes(tokenType)) {
            return MappingElementType.OPERATOR_MATH;
        }

        // Null coalescing
        if (tokenType === MappingsGrammarLexer.NULLCOALESCING) {
            return MappingElementType.OPERATOR_NULL_COALESCING;
        }

        // Functions
        if ([
        MappingsGrammarLexer.FORMAT, 
        MappingsGrammarLexer.LENGTH,
        MappingsGrammarLexer.COUNT].includes(tokenType)) {
            return MappingElementType.FUNCTION_NAME;
        }

        // Brackets
        if ([MappingsGrammarLexer.LPAREN, MappingsGrammarLexer.LARRAYPAREN].includes(tokenType)) {
            return MappingElementType.BRACKET_OPEN;
        }
        if ([MappingsGrammarLexer.RPAREN, MappingsGrammarLexer.RARRAYPAREN,].includes(tokenType)) {
            return MappingElementType.BRACKET_CLOSE;
        }

        // Separators
        if (tokenType === MappingsGrammarLexer.COMMA) {
            return MappingElementType.SEPARATOR_COMMA;
        }
        if (tokenType === MappingsGrammarLexer.END) {
            return MappingElementType.SEPARATOR_END;
        }

        if (tokenType === MappingsGrammarLexer.COLON) {
            return MappingElementType.SEPARATOR_COLON;
        }

        return MappingElementType.ERROR;
    }

    private createLiteralElement(node: TerminalNode, elementType: MappingElementType.LITERAL_TEXT | MappingElementType.LITERAL_NUMBER | MappingElementType.LITERAL_BOOLEAN | MappingElementType.LITERAL_NULL): MappingLiteralElement {
        return {
            id: ++this.elementIdCounter,
            type: elementType,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }

    private createOperatorElement(node: TerminalNode, elementType: MappingElementType.OPERATOR_ASSIGNMENT | MappingElementType.OPERATOR_MATH | MappingElementType.OPERATOR_NULL_COALESCING): MappingOperatorElement {
        return {
            id: ++this.elementIdCounter,
            type: elementType,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }

    private createKeywordElement(node: TerminalNode): MappingKeywordElement {
        return {
            id: ++this.elementIdCounter,
            type: MappingElementType.KEYWORD,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }

    private createBracketElement(node: TerminalNode, elementType: MappingElementType.BRACKET_OPEN | MappingElementType.BRACKET_CLOSE): MappingBracketElement {
        return {
            id: ++this.elementIdCounter,
            type: elementType,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }

    private createFunctionElement(node: TerminalNode): MappingFunctionElement {
        return {
            id: ++this.elementIdCounter,
            type: MappingElementType.FUNCTION_NAME,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }

    private createErrorElement(node: TerminalNode, elementType: MappingElementType): MappingErrorElement {
        return {
            id: ++this.elementIdCounter,
            type: elementType as MappingElementType.ERROR | MappingElementType.INCOMPLETE,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: false
        };
    }

    private createIdentifierElement(node: TerminalNode): MappingIdentifierElement {
        return {
            id: ++this.elementIdCounter,
            type: MappingElementType.IDENTIFIER,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true,
            identifierContext: {
                type: 'input_field'
            }
        };
    }

    private createSeparatorElement(node: TerminalNode, elementType: MappingElementType.SEPARATOR_COMMA | MappingElementType.SEPARATOR_COLON | MappingElementType.SEPARATOR_END): MappingSeparatorElement {

        return {
            id: ++this.elementIdCounter,
            type: elementType,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }

    protected findElement(terminal: TerminalNode | undefined): MappingParsedElement | undefined {
        if (!terminal || this.isVirtualToken(terminal)) {
            return undefined;
        }
        return this.terminalToElementMap.get(terminal);
    }

    protected nextContextId(): number {
        return ++this.contextIdCounter;
    }
}