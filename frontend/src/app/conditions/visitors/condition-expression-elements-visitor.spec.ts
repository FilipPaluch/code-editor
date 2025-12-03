import { ConditionExpressionElementsVisitor, ContextType, DiagnosticCode, ElementType } from './condition-expression-elements-visitor';
import { describe, it, expect } from 'vitest';

describe('ConditionExpressionElementsVisitor', () => {
    function elem(
        id: number,
        value: string,
        type: ElementType,
        start: number,
        end: number,
        isValid: boolean = true,
        errorMessage?: string,
        identifierContext?: any
    ): any {
        const element: any = {
            id,
            type,
            value,
            position: { start, end },
            isValid
        };

        if (errorMessage) {
            element.errorMessage = errorMessage;
        }

        if (identifierContext) {
            element.identifierContext = identifierContext;
        }

        return expect.objectContaining(element);
    }

    it('TRUE = FALSE', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('TRUE = FALSE');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'TRUE', ElementType.LITERAL_BOOLEAN, 0, 3),
                elem(4, ' ', ElementType.WHITESPACE, 4, 4),
                elem(2, '=', ElementType.OPERATOR_COMPARISON, 5, 5),
                elem(5, ' ', ElementType.WHITESPACE, 6, 6),
                elem(3, 'FALSE', ElementType.LITERAL_BOOLEAN, 7, 11)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 4, 2, 5, 3],
                    position: { start: 0, end: 11 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 2,
                        elementsForLeftOperand: [1],
                        elementsForRightOperand: [3]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('x > 5 AND y < 10', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('x > 5 AND y < 10');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'x', ElementType.IDENTIFIER, 0, 0),
                elem(8, ' ', ElementType.WHITESPACE, 1, 1),
                elem(2, '>', ElementType.OPERATOR_COMPARISON, 2, 2),
                elem(9, ' ', ElementType.WHITESPACE, 3, 3),
                elem(3, '5', ElementType.LITERAL_NUMBER, 4, 4),
                elem(10, ' ', ElementType.WHITESPACE, 5, 5),
                elem(4, 'AND', ElementType.OPERATOR_LOGICAL, 6, 8),
                elem(11, ' ', ElementType.WHITESPACE, 9, 9),
                elem(5, 'y', ElementType.IDENTIFIER, 10, 10),
                elem(12, ' ', ElementType.WHITESPACE, 11, 11),
                elem(6, '<', ElementType.OPERATOR_COMPARISON, 12, 12),
                elem(13, ' ', ElementType.WHITESPACE, 13, 13),
                elem(7, '10', ElementType.LITERAL_NUMBER, 14, 15)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 8, 2, 9, 3],
                    position: { start: 0, end: 4 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 2,
                        elementsForLeftOperand: [1],
                        elementsForRightOperand: [3]
                    }
                },
                {
                    id: 2,
                    type: ContextType.COMPARISON,
                    elementIds: [5, 12, 6, 13, 7],
                    position: { start: 10, end: 15 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 6,
                        elementsForLeftOperand: [5],
                        elementsForRightOperand: [7]
                    }
                },
                {
                    id: 3,
                    type: ContextType.BINARY,
                    elementIds: [1, 8, 2, 9, 3, 10, 4, 11, 5, 12, 6, 13, 7],
                    position: { start: 0, end: 15 },
                    isComplete: true,
                    metadata: {
                        type: 'binary',
                        operatorId: 4,
                        elementsForLeftExpression: [1, 2, 3],
                        elementsForRightExpression: [5, 6, 7]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('a >= 100 OR b <= 50', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('a >= 100 OR b <= 50');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'a', ElementType.IDENTIFIER, 0, 0),
                elem(8, ' ', ElementType.WHITESPACE, 1, 1),
                elem(2, '>=', ElementType.OPERATOR_COMPARISON, 2, 3),
                elem(9, ' ', ElementType.WHITESPACE, 4, 4),
                elem(3, '100', ElementType.LITERAL_NUMBER, 5, 7),
                elem(10, ' ', ElementType.WHITESPACE, 8, 8),
                elem(4, 'OR', ElementType.OPERATOR_LOGICAL, 9, 10),
                elem(11, ' ', ElementType.WHITESPACE, 11, 11),
                elem(5, 'b', ElementType.IDENTIFIER, 12, 12),
                elem(12, ' ', ElementType.WHITESPACE, 13, 13),
                elem(6, '<=', ElementType.OPERATOR_COMPARISON, 14, 15),
                elem(13, ' ', ElementType.WHITESPACE, 16, 16),
                elem(7, '50', ElementType.LITERAL_NUMBER, 17, 18)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 8, 2, 9, 3],
                    position: { start: 0, end: 7 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 2,
                        elementsForLeftOperand: [1],
                        elementsForRightOperand: [3]
                    }
                },
                {
                    id: 2,
                    type: ContextType.COMPARISON,
                    elementIds: [5, 12, 6, 13, 7],
                    position: { start: 12, end: 18 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 6,
                        elementsForLeftOperand: [5],
                        elementsForRightOperand: [7]
                    }
                },
                {
                    id: 3,
                    type: ContextType.BINARY,
                    elementIds: [1, 8, 2, 9, 3, 10, 4, 11, 5, 12, 6, 13, 7],
                    position: { start: 0, end: 18 },
                    isComplete: true,
                    metadata: {
                        type: 'binary',
                        operatorId: 4,
                        elementsForLeftExpression: [1, 2, 3],
                        elementsForRightExpression: [5, 6, 7]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('NOT (active = TRUE)', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('NOT (active = TRUE)');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'NOT', ElementType.OPERATOR_LOGICAL, 0, 2),
                elem(7, ' ', ElementType.WHITESPACE, 3, 3),
                elem(2, '(', ElementType.BRACKET_OPEN, 4, 4),
                elem(3, 'active', ElementType.IDENTIFIER, 5, 10),
                elem(8, ' ', ElementType.WHITESPACE, 11, 11),
                elem(4, '=', ElementType.OPERATOR_COMPARISON, 12, 12),
                elem(9, ' ', ElementType.WHITESPACE, 13, 13),
                elem(5, 'TRUE', ElementType.LITERAL_BOOLEAN, 14, 17),
                elem(6, ')', ElementType.BRACKET_CLOSE, 18, 18)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [3, 8, 4, 9, 5],
                    position: { start: 5, end: 17 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 4,
                        elementsForLeftOperand: [3],
                        elementsForRightOperand: [5]
                    }
                },
                {
                    id: 2,
                    type: ContextType.GROUP,
                    elementIds: [2, 3, 8, 4, 9, 5, 6],
                    position: { start: 4, end: 18 },
                    isComplete: true,
                    metadata: {
                        type: 'group',
                        openBracketId: 2,
                        closeBracketId: 6
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('status != \'pending\'', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('status != \'pending\'');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'status', ElementType.IDENTIFIER, 0, 5),
                elem(4, ' ', ElementType.WHITESPACE, 6, 6),
                elem(2, '!=', ElementType.OPERATOR_COMPARISON, 7, 8),
                elem(5, ' ', ElementType.WHITESPACE, 9, 9),
                elem(3, '\'pending\'', ElementType.LITERAL_TEXT, 10, 18)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 4, 2, 5, 3],
                    position: { start: 0, end: 18 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 2,
                        elementsForLeftOperand: [1],
                        elementsForRightOperand: [3]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('Multiple leading, middle and trailing spaces:    status   !=    \'pending\'   ', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('   status   !=    \'pending\'   ');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(4, '   ', ElementType.WHITESPACE, 0, 2),
                elem(1, 'status', ElementType.IDENTIFIER, 3, 8),
                elem(5, '   ', ElementType.WHITESPACE, 9, 11),
                elem(2, '!=', ElementType.OPERATOR_COMPARISON, 12, 13),
                elem(6, '    ', ElementType.WHITESPACE, 14, 17),
                elem(3, '\'pending\'', ElementType.LITERAL_TEXT, 18, 26),
                elem(7, '   ', ElementType.WHITESPACE, 27, 29)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 5, 2, 6, 3], 
                    position: { start: 3, end: 26 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 2,
                        elementsForLeftOperand: [1],
                        elementsForRightOperand: [3]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('Tab characters: status\t!=\t\'pending\'', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('status\t!=\t\'pending\'');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'status', ElementType.IDENTIFIER, 0, 5),
                elem(4, '\t', ElementType.WHITESPACE, 6, 6),
                elem(2, '!=', ElementType.OPERATOR_COMPARISON, 7, 8),
                elem(5, '\t', ElementType.WHITESPACE, 9, 9),
                elem(3, '\'pending\'', ElementType.LITERAL_TEXT, 10, 18)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 4, 2, 5, 3],
                    position: { start: 0, end: 18 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 2,
                        elementsForLeftOperand: [1],
                        elementsForRightOperand: [3]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('Newlines in expression: status\n!=\n\'pending\'', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('status\n!=\n\'pending\'');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'status', ElementType.IDENTIFIER, 0, 5),
                elem(4, '\n', ElementType.WHITESPACE, 6, 6),
                elem(2, '!=', ElementType.OPERATOR_COMPARISON, 7, 8),
                elem(5, '\n', ElementType.WHITESPACE, 9, 9),
                elem(3, '\'pending\'', ElementType.LITERAL_TEXT, 10, 18)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 4, 2, 5, 3],
                    position: { start: 0, end: 18 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 2,
                        elementsForLeftOperand: [1],
                        elementsForRightOperand: [3]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('Incomplete expression with multiple spaces: task.status =    ', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('task.status =    ');

        expect(result).toMatchObject({
            isValid: false,
            elements: [
                elem(1, 'task.status', ElementType.IDENTIFIER, 0, 10),
                elem(3, ' ', ElementType.WHITESPACE, 11, 11),
                elem(2, '=', ElementType.OPERATOR_COMPARISON, 12, 12),
                elem(4, '    ', ElementType.WHITESPACE, 13, 16)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 3, 2, 4], 
                    position: { start: 0, end: 16 }, 
                    isComplete: false,
                    metadata: {
                        type: 'comparison',
                        operatorId: 2,
                        elementsForLeftOperand: [1],
                        elementsForRightOperand: []
                    }
                }
            ],
            diagnostics: [
                {
                    code: DiagnosticCode.UNEXPECTED_TOKEN,
                    message: expect.any(String),
                    position: expect.any(Object),
                    severity: 'error'
                }
            ]
        });
    });

    it('(a + b) * c > 100', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('(a + b) * c > 100');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, '(', ElementType.BRACKET_OPEN, 0, 0),
                elem(2, 'a', ElementType.IDENTIFIER, 1, 1),
                elem(10, ' ', ElementType.WHITESPACE, 2, 2),
                elem(3, '+', ElementType.OPERATOR_MATH, 3, 3),
                elem(11, ' ', ElementType.WHITESPACE, 4, 4),
                elem(4, 'b', ElementType.IDENTIFIER, 5, 5),
                elem(5, ')', ElementType.BRACKET_CLOSE, 6, 6),
                elem(12, ' ', ElementType.WHITESPACE, 7, 7),
                elem(6, '*', ElementType.OPERATOR_MATH, 8, 8),
                elem(13, ' ', ElementType.WHITESPACE, 9, 9),
                elem(7, 'c', ElementType.IDENTIFIER, 10, 10),
                elem(14, ' ', ElementType.WHITESPACE, 11, 11),
                elem(8, '>', ElementType.OPERATOR_COMPARISON, 12, 12),
                elem(15, ' ', ElementType.WHITESPACE, 13, 13),
                elem(9, '100', ElementType.LITERAL_NUMBER, 14, 16)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 2, 10, 3, 11, 4, 5, 12, 6, 13, 7, 14, 8, 15, 9],
                    position: { start: 0, end: 16 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 8,
                        elementsForLeftOperand: [1, 2, 3, 4, 5, 6, 7],
                        elementsForRightOperand: [9]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('x - y / 2 < 10', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('x - y / 2 < 10');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'x', ElementType.IDENTIFIER, 0, 0),
                elem(8, ' ', ElementType.WHITESPACE, 1, 1),
                elem(2, '-', ElementType.OPERATOR_MATH, 2, 2),
                elem(9, ' ', ElementType.WHITESPACE, 3, 3),
                elem(3, 'y', ElementType.IDENTIFIER, 4, 4),
                elem(10, ' ', ElementType.WHITESPACE, 5, 5),
                elem(4, '/', ElementType.OPERATOR_MATH, 6, 6),
                elem(11, ' ', ElementType.WHITESPACE, 7, 7),
                elem(5, '2', ElementType.LITERAL_NUMBER, 8, 8),
                elem(12, ' ', ElementType.WHITESPACE, 9, 9),
                elem(6, '<', ElementType.OPERATOR_COMPARISON, 10, 10),
                elem(13, ' ', ElementType.WHITESPACE, 11, 11),
                elem(7, '10', ElementType.LITERAL_NUMBER, 12, 13)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 8, 2, 9, 3, 10, 4, 11, 5, 12, 6, 13, 7],
                    position: { start: 0, end: 13 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 6,
                        elementsForLeftOperand: [1, 2, 3, 4, 5],
                        elementsForRightOperand: [7]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('2 ^ 3 = 8', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('2 ^ 3 = 8');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, '2', ElementType.LITERAL_NUMBER, 0, 0),
                elem(6, ' ', ElementType.WHITESPACE, 1, 1),
                elem(2, '^', ElementType.OPERATOR_MATH, 2, 2),
                elem(7, ' ', ElementType.WHITESPACE, 3, 3),
                elem(3, '3', ElementType.LITERAL_NUMBER, 4, 4),
                elem(8, ' ', ElementType.WHITESPACE, 5, 5),
                elem(4, '=', ElementType.OPERATOR_COMPARISON, 6, 6),
                elem(9, ' ', ElementType.WHITESPACE, 7, 7),
                elem(5, '8', ElementType.LITERAL_NUMBER, 8, 8)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 6, 2, 7, 3, 8, 4, 9, 5],
                    position: { start: 0, end: 8 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 4,
                        elementsForLeftOperand: [1, 2, 3],
                        elementsForRightOperand: [5]
                    }
                }
            ],
            diagnostics: []
        });
    });



    it('DATE(2023, 12, 25) > DATE(2023, 12, 24)', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('DATE(2023, 12, 25) > DATE(2023, 12, 24)');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'DATE', ElementType.FUNCTION_NAME, 0, 3),
                elem(2, '(', ElementType.BRACKET_OPEN, 4, 4),
                elem(3, '2023', ElementType.LITERAL_NUMBER, 5, 8),
                elem(4, ',', ElementType.SEPARATOR_COMMA, 9, 9),
                elem(18, ' ', ElementType.WHITESPACE, 10, 10),
                elem(5, '12', ElementType.LITERAL_NUMBER, 11, 12),
                elem(6, ',', ElementType.SEPARATOR_COMMA, 13, 13),
                elem(19, ' ', ElementType.WHITESPACE, 14, 14),
                elem(7, '25', ElementType.LITERAL_NUMBER, 15, 16),
                elem(8, ')', ElementType.BRACKET_CLOSE, 17, 17),
                elem(20, ' ', ElementType.WHITESPACE, 18, 18),
                elem(9, '>', ElementType.OPERATOR_COMPARISON, 19, 19),
                elem(21, ' ', ElementType.WHITESPACE, 20, 20),
                elem(10, 'DATE', ElementType.FUNCTION_NAME, 21, 24),
                elem(11, '(', ElementType.BRACKET_OPEN, 25, 25),
                elem(12, '2023', ElementType.LITERAL_NUMBER, 26, 29),
                elem(13, ',', ElementType.SEPARATOR_COMMA, 30, 30),
                elem(22, ' ', ElementType.WHITESPACE, 31, 31),
                elem(14, '12', ElementType.LITERAL_NUMBER, 32, 33),
                elem(15, ',', ElementType.SEPARATOR_COMMA, 34, 34),
                elem(23, ' ', ElementType.WHITESPACE, 35, 35),
                elem(16, '24', ElementType.LITERAL_NUMBER, 36, 37),
                elem(17, ')', ElementType.BRACKET_CLOSE, 38, 38)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 2, 3, 4, 18, 5, 6, 19, 7, 8, 20, 9, 21, 10, 11, 12, 13, 22, 14, 15, 23, 16, 17],
                    position: { start: 0, end: 38 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 9,
                        elementsForLeftOperand: [1, 2, 3, 4, 5, 6, 7, 8],
                        elementsForRightOperand: [10, 11, 12, 13, 14, 15, 16, 17]
                    }
                }
            ],
            diagnostics: []
        });
    });


    it('obj:prop = \'value\'', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('obj:prop = \'value\'');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'obj', ElementType.IDENTIFIER, 0, 2, true, undefined, {
                    type: 'lambda_variable',
                    role: 'reference'
                }),
                elem(2, ':', ElementType.SEPARATOR_COLON, 3, 3),
                elem(3, 'prop', ElementType.IDENTIFIER, 4, 7, true, undefined, {
                    type: 'lambda_property_access',
                    lambdaVariableElementId: 1
                }),
                elem(6, ' ', ElementType.WHITESPACE, 8, 8),
                elem(4, '=', ElementType.OPERATOR_COMPARISON, 9, 9),
                elem(7, ' ', ElementType.WHITESPACE, 10, 10),
                elem(5, '\'value\'', ElementType.LITERAL_TEXT, 11, 17)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [1, 2, 3, 6, 4, 7, 5],
                    position: { start: 0, end: 17 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 4,
                        elementsForLeftOperand: [1, 2, 3],
                        elementsForRightOperand: [5]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('ALL OF items IS x -> { x > 5 }', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('ALL OF items IS x -> { x > 5 }');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'ALL', ElementType.KEYWORD, 0, 2),
                elem(12, ' ', ElementType.WHITESPACE, 3, 3),
                elem(2, 'OF', ElementType.KEYWORD, 4, 5),
                elem(13, ' ', ElementType.WHITESPACE, 6, 6),
                elem(3, 'items', ElementType.IDENTIFIER, 7, 11),
                elem(14, ' ', ElementType.WHITESPACE, 12, 12),
                elem(4, 'IS', ElementType.KEYWORD, 13, 14),
                elem(15, ' ', ElementType.WHITESPACE, 15, 15),
                elem(5, 'x', ElementType.IDENTIFIER, 16, 16, true, undefined, {
                    type: 'lambda_variable',
                    role: 'definition'
                }),
                elem(16, ' ', ElementType.WHITESPACE, 17, 17),
                elem(6, '->', ElementType.LAMBDA_ARROW, 18, 19),
                elem(17, ' ', ElementType.WHITESPACE, 20, 20),
                elem(7, '{', ElementType.BRACKET_OPEN, 21, 21),
                elem(18, ' ', ElementType.WHITESPACE, 22, 22),
                elem(8, 'x', ElementType.IDENTIFIER, 23, 23, true, undefined, {
                    type: 'lambda_variable',
                    role: 'reference'
                }),
                elem(19, ' ', ElementType.WHITESPACE, 24, 24),
                elem(9, '>', ElementType.OPERATOR_COMPARISON, 25, 25),
                elem(20, ' ', ElementType.WHITESPACE, 26, 26),
                elem(10, '5', ElementType.LITERAL_NUMBER, 27, 27),
                elem(21, ' ', ElementType.WHITESPACE, 28, 28),
                elem(11, '}', ElementType.BRACKET_CLOSE, 29, 29)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [8, 19, 9, 20, 10],
                    position: { start: 23, end: 27 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 9,
                        elementsForLeftOperand: [8],
                        elementsForRightOperand: [10]
                    }
                },
                {
                    id: 2,
                    type: ContextType.LAMBDA,
                    elementIds: [1, 12, 2, 13, 3, 14, 4, 15, 5, 16, 6, 17, 7, 18, 8, 19, 9, 20, 10, 21, 11],
                    position: { start: 0, end: 29 },
                    isComplete: true,
                    metadata: {
                        type: 'lambda',
                        collectionElementId: 3,
                        variableElementId: 5,
                        arrowElementId: 6,
                        openBraceElementId: 7,
                        closeBraceElementId: 11
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('ANY OF [1, 2, 3] IS x -> { x > 2 }', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('ANY OF [1, 2, 3] IS x -> { x > 2 }');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'ANY', ElementType.KEYWORD, 0, 2),
                elem(18, ' ', ElementType.WHITESPACE, 3, 3),
                elem(2, 'OF', ElementType.KEYWORD, 4, 5),
                elem(19, ' ', ElementType.WHITESPACE, 6, 6),
                elem(3, '[', ElementType.BRACKET_OPEN, 7, 7),
                elem(4, '1', ElementType.LITERAL_NUMBER, 8, 8),
                elem(5, ',', ElementType.SEPARATOR_COMMA, 9, 9),
                elem(20, ' ', ElementType.WHITESPACE, 10, 10),
                elem(6, '2', ElementType.LITERAL_NUMBER, 11, 11),
                elem(7, ',', ElementType.SEPARATOR_COMMA, 12, 12),
                elem(21, ' ', ElementType.WHITESPACE, 13, 13),
                elem(8, '3', ElementType.LITERAL_NUMBER, 14, 14),
                elem(9, ']', ElementType.BRACKET_CLOSE, 15, 15),
                elem(22, ' ', ElementType.WHITESPACE, 16, 16),
                elem(10, 'IS', ElementType.KEYWORD, 17, 18),
                elem(23, ' ', ElementType.WHITESPACE, 19, 19),
                elem(11, 'x', ElementType.IDENTIFIER, 20, 20, true, undefined, {
                    type: 'normal_identifier'
                }),
                elem(24, ' ', ElementType.WHITESPACE, 21, 21),
                elem(12, '->', ElementType.LAMBDA_ARROW, 22, 23),
                elem(25, ' ', ElementType.WHITESPACE, 24, 24),
                elem(13, '{', ElementType.BRACKET_OPEN, 25, 25),
                elem(26, ' ', ElementType.WHITESPACE, 26, 26),
                elem(14, 'x', ElementType.IDENTIFIER, 27, 27, true, undefined, {
                    type: 'normal_identifier'
                }),
                elem(27, ' ', ElementType.WHITESPACE, 28, 28),
                elem(15, '>', ElementType.OPERATOR_COMPARISON, 29, 29),
                elem(28, ' ', ElementType.WHITESPACE, 30, 30),
                elem(16, '2', ElementType.LITERAL_NUMBER, 31, 31),
                elem(29, ' ', ElementType.WHITESPACE, 32, 32),
                elem(17, '}', ElementType.BRACKET_CLOSE, 33, 33)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [14, 27, 15, 28, 16],
                    position: { start: 27, end: 31 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 15,
                        elementsForLeftOperand: [14],
                        elementsForRightOperand: [16]
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('subtasks IS x -> { x:collection IS y -> { y:text = \'test\' }}', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('subtasks IS x -> { x:collection IS y -> { y:text = \'test\' }}');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'subtasks', ElementType.IDENTIFIER, 0, 7, true, undefined, {
                    type: 'normal_identifier'
                }),
                elem(20, ' ', ElementType.WHITESPACE, 8, 8),
                elem(2, 'IS', ElementType.KEYWORD, 9, 10),
                elem(21, ' ', ElementType.WHITESPACE, 11, 11),
                elem(3, 'x', ElementType.IDENTIFIER, 12, 12, true, undefined, {
                    type: 'lambda_variable',
                    role: 'definition'
                }),
                elem(22, ' ', ElementType.WHITESPACE, 13, 13),
                elem(4, '->', ElementType.LAMBDA_ARROW, 14, 15),
                elem(23, ' ', ElementType.WHITESPACE, 16, 16),
                elem(5, '{', ElementType.BRACKET_OPEN, 17, 17),
                elem(24, ' ', ElementType.WHITESPACE, 18, 18),
                elem(6, 'x', ElementType.IDENTIFIER, 19, 19, true, undefined, {
                    type: 'lambda_variable',
                    role: 'reference'
                }),
                elem(7, ':', ElementType.SEPARATOR_COLON, 20, 20),
                elem(8, 'collection', ElementType.IDENTIFIER, 21, 30, true, undefined, {
                    type: 'lambda_property_access',
                    lambdaVariableElementId: 6
                }),
                elem(25, ' ', ElementType.WHITESPACE, 31, 31),
                elem(9, 'IS', ElementType.KEYWORD, 32, 33),
                elem(26, ' ', ElementType.WHITESPACE, 34, 34),
                elem(10, 'y', ElementType.IDENTIFIER, 35, 35, true, undefined, {
                    type: 'lambda_variable',
                    role: 'definition'
                }),
                elem(27, ' ', ElementType.WHITESPACE, 36, 36),
                elem(11, '->', ElementType.LAMBDA_ARROW, 37, 38),
                elem(28, ' ', ElementType.WHITESPACE, 39, 39),
                elem(12, '{', ElementType.BRACKET_OPEN, 40, 40),
                elem(29, ' ', ElementType.WHITESPACE, 41, 41),
                elem(13, 'y', ElementType.IDENTIFIER, 42, 42, true, undefined, {
                    type: 'lambda_variable',
                    role: 'reference'
                }),
                elem(14, ':', ElementType.SEPARATOR_COLON, 43, 43),
                elem(15, 'text', ElementType.IDENTIFIER, 44, 47, true, undefined, {
                    type: 'lambda_property_access',
                    lambdaVariableElementId: 13
                }),
                elem(30, ' ', ElementType.WHITESPACE, 48, 48),
                elem(16, '=', ElementType.OPERATOR_COMPARISON, 49, 49),
                elem(31, ' ', ElementType.WHITESPACE, 50, 50),
                elem(17, '\'test\'', ElementType.LITERAL_TEXT, 51, 56),
                elem(32, ' ', ElementType.WHITESPACE, 57, 57),
                elem(18, '}', ElementType.BRACKET_CLOSE, 58, 58),
                elem(19, '}', ElementType.BRACKET_CLOSE, 59, 59)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [13, 14, 15, 30, 16, 31, 17],
                    position: { start: 42, end: 56 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 16,
                        elementsForLeftOperand: [13, 14, 15],
                        elementsForRightOperand: [17]
                    }
                },
                {
                    id: 2,
                    type: ContextType.LAMBDA,
                    elementIds: [6, 7, 8, 25, 9, 26, 10, 27, 11, 28, 12, 29, 13, 14, 15, 30, 16, 31, 17, 32, 18],
                    position: { start: 19, end: 58 },
                    isComplete: true,
                    metadata: {
                        type: 'lambda',
                        collectionElementId: 8,  // 'collection' after x:
                        variableElementId: 10,   // 'y'
                        arrowElementId: 11,      // '->'
                        openBraceElementId: 12,  // '{'
                        closeBraceElementId: 18  // '}'
                    }
                },
                {
                    id: 3,
                    type: ContextType.LAMBDA,
                    elementIds: [1, 20, 2, 21, 3, 22, 4, 23, 5, 24, 6, 7, 8, 25, 9, 26, 10, 27, 11, 28, 12, 29, 13, 14, 15, 30, 16, 31, 17, 32, 18, 19],
                    position: { start: 0, end: 59 },
                    isComplete: true,
                    metadata: {
                        type: 'lambda',
                        collectionElementId: 1,  // 'subtasks'
                        variableElementId: 3,    // 'x'
                        arrowElementId: 4,       // '->'
                        openBraceElementId: 5,   // '{'
                        closeBraceElementId: 19  // '}'
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('ANY OF subtasks IS x -> { ANY OF x:items IS y -> { y:text = \'test\' }}', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('ANY OF subtasks IS x -> { ANY OF x:items IS y -> { y:text = \'test\' }}');

        expect(result).toMatchObject({
            isValid: true,
            elements: [
                elem(1, 'ANY', ElementType.KEYWORD, 0, 2),
                elem(24, ' ', ElementType.WHITESPACE, 3, 3),
                elem(2, 'OF', ElementType.KEYWORD, 4, 5),
                elem(25, ' ', ElementType.WHITESPACE, 6, 6),
                elem(3, 'subtasks', ElementType.IDENTIFIER, 7, 14, true, undefined, {
                    type: 'normal_identifier'
                }),
                elem(26, ' ', ElementType.WHITESPACE, 15, 15),
                elem(4, 'IS', ElementType.KEYWORD, 16, 17),
                elem(27, ' ', ElementType.WHITESPACE, 18, 18),
                elem(5, 'x', ElementType.IDENTIFIER, 19, 19, true, undefined, {
                    type: 'lambda_variable',
                    role: 'definition'
                }),
                elem(28, ' ', ElementType.WHITESPACE, 20, 20),
                elem(6, '->', ElementType.LAMBDA_ARROW, 21, 22),
                elem(29, ' ', ElementType.WHITESPACE, 23, 23),
                elem(7, '{', ElementType.BRACKET_OPEN, 24, 24),
                elem(30, ' ', ElementType.WHITESPACE, 25, 25),
                elem(8, 'ANY', ElementType.KEYWORD, 26, 28),
                elem(31, ' ', ElementType.WHITESPACE, 29, 29),
                elem(9, 'OF', ElementType.KEYWORD, 30, 31),
                elem(32, ' ', ElementType.WHITESPACE, 32, 32),
                elem(10, 'x', ElementType.IDENTIFIER, 33, 33, true, undefined, {
                    type: 'lambda_variable',
                    role: 'reference'
                }),
                elem(11, ':', ElementType.SEPARATOR_COLON, 34, 34),
                elem(12, 'items', ElementType.IDENTIFIER, 35, 39, true, undefined, {
                    type: 'lambda_property_access',
                    lambdaVariableElementId: 10
                }),
                elem(33, ' ', ElementType.WHITESPACE, 40, 40),
                elem(13, 'IS', ElementType.KEYWORD, 41, 42),
                elem(34, ' ', ElementType.WHITESPACE, 43, 43),
                elem(14, 'y', ElementType.IDENTIFIER, 44, 44, true, undefined, {
                    type: 'lambda_variable',
                    role: 'definition'
                }),
                elem(35, ' ', ElementType.WHITESPACE, 45, 45),
                elem(15, '->', ElementType.LAMBDA_ARROW, 46, 47),
                elem(36, ' ', ElementType.WHITESPACE, 48, 48),
                elem(16, '{', ElementType.BRACKET_OPEN, 49, 49),
                elem(37, ' ', ElementType.WHITESPACE, 50, 50),
                elem(17, 'y', ElementType.IDENTIFIER, 51, 51, true, undefined, {
                    type: 'lambda_variable',
                    role: 'reference'
                }),
                elem(18, ':', ElementType.SEPARATOR_COLON, 52, 52),
                elem(19, 'text', ElementType.IDENTIFIER, 53, 56, true, undefined, {
                    type: 'lambda_property_access',
                    lambdaVariableElementId: 17
                }),
                elem(38, ' ', ElementType.WHITESPACE, 57, 57),
                elem(20, '=', ElementType.OPERATOR_COMPARISON, 58, 58),
                elem(39, ' ', ElementType.WHITESPACE, 59, 59),
                elem(21, '\'test\'', ElementType.LITERAL_TEXT, 60, 65),
                elem(40, ' ', ElementType.WHITESPACE, 66, 66),
                elem(22, '}', ElementType.BRACKET_CLOSE, 67, 67),
                elem(23, '}', ElementType.BRACKET_CLOSE, 68, 68)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [17, 18, 19, 38, 20, 39, 21],
                    position: { start: 51, end: 65 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 20,
                        elementsForLeftOperand: [17, 18, 19],
                        elementsForRightOperand: [21]
                    }
                },
                {
                    id: 2,
                    type: ContextType.LAMBDA,
                    elementIds: [8, 31, 9, 32, 10, 11, 12, 33, 13, 34, 14, 35, 15, 36, 16, 37, 17, 18, 19, 38, 20, 39, 21, 40, 22],
                    position: { start: 26, end: 67 },
                    isComplete: true,
                    metadata: {
                        type: 'lambda',
                        collectionElementId: 12, // 'items' after x:
                        variableElementId: 14,   // 'y'
                        arrowElementId: 15,      // '->'
                        openBraceElementId: 16,  // '{'
                        closeBraceElementId: 22  // '}'
                    }
                },
                {
                    id: 3,
                    type: ContextType.LAMBDA,
                    elementIds: [1, 24, 2, 25, 3, 26, 4, 27, 5, 28, 6, 29, 7, 30, 8, 31, 9, 32, 10, 11, 12, 33, 13, 34, 14, 35, 15, 36, 16, 37, 17, 18, 19, 38, 20, 39, 21, 40, 22, 23],
                    position: { start: 0, end: 68 },
                    isComplete: true,
                    metadata: {
                        type: 'lambda',
                        collectionElementId: 3,  // 'subtasks'
                        variableElementId: 5,    // 'x'
                        arrowElementId: 6,       // '->'
                        openBraceElementId: 7,   // '{'
                        closeBraceElementId: 23  // '}'
                    }
                }
            ],
            diagnostics: []
        });
    });

    it('missing variable - items IS -> { x > 5 }', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('items IS -> { x > 5 }');

        expect(result).toMatchObject({
            isValid: false,
            elements: [
                elem(1, 'items', ElementType.IDENTIFIER, 0, 4),
                elem(9, ' ', ElementType.WHITESPACE, 5, 5),
                elem(2, 'IS', ElementType.KEYWORD, 6, 7),
                elem(10, ' ', ElementType.WHITESPACE, 8, 8),
                elem(3, '->', ElementType.LAMBDA_ARROW, 9, 10),
                elem(11, ' ', ElementType.WHITESPACE, 11, 11),
                elem(4, '{', ElementType.BRACKET_OPEN, 12, 12),
                elem(12, ' ', ElementType.WHITESPACE, 13, 13),
                elem(5, 'x', ElementType.IDENTIFIER, 14, 14),
                elem(13, ' ', ElementType.WHITESPACE, 15, 15),
                elem(6, '>', ElementType.OPERATOR_COMPARISON, 16, 16),
                elem(14, ' ', ElementType.WHITESPACE, 17, 17),
                elem(7, '5', ElementType.LITERAL_NUMBER, 18, 18),
                elem(15, ' ', ElementType.WHITESPACE, 19, 19),
                elem(8, '}', ElementType.BRACKET_CLOSE, 20, 20)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [5, 13, 6, 14, 7],
                    position: { start: 14, end: 18 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 6,
                        elementsForLeftOperand: [5],
                        elementsForRightOperand: [7]
                    }
                }

            ],
            diagnostics: expect.arrayContaining([
                expect.objectContaining({
                    severity: 'error'
                })
            ])
        });
    });

    it('missing arrow - items IS x { x > 5 }', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('items IS x { x > 5 }');

        expect(result).toMatchObject({
            isValid: false,
            elements: [
                elem(1, 'items', ElementType.IDENTIFIER, 0, 4),
                elem(9, ' ', ElementType.WHITESPACE, 5, 5),
                elem(2, 'IS', ElementType.KEYWORD, 6, 7),
                elem(10, ' ', ElementType.WHITESPACE, 8, 8),
                elem(3, 'x', ElementType.IDENTIFIER, 9, 9),
                elem(11, ' ', ElementType.WHITESPACE, 10, 10),
                elem(4, '{', ElementType.BRACKET_OPEN, 11, 11),
                elem(12, ' ', ElementType.WHITESPACE, 12, 12),
                elem(5, 'x', ElementType.IDENTIFIER, 13, 13),
                elem(13, ' ', ElementType.WHITESPACE, 14, 14),
                elem(6, '>', ElementType.OPERATOR_COMPARISON, 15, 15),
                elem(14, ' ', ElementType.WHITESPACE, 16, 16),
                elem(7, '5', ElementType.LITERAL_NUMBER, 17, 17),
                elem(15, ' ', ElementType.WHITESPACE, 18, 18),
                elem(8, '}', ElementType.BRACKET_CLOSE, 19, 19)
            ],
            contexts: [
                {
                    id: 1,
                    type: ContextType.COMPARISON,
                    elementIds: [5, 13, 6, 14, 7],
                    position: { start: 13, end: 17 },
                    isComplete: true,
                    metadata: {
                        type: 'comparison',
                        operatorId: 6,
                        elementsForLeftOperand: [5],
                        elementsForRightOperand: [7]
                    }
                }
            ],
            diagnostics: [
                {
                    code: DiagnosticCode.UNEXPECTED_TOKEN,
                    message: "Parser error: missing '->' at '{'",
                    position: { start: 11, end: 11 },
                    severity: 'error'
                }
            ]
        });
    });

    it('items x -> { x > 5 }', () => {
        const visitor = new ConditionExpressionElementsVisitor();
        const result = visitor.parse('items x -> { x > 5 }');

        expect(result).toMatchObject({
            isValid: false,
            elements: [
                elem(1, 'items', ElementType.IDENTIFIER, 0, 4),
                elem(9, ' ', ElementType.WHITESPACE, 5, 5),
                elem(2, 'x', ElementType.IDENTIFIER, 6, 6),
                elem(10, ' ', ElementType.WHITESPACE, 7, 7),
                elem(3, '->', ElementType.LAMBDA_ARROW, 8, 9),
                elem(11, ' ', ElementType.WHITESPACE, 10, 10),
                elem(4, '{', ElementType.BRACKET_OPEN, 11, 11),
                elem(12, ' ', ElementType.WHITESPACE, 12, 12),
                elem(5, 'x', ElementType.IDENTIFIER, 13, 13),
                elem(13, ' ', ElementType.WHITESPACE, 14, 14),
                elem(6, '>', ElementType.OPERATOR_COMPARISON, 15, 15),
                elem(14, ' ', ElementType.WHITESPACE, 16, 16),
                elem(7, '5', ElementType.LITERAL_NUMBER, 17, 17),
                elem(15, ' ', ElementType.WHITESPACE, 18, 18),
                elem(8, '}', ElementType.BRACKET_CLOSE, 19, 19)
            ],
            contexts: [],
            diagnostics: [
                {
                    code: DiagnosticCode.UNEXPECTED_TOKEN,
                    message: "Parser error: no viable alternative at input 'itemsx'",
                    position: { start: 6, end: 6 },
                    severity: 'error'
                }
            ]
        });
    });
});


describe('ConditionExpressionElementsVisitor - Invalid Expressions', () => {
    function elem(
        id: number,
        value: string,
        type: ElementType,
        start: number,
        end: number,
        isValid: boolean = true,
        errorMessage?: string
    ): any {
        const element: any = {
            id,
            type,
            value,
            position: { start, end },
            isValid
        };
        if (errorMessage) {
            element.errorMessage = errorMessage;
        }
        return expect.objectContaining(element);
    }

    describe('Incomplete comparisons', () => {
        it('a >', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('a >');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, 'a', ElementType.IDENTIFIER, 0, 0),
                    elem(3, ' ', ElementType.WHITESPACE, 1, 1),
                    elem(2, '>', ElementType.OPERATOR_COMPARISON, 2, 2)
                ],
                contexts: [
                    {
                        id: 1,
                        type: ContextType.COMPARISON,
                        elementIds: [1, 3, 2],
                        position: { start: 0, end: 2 },
                        isComplete: false,
                        metadata: {
                            type: 'comparison',
                            operatorId: 2,
                            elementsForLeftOperand: [1],
                            elementsForRightOperand: []
                        }
                    }
                ],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        code: DiagnosticCode.UNEXPECTED_TOKEN,
                        severity: 'error'
                    })
                ])
            });
        });

        it('< 5', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('< 5');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, '<', ElementType.OPERATOR_COMPARISON, 0, 0),
                    elem(3, ' ', ElementType.WHITESPACE, 1, 1),
                    elem(2, '5', ElementType.LITERAL_NUMBER, 2, 2)
                ],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        code: DiagnosticCode.UNEXPECTED_TOKEN,
                        severity: 'error'
                    })
                ])
            });
        });
    });

    describe('Incomplete logical expressions', () => {
        it('a = b AND', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('a = b AND');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, 'a', ElementType.IDENTIFIER, 0, 0),
                    elem(5, ' ', ElementType.WHITESPACE, 1, 1),
                    elem(2, '=', ElementType.OPERATOR_COMPARISON, 2, 2),
                    elem(6, ' ', ElementType.WHITESPACE, 3, 3),
                    elem(3, 'b', ElementType.IDENTIFIER, 4, 4),
                    elem(7, ' ', ElementType.WHITESPACE, 5, 5),
                    elem(4, 'AND', ElementType.OPERATOR_LOGICAL, 6, 8)
                ],
                contexts: [
                    {
                        id: 1,
                        type: ContextType.COMPARISON,
                        elementIds: [1, 5, 2, 6, 3],
                        position: { start: 0, end: 4 },
                        isComplete: true,
                        metadata: {
                            type: 'comparison',
                            operatorId: 2,
                            elementsForLeftOperand: [1],
                            elementsForRightOperand: [3]
                        }
                    },
                    {
                        id: 2,
                        type: ContextType.BINARY,
                        elementIds: [1, 5, 2, 6, 3, 7, 4],
                        position: { start: 0, end: 8 },
                        isComplete: false,
                        metadata: {
                            type: 'binary',
                            operatorId: 4,
                            elementsForLeftExpression: [1, 2, 3],
                            elementsForRightExpression: []
                        }
                    }
                ],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        severity: 'error'
                    })
                ])
            });
        });

        it('OR a = b', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('OR a = b');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, 'OR', ElementType.OPERATOR_LOGICAL, 0, 1),
                    elem(5, ' ', ElementType.WHITESPACE, 2, 2),
                    elem(2, 'a', ElementType.IDENTIFIER, 3, 3),
                    elem(6, ' ', ElementType.WHITESPACE, 4, 4),
                    elem(3, '=', ElementType.OPERATOR_COMPARISON, 5, 5),
                    elem(7, ' ', ElementType.WHITESPACE, 6, 6),
                    elem(4, 'b', ElementType.IDENTIFIER, 7, 7)
                ],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        severity: 'error'
                    })
                ])
            });
        });
    });

    describe('Unclosed brackets', () => {
        it('(a > 5', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('(a > 5');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, '(', ElementType.BRACKET_OPEN, 0, 0),
                    elem(2, 'a', ElementType.IDENTIFIER, 1, 1),
                    elem(5, ' ', ElementType.WHITESPACE, 2, 2),
                    elem(3, '>', ElementType.OPERATOR_COMPARISON, 3, 3),
                    elem(6, ' ', ElementType.WHITESPACE, 4, 4),
                    elem(4, '5', ElementType.LITERAL_NUMBER, 5, 5)
                ],
                contexts: [
                    {
                        id: 1,
                        type: ContextType.COMPARISON,
                        elementIds: [2, 5, 3, 6, 4],
                        position: { start: 1, end: 5 },
                        isComplete: true,
                        metadata: {
                            type: 'comparison',
                            operatorId: 3,
                            elementsForLeftOperand: [2],
                            elementsForRightOperand: [4]
                        }
                    },
                    {
                        id: 2,
                        type: ContextType.GROUP,
                        elementIds: [1, 2, 5, 3, 6, 4],
                        position: { start: 0, end: 5 },
                        isComplete: false,
                        metadata: {
                            type: 'group',
                            openBracketId: 1,
                            closeBracketId: undefined
                        }
                    }
                ],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        code: DiagnosticCode.MISSING_CLOSING_BRACKET,
                        severity: 'error'
                    })
                ])
            });
        });

    });

    describe('Unfinished strings', () => {
        it('\'hello', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('\'hello');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, '\'hello', ElementType.INCOMPLETE, 0, 5, false, 'Unfinished string literal: \'hello')
                ],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        code: DiagnosticCode.UNFINISHED_STRING,
                        message: 'Unfinished string literal: \'hello'
                    })
                ])
            });
        });

        it('a = \'test', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('a = \'test');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, 'a', ElementType.IDENTIFIER, 0, 0),
                    elem(4, ' ', ElementType.WHITESPACE, 1, 1),
                    elem(2, '=', ElementType.OPERATOR_COMPARISON, 2, 2),
                    elem(5, ' ', ElementType.WHITESPACE, 3, 3),
                    elem(3, '\'test', ElementType.INCOMPLETE, 4, 8, false, 'Unfinished string literal: \'test')
                ],
                contexts: [
                    {
                        id: 1,
                        type: ContextType.COMPARISON,
                        elementIds: [1, 4, 2, 5, 3],
                        position: { start: 0, end: 8 },
                        isComplete: true,
                        metadata: {
                            type: 'comparison',
                            operatorId: 2,
                            elementsForLeftOperand: [1],
                            elementsForRightOperand: [3]
                        }
                    }
                ],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        code: DiagnosticCode.UNFINISHED_STRING,
                        severity: 'error'
                    })
                ])
            });
        });
    });

    describe('Incomplete keywords', () => {
        it('field IS', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('field IS');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, 'field', ElementType.IDENTIFIER, 0, 4),
                    elem(3, ' ', ElementType.WHITESPACE, 5, 5),
                    elem(2, 'IS', ElementType.KEYWORD, 6, 7)
                ],
                contexts: [],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        severity: 'error'
                    })
                ])
            });
        });
    });

    describe('Special characters', () => {
        it('#@$%', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('#@$%');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, '#', ElementType.ERROR, 0, 0, false, 'Unexpected character: #'),
                    elem(2, '@', ElementType.ERROR, 1, 1, false, 'Unexpected character: @'),
                    elem(3, '$', ElementType.ERROR, 2, 2, false, 'Unexpected character: $'),
                    elem(4, '%', ElementType.ERROR, 3, 3, false, 'Unexpected character: %')
                ],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        code: DiagnosticCode.UNEXPECTED_TOKEN,
                        severity: 'error'
                    })
                ])
            });
        });
    });

    describe('Duplicate operators', () => {
        it('a + + b > 5', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('a + + b > 5');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, 'a', ElementType.IDENTIFIER, 0, 0),
                    elem(7, ' ', ElementType.WHITESPACE, 1, 1),
                    elem(2, '+', ElementType.OPERATOR_MATH, 2, 2),
                    elem(8, ' ', ElementType.WHITESPACE, 3, 3),
                    elem(3, '+', ElementType.OPERATOR_MATH, 4, 4),
                    elem(9, ' ', ElementType.WHITESPACE, 5, 5),
                    elem(4, 'b', ElementType.IDENTIFIER, 6, 6),
                    elem(10, ' ', ElementType.WHITESPACE, 7, 7),
                    elem(5, '>', ElementType.OPERATOR_COMPARISON, 8, 8),
                    elem(11, ' ', ElementType.WHITESPACE, 9, 9),
                    elem(6, '5', ElementType.LITERAL_NUMBER, 10, 10)
                ],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        severity: 'error'
                    })
                ])
            });
        });
    });

    describe('Standalone values that are not boolean expressions', () => {
        it('123', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('123');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, '123', ElementType.LITERAL_NUMBER, 0, 2)
                ],
                contexts: [],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        severity: 'error'
                    })
                ])
            });
        });

        it('\'hello\'', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('\'hello\'');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, '\'hello\'', ElementType.LITERAL_TEXT, 0, 6)
                ],
                contexts: [],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        severity: 'error'
                    })
                ])
            });
        });

        it('identifier', () => {
            const visitor = new ConditionExpressionElementsVisitor();
            const result = visitor.parse('identifier');

            expect(result).toMatchObject({
                isValid: false,
                elements: [
                    elem(1, 'identifier', ElementType.IDENTIFIER, 0, 9)
                ],
                contexts: [],
                diagnostics: expect.arrayContaining([
                    expect.objectContaining({
                        severity: 'error'
                    })
                ])
            });
        });
    });

});