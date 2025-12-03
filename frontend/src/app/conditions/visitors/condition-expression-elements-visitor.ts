import { CharStreams, CommonTokenStream, ErrorListener, ErrorNode, ParserRuleContext, TerminalNode, Token } from 'antlr4';
import ConditionsLexer from '../generated/ConditionsLexer';
import ConditionsParser, { BinaryxContext, ComparatorxContext, EqualityxContext, ExpressionsequalityxContext, IdentifierContext, IdentifierStringxContext, IteratorContext, LambdaxContext, NumberIdentifierxContext, ParenxContext } from '../generated/ConditionsParser';
import ConditionsVisitor from '../generated/ConditionsVisitor';

interface ExpLexerError {
    exception?: any;
    msg: string;
    offendingSymbol: number;
    line: number;
    position: number;
}

interface ExpParserError {
    exception?: any;
    msg: string;
    offendingSymbol: Token;
    line: number;
    position: number;
}

class ExpLexerErrorListener extends ErrorListener<number> {
    constructor(private onError: (error: ExpLexerError) => void) {
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

class ExpParserErrorListener extends ErrorListener<Token> {
    constructor(private onError: (error: ExpParserError) => void) {
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

export type ParsedElement =
    | WhitespaceElement
    | IdentifierElement
    | LiteralElement
    | OperatorElement
    | KeywordElement
    | BracketElement
    | SeparatorElement
    | LambdaArrowElement
    | FunctionElement
    | ErrorElement;

export interface BaseElement {
    id: number;
    value: string;
    position: Position;
    isValid: boolean;
    errorMessage?: string;
}

export interface IdentifierElement extends BaseElement {
    type: ElementType.IDENTIFIER;
    identifierContext?: IdentifierElementContext;
}

export interface SeparatorElement extends BaseElement {
    type: ElementType.SEPARATOR_COMMA | ElementType.SEPARATOR_COLON;
    lambdaVariableElementId?: number;
    functionElementId?: number;
}

export interface LambdaArrowElement extends BaseElement {
    type: ElementType.LAMBDA_ARROW;
}

export interface LiteralElement extends BaseElement {
    type: ElementType.LITERAL_TEXT | ElementType.LITERAL_NUMBER | ElementType.LITERAL_BOOLEAN;
}

export interface OperatorElement extends BaseElement {
    type: ElementType.OPERATOR_COMPARISON | ElementType.OPERATOR_LOGICAL | ElementType.OPERATOR_MATH;
}

export interface KeywordElement extends BaseElement {
    type: ElementType.KEYWORD;
}

export interface BracketElement extends BaseElement {
    type: ElementType.BRACKET_OPEN | ElementType.BRACKET_CLOSE;
}

export interface FunctionElement extends BaseElement {
    type: ElementType.FUNCTION_NAME;
}

export interface ErrorElement extends BaseElement {
    type: ElementType.ERROR | ElementType.INCOMPLETE;
}

export type IdentifierElementContext =
    | LambdaVariableContext
    | LambdaPropertyAccessContext
    | NormalIdentifierContext;

export interface LambdaVariableContext {
    type: 'lambda_variable';
    role: 'definition' | 'reference';
}

export interface LambdaPropertyAccessContext {
    type: 'lambda_property_access';
    lambdaVariableElementId: number;     // ID of lambda variable (x in "x:property")
}

export interface NormalIdentifierContext {
    type: 'normal_identifier';
}

export enum ElementType {
    WHITESPACE = 'white-space',
    // Literals
    LITERAL_NUMBER = 'literal-number',
    LITERAL_TEXT = 'literal-text',
    LITERAL_BOOLEAN = 'literal-boolean',

    // Identifiers
    IDENTIFIER = 'identifier',

    // Operators
    OPERATOR_COMPARISON = 'operator-comparison',  // ==, !=, >, <, >=, <=
    OPERATOR_LOGICAL = 'operator-logical',        // AND, OR, NOT
    OPERATOR_MATH = 'operator-math',              // +, -, *, /, ^

    // Keywords
    KEYWORD = 'keyword',                          // IS, IN etc.

    // Functions
    FUNCTION_NAME = 'function-name',              // DATE, etc.

    // Brackets
    BRACKET_OPEN = 'bracket-open',                // (, [, {
    BRACKET_CLOSE = 'bracket-close',              // ), ], }

    // Separators
    SEPARATOR_COMMA = 'separator-comma',          // .
    SEPARATOR_COLON = 'separator-colon',          // :      
    LAMBDA_ARROW = 'lambda-arrow',                // ->

    // Special
    INCOMPLETE = 'incomplete',                    // Unfinished strings, etc.
    ERROR = 'error'                              // Unrecognized tokens
}

export interface Context {
    id: number;
    type: ContextType;
    elementIds: number[];
    position: Position;
    isComplete: boolean;
    parentContextId?: number;
    metadata: ContextMetadata;
}

export enum ContextType {
    COMPARISON = 'comparison',      // a > b
    BINARY = 'binary',             // a AND b
    GROUP = 'group',               // (expression)
    ARRAY = 'array',               // [a, b, c]
    FUNCTION = 'function',         // DATE(x)
    LAMBDA = 'lambda',             // items IS x -> { x > 5 }
    ITERATOR = "iterator",
}

export type ContextMetadata =
    | WhitespaceElement
    | ComparisonMetadata
    | BinaryMetadata
    | GroupMetadata
    | ArrayMetadata
    | FunctionMetadata
    | LambdaMetadata
    | IteratorMetadata;

export interface WhitespaceElement extends BaseElement {
    type: ElementType.WHITESPACE;
}
export interface ComparisonMetadata {
    type: 'comparison';
    operatorId: number;
    elementsForLeftOperand: number[];
    elementsForRightOperand: number[];
}

export interface BinaryMetadata {
    type: 'binary';
    operatorId: number;
    elementsForLeftExpression: number[];
    elementsForRightExpression: number[];
}

export interface GroupMetadata {
    type: 'group';
    openBracketId: number;
    closeBracketId?: number;
}

export interface ArrayMetadata {
    type: 'array';
    openBracketId: number;
    closeBracketId?: number;
    separatorIds: number[];
}

export interface IteratorMetadata {
    type: 'iterator';
    identifierIds: number[];
}

export interface FunctionMetadata {
    type: 'function';
    nameId: number;
    openParenElementId?: number;
    closeParenElementId?: number;
    argumentSeparatorIds: number[];
}

export interface LambdaMetadata {
    type: 'lambda';
    collectionElementId: number;           // ID of 'collection' (identifier)
    variableElementId: number;             // ID of 'x' (identifier after IS)
    arrowElementId: number;
    openBraceElementId?: number;
    closeBraceElementId?: number;
    lambdaPropertyElementIds: number[];
}

export interface Diagnostic {
    code: DiagnosticCode;
    message: string;
    position: Position;
    severity: 'error' | 'warning';
    contextId?: number;
}

export enum DiagnosticCode {
    MISSING_CLOSING_BRACKET = 'MISSING_CLOSING_BRACKET',
    MISSING_OPENING_BRACKET = 'MISSING_OPENING_BRACKET',
    INCOMPLETE_EXPRESSION = 'INCOMPLETE_EXPRESSION',
    UNFINISHED_STRING = 'UNFINISHED_STRING',
    UNEXPECTED_TOKEN = 'UNEXPECTED_TOKEN',
    MISSING_ARGUMENT = 'MISSING_ARGUMENT'
}

export interface ConditionExpressionParsingResult {
    elements: ParsedElement[];
    contexts: Context[];
    diagnostics: Diagnostic[];
    isValid: boolean;
}

export class ConditionExpressionElementsVisitor extends ConditionsVisitor<void> {
    private elements: ParsedElement[] = [];
    private contexts: Context[] = [];
    private diagnostics: Diagnostic[] = [];
    private elementIdCounter = 0;
    private contextIdCounter = 0;

    private terminalToElementMap = new Map<TerminalNode, ParsedElement>();

    parse(input: string): ConditionExpressionParsingResult {
        const lexerErrors: ExpLexerError[] = [];
        const parserErrors: ExpParserError[] = [];

        const chars = CharStreams.fromString(input);
        const lexer = new ConditionsLexer(chars);

        lexer.removeErrorListeners();
        lexer.addErrorListener(new ExpLexerErrorListener(
            (error: ExpLexerError) => lexerErrors.push(error)
        ));

        const tokens = new CommonTokenStream(lexer);
        const parser = new ConditionsParser(tokens);

        parser.removeErrorListeners();
        parser.addErrorListener(new ExpParserErrorListener(
            (error: ExpParserError) => parserErrors.push(error)
        ));

        this.elements = [];
        this.contexts = [];
        this.diagnostics = [];
        this.elementIdCounter = 0;
        this.contextIdCounter = 0;
        this.terminalToElementMap.clear();

        const tree = parser.exp();

        if (tree) {
            this.visit(tree);
        }

        lexerErrors.forEach(err => {
            this.diagnostics.push({
                code: DiagnosticCode.UNEXPECTED_TOKEN,
                message: `Lexer error: ${err.msg}`,
                position: { start: err.position, end: err.position },
                severity: 'error'
            });
        });

        parserErrors.forEach(err => {
            this.diagnostics.push({
                code: DiagnosticCode.UNEXPECTED_TOKEN,
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

        this.fixLambdaPropertyContext();

        return {
            elements: this.elements,
            contexts: this.contexts,
            diagnostics: this.diagnostics,
            isValid: this.diagnostics.length === 0
        };
    }

    private fixLambdaPropertyContext(): void {
        for (let i = 1; i < this.elements.length; i++) {
            const previous = this.elements[i - 1];
            const current = this.elements[i];

            if (current.type === ElementType.SEPARATOR_COLON &&
                !(current as SeparatorElement).lambdaVariableElementId &&
                previous.type === ElementType.IDENTIFIER) {
                (current as SeparatorElement).lambdaVariableElementId = previous.id;
            }

        if (current.type === ElementType.IDENTIFIER &&
            previous.type === ElementType.SEPARATOR_COLON) {
            
            const colonElement = previous as SeparatorElement;
            if (colonElement.lambdaVariableElementId) {
                (current as IdentifierElement).identifierContext = {
                    type: 'lambda_property_access',
                    lambdaVariableElementId: colonElement.lambdaVariableElementId
                };
            }
        }
        }
    }

    private insertWhitespaceElements(input: string): void {
        const newElements: ParsedElement[] = [];
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

    private splitWhitespace(text: string, startPosition: number): WhitespaceElement[] {
        const elements: WhitespaceElement[] = [];
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

    private createWhitespaceElement(value: string, start: number, end: number): WhitespaceElement {
        return {
            id: ++this.elementIdCounter,
            type: ElementType.WHITESPACE,
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

            if (context.type === ContextType.COMPARISON) {
                this.extendComparisonContextIfNeeded(context);
            } else if (context.type === ContextType.LAMBDA && !context.isComplete) {
                this.extendIncompleteContext(context);
            } else if (context.type === ContextType.GROUP && !context.isComplete) {
                this.extendIncompleteContext(context);
            }
        }
    }

    private extendComparisonContextIfNeeded(context: Context): void {

        const metadata = context.metadata as ComparisonMetadata;

        const operatorElement = this.elements.find(el => el.id === metadata.operatorId);
        if (!operatorElement) return;

        if (metadata.elementsForRightOperand.length === 0) {

            let lastPosition = operatorElement.position.end;
            const followingElements: number[] = [];

            for (const element of this.elements) {
                if (element.position.start > lastPosition) {
                    if ((element.type as ElementType)  === ElementType.WHITESPACE) {
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

    private extendIncompleteContext(context: Context): void {

        const lastElementId = Math.max(...context.elementIds);
        const lastElement = this.elements.find(el => el.id === lastElementId);
        if (!lastElement) return;

        let lastPosition = lastElement.position.end;
        const followingElements: number[] = [];

        for (const element of this.elements) {
            if (element.position.start > lastPosition) {
                if ((element.type as ElementType)  === ElementType.WHITESPACE) {
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
        if (node.symbol.type === ConditionsParser.EOF) {
            return;
        }

        if (this.isVirtualToken(node)) {
            return;
        }

        const elementType = this.getElementType(node);
        let element: ParsedElement;

        switch (elementType) {
            case ElementType.IDENTIFIER:
                element = this.createIdentifierElement(node);
                break;
            case ElementType.SEPARATOR_COMMA:
            case ElementType.SEPARATOR_COLON:
                element = this.createSeparatorElement(node);
                break;
            case ElementType.LAMBDA_ARROW:
                element = this.createLambdaArrowElement(node);
                break;
            case ElementType.LITERAL_TEXT:
            case ElementType.LITERAL_NUMBER:
            case ElementType.LITERAL_BOOLEAN:
                element = this.createLiteralElement(node, elementType);
                break;
            case ElementType.OPERATOR_COMPARISON:
            case ElementType.OPERATOR_LOGICAL:
            case ElementType.OPERATOR_MATH:
                element = this.createOperatorElement(node, elementType);
                break;
            case ElementType.KEYWORD:
                element = this.createKeywordElement(node);
                break;
            case ElementType.BRACKET_OPEN:
            case ElementType.BRACKET_CLOSE:
                element = this.createBracketElement(node, elementType);
                break;
            case ElementType.FUNCTION_NAME:
                element = this.createFunctionElement(node);
                break;
            default:
                element = this.createErrorElement(node, elementType);
                break;
        }

        if (node.symbol.type === ConditionsLexer.UNFINISHED_STRING) {
            const errorElement = element as ErrorElement;
            errorElement.type = ElementType.INCOMPLETE;
            errorElement.isValid = false;
            errorElement.errorMessage = `Unfinished string literal: ${element.value}`;

            this.diagnostics.push({
                code: DiagnosticCode.UNFINISHED_STRING,
                message: errorElement.errorMessage,
                position: element.position,
                severity: 'error'
            });
        } else if (node.symbol.type === ConditionsLexer.ERROR_CHAR) {
            const errorElement = element as ErrorElement;
            errorElement.type = ElementType.ERROR;
            errorElement.isValid = false;
            errorElement.errorMessage = `Unexpected character: ${element.value}`;

            this.diagnostics.push({
                code: DiagnosticCode.UNEXPECTED_TOKEN,
                message: errorElement.errorMessage,
                position: element.position,
                severity: 'error'
            });
        }

        this.elements.push(element);
        this.terminalToElementMap.set(node, element);
    }

    private createLiteralElement(node: TerminalNode, elementType: ElementType.LITERAL_TEXT | ElementType.LITERAL_NUMBER | ElementType.LITERAL_BOOLEAN): LiteralElement {
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

    private createOperatorElement(node: TerminalNode, elementType: ElementType.OPERATOR_COMPARISON | ElementType.OPERATOR_LOGICAL | ElementType.OPERATOR_MATH): OperatorElement {
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

    private createKeywordElement(node: TerminalNode): KeywordElement {
        return {
            id: ++this.elementIdCounter,
            type: ElementType.KEYWORD,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }

    private createBracketElement(node: TerminalNode, elementType: ElementType.BRACKET_OPEN | ElementType.BRACKET_CLOSE): BracketElement {
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

    private createFunctionElement(node: TerminalNode): FunctionElement {
        return {
            id: ++this.elementIdCounter,
            type: ElementType.FUNCTION_NAME,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }

    private createErrorElement(node: TerminalNode, elementType: ElementType): ErrorElement {
        return {
            id: ++this.elementIdCounter,
            type: elementType as ElementType.ERROR | ElementType.INCOMPLETE,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: false
        };
    }

    private createIdentifierElement(node: TerminalNode): IdentifierElement {
        return {
            id: ++this.elementIdCounter,
            type: ElementType.IDENTIFIER,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true,
            identifierContext: {
                type: 'normal_identifier'
            }
        };
    }

    private createSeparatorElement(node: TerminalNode): SeparatorElement {
        const separatorType = node.symbol.type === ConditionsLexer.COMMA ?
            ElementType.SEPARATOR_COMMA : ElementType.SEPARATOR_COLON;

        return {
            id: ++this.elementIdCounter,
            type: separatorType,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }

    private createLambdaArrowElement(node: TerminalNode): LambdaArrowElement {
        return {
            id: ++this.elementIdCounter,
            type: ElementType.LAMBDA_ARROW,
            value: node.getText(),
            position: {
                start: node.symbol.start,
                end: node.symbol.stop
            },
            isValid: true
        };
    }


    override visitErrorNode(node: ErrorNode): void {
        this.visitTerminal(node);
    }

    private isVirtualToken(terminal: TerminalNode): boolean {
        return terminal.symbol.start === -1 && terminal.symbol.stop === -1;
    }

    override visitLambdax?: ((ctx: LambdaxContext) => void) | undefined = (ctx) => {

        super.visitChildren(ctx);

        const equatableCtx = ctx.equatable();
        if (!equatableCtx) return;

        let collectionElement: IdentifierElement;

        const equatableElements = this.collectElementsInContext(equatableCtx);
        const identifierElements = equatableElements
            .filter(el => el.type === ElementType.IDENTIFIER)
            .map(el => el as IdentifierElement);

        if (identifierElements.length === 1) {
            collectionElement = identifierElements[0];
        }
        else {
            const propertyElement = identifierElements.find(el =>
                el.identifierContext?.type === 'lambda_property_access'
            );
            if (propertyElement) {
                collectionElement = propertyElement;
            } else {
                collectionElement = identifierElements[identifierElements.length - 1];
            }
        }

        if (!collectionElement) return;

        const isElement = this.findElement(ctx.IS());
        if (!isElement) return;

        const variableElement = this.findElement(ctx.IDENTIFIER()) as IdentifierElement;
        if (!variableElement) return;

        const arrowElement = this.findElement(ctx.LAMBDAARROW());
        if (!arrowElement) return;

        const openBraceElement = this.findElement(ctx.LLAMBDAPAREN());
        const closeBraceElement = this.findElement(ctx.RLAMBDAPAREN());

        variableElement.identifierContext = {
            type: 'lambda_variable',
            role: 'definition'
        };

        const expressionCtx = ctx.expression();

        if (expressionCtx) {
            const expressionElements = this.collectElementsInContext(expressionCtx);

            const lambdaVariableReferences = expressionElements
                .filter(el => el.type === ElementType.IDENTIFIER)
                .map(el => el as IdentifierElement)
                .filter(el =>
                    el.value === variableElement.value &&
                    el.id !== variableElement.id &&
                    (!el.identifierContext || el.identifierContext.type === 'normal_identifier')
                );

            lambdaVariableReferences.forEach(ref => {
                ref.identifierContext = {
                    type: 'lambda_variable',
                    role: 'reference'
                };
            });
        }

        const allElements = this.collectElementsInContext(ctx);

        const context: Context = {
            id: this.nextContextId(),
            type: ContextType.LAMBDA,
            elementIds: allElements.map(el => el.id),
            position: this.getContextPosition(ctx),
            isComplete: !!closeBraceElement,
            metadata: {
                type: 'lambda',
                collectionElementId: collectionElement.id,
                variableElementId: variableElement.id,
                arrowElementId: arrowElement.id,
                openBraceElementId: openBraceElement?.id,
                closeBraceElementId: closeBraceElement?.id
            } as LambdaMetadata
        };

        this.contexts.push(context);

        if (openBraceElement && !closeBraceElement) {
            this.diagnostics.push({
                code: DiagnosticCode.MISSING_CLOSING_BRACKET,
                message: 'Missing closing brace for lambda expression',
                position: {
                    start: allElements[allElements.length - 1].position.end + 1,
                    end: allElements[allElements.length - 1].position.end + 1
                },
                severity: 'error',
                contextId: context.id
            });
        }


    }
    override visitIdentifier?: ((ctx: IdentifierContext) => void) | undefined = (ctx) => {

        super.visitChildren(ctx);

        const colonNode = ctx.COLON();
        if (!colonNode) {
            return;
        }

        const parentIdentifierNode = ctx.identifier()?.IDENTIFIER();
        const propertyIdentifierNode = ctx.IDENTIFIER();

        if (!parentIdentifierNode || !propertyIdentifierNode) return;

        const lambdaVarElement = this.findElement(parentIdentifierNode) as IdentifierElement;
        const propertyElement = this.findElement(propertyIdentifierNode) as IdentifierElement;

        if (!lambdaVarElement || !propertyElement) return;

        lambdaVarElement.identifierContext = {
            type: 'lambda_variable',
            role: 'reference'
        };

        propertyElement.identifierContext = {
            type: 'lambda_property_access',
            lambdaVariableElementId: lambdaVarElement.id
        };

        const colonElement = this.findElement(colonNode);
        if (colonElement && colonElement.type === ElementType.SEPARATOR_COLON) {
            (colonElement as SeparatorElement).lambdaVariableElementId = lambdaVarElement.id;
        }
    }

    override visitParenx: ((ctx: ParenxContext) => void) | undefined = (ctx) => {
        super.visitChildren(ctx);

        const leftParen = this.findElement(ctx.LPAREN());
        const rightParen = this.findElement(ctx.RPAREN());

        if (!leftParen) return;

        const allElements = this.collectElementsInContext(ctx);

        const context: Context = {
            id: this.nextContextId(),
            type: ContextType.GROUP,
            elementIds: allElements.map(el => el.id),
            position: {
                start: leftParen.position.start,
                end: rightParen?.position.end ?? allElements[allElements.length - 1].position.end
            },
            isComplete: !!rightParen,
            metadata: {
                type: 'group',
                openBracketId: leftParen.id,
                closeBracketId: rightParen?.id
            } as GroupMetadata
        };

        this.contexts.push(context);

        if (!rightParen) {
            this.diagnostics.push({
                code: DiagnosticCode.MISSING_CLOSING_BRACKET,
                message: 'Missing closing parenthesis',
                position: {
                    start: allElements[allElements.length - 1].position.end + 1,
                    end: allElements[allElements.length - 1].position.end + 1
                },
                severity: 'error',
                contextId: context.id
            });
        }
    }

    override visitBinaryx?: ((ctx: BinaryxContext) => void) | undefined = (ctx) => {

        super.visitChildren(ctx);

        const binary = ctx.binary();
        if (!binary) return;

        const operatorTerminal = binary.AND() || binary.OR();
        if (!operatorTerminal) return;

        const operatorElement = this.findElement(operatorTerminal);
        if (!operatorElement) return;

        const elements = this.collectElementsInContext(ctx);
        const { leftElements, rightElements } = this.splitElementsByOperator(elements, operatorElement);

        const context: Context = {
            id: this.nextContextId(),
            type: ContextType.BINARY,
            elementIds: elements.map(el => el.id),
            position: this.getContextPosition(ctx),
            isComplete: leftElements.length > 0 && rightElements.length > 0,
            metadata: {
                type: 'binary',
                operatorId: operatorElement.id,
                elementsForLeftExpression: leftElements.map(el => el.id),
                elementsForRightExpression: rightElements.map(el => el.id)
            } as BinaryMetadata
        };

        this.contexts.push(context);
    }

    override visitComparatorx?: ((ctx: ComparatorxContext) => void) | undefined = (ctx) => {
        super.visitChildren(ctx);

        const operatorTerminal = ctx._op.GT() || ctx._op.GE() || ctx._op.LT() || ctx._op.LE();
        const operatorElement = this.findElement(operatorTerminal);

        if (!operatorElement) return;

        const elements = this.collectElementsInContext(ctx);
        const { leftElements, rightElements } = this.splitElementsByOperator(elements, operatorElement);

        const context: Context = {
            id: this.nextContextId(),
            type: ContextType.COMPARISON,
            elementIds: elements.map(el => el.id),
            position: this.getContextPosition(ctx),
            isComplete: leftElements.length > 0 && rightElements.length > 0,
            metadata: {
                type: 'comparison',
                operatorId: operatorElement.id,
                elementsForLeftOperand: leftElements.map(el => el.id),
                elementsForRightOperand: rightElements.map(el => el.id)
            } as ComparisonMetadata
        };

        this.contexts.push(context);
    }

    override visitEqualityx?: ((ctx: EqualityxContext) => void) | undefined = (ctx) => {
        super.visitChildren(ctx);

        const operatorTerminal = ctx._op.EQ() || ctx._op.NEQ();
        const operatorElement = this.findElement(operatorTerminal);

        if (!operatorElement) return;

        const elements = this.collectElementsInContext(ctx);
        const { leftElements, rightElements } = this.splitElementsByOperator(elements, operatorElement);

        const context: Context = {
            id: this.nextContextId(),
            type: ContextType.COMPARISON,
            elementIds: elements.map(el => el.id),
            position: this.getContextPosition(ctx),
            isComplete: leftElements.length > 0 && rightElements.length > 0,
            metadata: {
                type: 'comparison',
                operatorId: operatorElement.id,
                elementsForLeftOperand: leftElements.map(el => el.id),
                elementsForRightOperand: rightElements.map(el => el.id)
            } as ComparisonMetadata
        };

        this.contexts.push(context);
    }

    override visitExpressionsequalityx?: ((ctx: ExpressionsequalityxContext) => void) | undefined = (ctx) => {
        super.visitChildren(ctx);

        const operatorTerminal = ctx._op.EQ() || ctx._op.NEQ();
        const operatorElement = this.findElement(operatorTerminal);

        if (!operatorElement) return;

        const elements = this.collectElementsInContext(ctx);
        const { leftElements, rightElements } = this.splitElementsByOperator(elements, operatorElement);

        const context: Context = {
            id: this.nextContextId(),
            type: ContextType.COMPARISON,
            elementIds: elements.map(el => el.id),
            position: this.getContextPosition(ctx),
            isComplete: leftElements.length > 0 && rightElements.length > 0,
            metadata: {
                type: 'comparison',
                operatorId: operatorElement.id,
                elementsForLeftOperand: leftElements.map(el => el.id),
                elementsForRightOperand: rightElements.map(el => el.id)
            } as ComparisonMetadata
        };

        this.contexts.push(context);
    }

    private getContextPosition(ctx: ParserRuleContext): Position {
        return {
            start: ctx.start.start,
            end: ctx.stop?.stop ?? ctx.start.stop
        };
    }

    private splitElementsByOperator(
        elements: ParsedElement[],
        operatorElement: ParsedElement
    ): { leftElements: ParsedElement[], rightElements: ParsedElement[] } {
        const operatorIndex = elements.findIndex(el => el.id === operatorElement.id);

        return {
            leftElements: elements.slice(0, operatorIndex),
            rightElements: elements.slice(operatorIndex + 1)
        };
    }

    private collectElementsInContext(ctx: ParserRuleContext): ParsedElement[] {
        const start = ctx.start.start;
        const end = ctx.stop?.stop ?? ctx.start.stop;

        return this.elements
            .filter(el => el.position.start >= start && el.position.end <= end)
            .sort((a, b) => a.position.start - b.position.start);
    }

    private getElementType(node: TerminalNode): ElementType {
        const tokenType = node.symbol.type;

        if (tokenType === ConditionsLexer.DECIMAL) return ElementType.LITERAL_NUMBER;
        if (tokenType === ConditionsLexer.TEXT) return ElementType.LITERAL_TEXT;
        if (tokenType === ConditionsLexer.TRUE || tokenType === ConditionsLexer.FALSE) {
            return ElementType.LITERAL_BOOLEAN;
        }

        if (tokenType === ConditionsLexer.IDENTIFIER) return ElementType.IDENTIFIER;

        if ([ConditionsLexer.EQ, ConditionsLexer.NEQ, ConditionsLexer.GT,
        ConditionsLexer.GE, ConditionsLexer.LT, ConditionsLexer.LE].includes(tokenType)) {
            return ElementType.OPERATOR_COMPARISON;
        }

        if ([ConditionsLexer.AND, ConditionsLexer.OR, ConditionsLexer.NOT].includes(tokenType)) {
            return ElementType.OPERATOR_LOGICAL;
        }

        if ([ConditionsLexer.PLUS, ConditionsLexer.MINUS, ConditionsLexer.MULTIPLICATION,
        ConditionsLexer.DIVISION, ConditionsLexer.POWER].includes(tokenType)) {
            return ElementType.OPERATOR_MATH;
        }

        if ([ConditionsLexer.IS, ConditionsLexer.OF, ConditionsLexer.ANY,
        ConditionsLexer.ALL].includes(tokenType)) {
            return ElementType.KEYWORD;
        }

        if ([ConditionsLexer.DATE].includes(tokenType)) {
            return ElementType.FUNCTION_NAME;
        }

        if ([ConditionsLexer.LPAREN, ConditionsLexer.LARRAYPAREN,
        ConditionsLexer.LLAMBDAPAREN].includes(tokenType)) {
            return ElementType.BRACKET_OPEN;
        }
        if ([ConditionsLexer.RPAREN, ConditionsLexer.RARRAYPAREN,
        ConditionsLexer.RLAMBDAPAREN].includes(tokenType)) {
            return ElementType.BRACKET_CLOSE;
        }

        if (tokenType === ConditionsLexer.COMMA) {
            return ElementType.SEPARATOR_COMMA;
        }

        if (tokenType === ConditionsLexer.COLON) {
            return ElementType.SEPARATOR_COLON;
        }

        if (tokenType === ConditionsLexer.LAMBDAARROW) {
            return ElementType.LAMBDA_ARROW;
        }

        return ElementType.ERROR;
    }

    protected findElement(terminal: TerminalNode | undefined): ParsedElement | undefined {
        if (!terminal || this.isVirtualToken(terminal)) {
            return undefined;
        }
        return this.terminalToElementMap.get(terminal);
    }

    protected nextContextId(): number {
        return ++this.contextIdCounter;
    }
}