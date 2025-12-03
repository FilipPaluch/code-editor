import { MappingExpressionElementsVisitor, MappingContextType, MappingDiagnosticCode, MappingElementType } from './mapping-expression-elements-visitor';
import { describe, it, expect } from 'vitest';

describe('MappingExpressionElementsVisitor', () => {
    function elem(
        id: number,
        value: string,
        type: MappingElementType,
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

    describe('Basic assignments', () => {
        it('process.form.field := \'value\'', () => {
            const visitor = new MappingExpressionElementsVisitor();
            const result = visitor.parse('process.form.field := \'value\'');

            expect(result).toMatchObject({
                isValid: true,
                elements: [
                    elem(1, 'process.form.field', MappingElementType.IDENTIFIER, 0, 17, true, undefined, { type: 'output_field' }),
                    elem(4, ' ', MappingElementType.WHITESPACE, 18, 18),
                    elem(2, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 19, 20),
                    elem(5, ' ', MappingElementType.WHITESPACE, 21, 21),
                    elem(3, '\'value\'', MappingElementType.LITERAL_TEXT, 22, 28)
                ],
                contexts: [
                    {
                        id: 1,
                        type: MappingContextType.ASSIGNMENT,
                        elementIds: [1, 4, 2, 5, 3],
                        position: { start: 0, end: 28 },
                        isComplete: true,
                        metadata: {
                            type: 'assignment',
                            operatorId: 2,
                            outputElementId: 1,
                            inputElementIds: [3]
                        }
                    }
                ],
                diagnostics: []
            });
        });

        it('process.form.field := task.form.field', () => {
            const visitor = new MappingExpressionElementsVisitor();
            const result = visitor.parse('process.form.field := task.form.field');

            expect(result).toMatchObject({
                isValid: true,
                elements: [
                    elem(1, 'process.form.field', MappingElementType.IDENTIFIER, 0, 17, true, undefined, { type: 'output_field' }),
                    elem(4, ' ', MappingElementType.WHITESPACE, 18, 18),
                    elem(2, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 19, 20),
                    elem(5, ' ', MappingElementType.WHITESPACE, 21, 21),
                    elem(3, 'task.form.field', MappingElementType.IDENTIFIER, 22, 36, true, undefined, { type: 'input_field' })
                ],
                contexts: [
                    {
                        id: 1,
                        type: MappingContextType.ASSIGNMENT,
                        elementIds: [1, 4, 2, 5, 3],
                        position: { start: 0, end: 36 },
                        isComplete: true,
                        metadata: {
                            type: 'assignment',
                            operatorId: 2,
                            outputElementId: 1,
                            inputElementIds: [3]
                        }
                    }
                ],
                diagnostics: []
            });
        });

        it('process.form.field := 123.45', () => {
            const visitor = new MappingExpressionElementsVisitor();
            const result = visitor.parse('process.form.field := 123.45');

            expect(result).toMatchObject({
                isValid: true,
                elements: [
                    elem(1, 'process.form.field', MappingElementType.IDENTIFIER, 0, 17),
                    elem(4, ' ', MappingElementType.WHITESPACE, 18, 18),
                    elem(2, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 19, 20),
                    elem(5, ' ', MappingElementType.WHITESPACE, 21, 21),
                    elem(3, '123.45', MappingElementType.LITERAL_NUMBER, 22, 27)
                ],
                contexts: [
                    {
                        id: 1,
                        type: MappingContextType.ASSIGNMENT,
                        elementIds: [1, 4, 2, 5, 3],
                        position: { start: 0, end: 27 },
                        isComplete: true,
                        metadata: {
                            type: 'assignment',
                            operatorId: 2,
                            outputElementId: 1,
                            inputElementIds: [3]
                        }
                    }
                ],
                diagnostics: []
            });
        });
    });

    describe('Mathematical expressions', () => {
        it('process.field := 2 + 3 * 4', () => {
            const visitor = new MappingExpressionElementsVisitor();
            const result = visitor.parse('process.field := 2 + 3 * 4');

            expect(result).toMatchObject({
                isValid: true,
                elements: [
                    elem(1, 'process.field', MappingElementType.IDENTIFIER, 0, 12),
                    elem(8, ' ', MappingElementType.WHITESPACE, 13, 13),
                    elem(2, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 14, 15),
                    elem(9, ' ', MappingElementType.WHITESPACE, 16, 16),
                    elem(3, '2', MappingElementType.LITERAL_NUMBER, 17, 17),
                    elem(10, ' ', MappingElementType.WHITESPACE, 18, 18),
                    elem(4, '+', MappingElementType.OPERATOR_MATH, 19, 19),
                    elem(11, ' ', MappingElementType.WHITESPACE, 20, 20),
                    elem(5, '3', MappingElementType.LITERAL_NUMBER, 21, 21),
                    elem(12, ' ', MappingElementType.WHITESPACE, 22, 22),
                    elem(6, '*', MappingElementType.OPERATOR_MATH, 23, 23),
                    elem(13, ' ', MappingElementType.WHITESPACE, 24, 24),
                    elem(7, '4', MappingElementType.LITERAL_NUMBER, 25, 25)
                ],
                contexts: [
                    {
                        id: 1,
                        type: MappingContextType.ASSIGNMENT,
                        elementIds: [1, 8, 2, 9, 3, 10, 4, 11, 5, 12, 6, 13, 7],
                        position: { start: 0, end: 25 },
                        isComplete: true,
                        metadata: {
                            type: 'assignment',
                            operatorId: 2,
                            outputElementId: 1,
                            inputElementIds: [3, 4, 5, 6, 7]
                        }
                    }
                ],
                diagnostics: []
            });
        });

        it('process.field := (a + b) * c', () => {
            const visitor = new MappingExpressionElementsVisitor();
            const result = visitor.parse('process.field := (a + b) * c');

            expect(result).toMatchObject({
                isValid: true,
                elements: [
                    elem(1, 'process.field', MappingElementType.IDENTIFIER, 0, 12),
                    elem(10, ' ', MappingElementType.WHITESPACE, 13, 13),
                    elem(2, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 14, 15),
                    elem(11, ' ', MappingElementType.WHITESPACE, 16, 16),
                    elem(3, '(', MappingElementType.BRACKET_OPEN, 17, 17),
                    elem(4, 'a', MappingElementType.IDENTIFIER, 18, 18),
                    elem(12, ' ', MappingElementType.WHITESPACE, 19, 19),
                    elem(5, '+', MappingElementType.OPERATOR_MATH, 20, 20),
                    elem(13, ' ', MappingElementType.WHITESPACE, 21, 21),
                    elem(6, 'b', MappingElementType.IDENTIFIER, 22, 22),
                    elem(7, ')', MappingElementType.BRACKET_CLOSE, 23, 23),
                    elem(14, ' ', MappingElementType.WHITESPACE, 24, 24),
                    elem(8, '*', MappingElementType.OPERATOR_MATH, 25, 25),
                    elem(15, ' ', MappingElementType.WHITESPACE, 26, 26),
                    elem(9, 'c', MappingElementType.IDENTIFIER, 27, 27)
                ],
                contexts: [
                    {
                        id: 1,
                        type: MappingContextType.ASSIGNMENT,
                        elementIds: [1, 10, 2, 11, 3, 4, 12, 5, 13, 6, 7, 14, 8, 15, 9],
                        position: { start: 0, end: 27 },
                        isComplete: true,
                        metadata: {
                            type: 'assignment',
                            operatorId: 2,
                            outputElementId: 1,
                            inputElementIds: [3, 4, 5, 6, 7, 8, 9]
                        }
                    }
                ],
                diagnostics: []
            });
        });
    });

    describe('Null coalescing', () => {
        it('process.field := field1 ?? field2', () => {
            const visitor = new MappingExpressionElementsVisitor();
            const result = visitor.parse('process.field := field1 ?? field2');

            expect(result).toMatchObject({
                isValid: true,
                elements: [
                    elem(1, 'process.field', MappingElementType.IDENTIFIER, 0, 12, true, undefined, { type: 'output_field' }),
                    elem(6, ' ', MappingElementType.WHITESPACE, 13, 13),
                    elem(2, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 14, 15),
                    elem(7, ' ', MappingElementType.WHITESPACE, 16, 16),
                    elem(3, 'field1', MappingElementType.IDENTIFIER, 17, 22, true, undefined, { type: 'input_field' }),
                    elem(8, ' ', MappingElementType.WHITESPACE, 23, 23),
                    elem(4, '??', MappingElementType.OPERATOR_NULL_COALESCING, 24, 25),
                    elem(9, ' ', MappingElementType.WHITESPACE, 26, 26),
                    elem(5, 'field2', MappingElementType.IDENTIFIER, 27, 32, true, undefined, { type: 'input_field' })
                ],
                contexts: [
                    {
                        id: 1,
                        type: MappingContextType.NULL_COALESCING,
                        elementIds: [3, 8, 4, 9, 5],
                        position: { start: 17, end: 32 },
                        isComplete: true,
                        metadata: {
                            type: 'null_coalescing',
                            operatorId: 4,
                            leftElementIds: [3],
                            rightElementIds: [5]
                        }
                    },
                    {
                        id: 2,
                        type: MappingContextType.ASSIGNMENT,
                        elementIds: [1, 6, 2, 7, 3, 8, 4, 9, 5],
                        position: { start: 0, end: 32 },
                        isComplete: true,
                        metadata: {
                            type: 'assignment',
                            operatorId: 2,
                            outputElementId: 1,
                            inputElementIds: [3, 4, 5]
                        }
                    }
                ],
                diagnostics: []
            });
        });

        it('process.field := field1 ?? field2 ?? field3', () => {
            const visitor = new MappingExpressionElementsVisitor();
            const result = visitor.parse('process.field := field1 ?? field2 ?? field3');

            expect(result).toMatchObject({
                isValid: true,
                elements: [
                    elem(1, 'process.field', MappingElementType.IDENTIFIER, 0, 12, true, undefined, { type: 'output_field' }),
                    elem(8, ' ', MappingElementType.WHITESPACE, 13, 13),
                    elem(2, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 14, 15),
                    elem(9, ' ', MappingElementType.WHITESPACE, 16, 16),
                    elem(3, 'field1', MappingElementType.IDENTIFIER, 17, 22, true, undefined, { type: 'input_field' }),
                    elem(10, ' ', MappingElementType.WHITESPACE, 23, 23),
                    elem(4, '??', MappingElementType.OPERATOR_NULL_COALESCING, 24, 25),
                    elem(11, ' ', MappingElementType.WHITESPACE, 26, 26),
                    elem(5, 'field2', MappingElementType.IDENTIFIER, 27, 32, true, undefined, { type: 'input_field' }),
                    elem(12, ' ', MappingElementType.WHITESPACE, 33, 33),
                    elem(6, '??', MappingElementType.OPERATOR_NULL_COALESCING, 34, 35),
                    elem(13, ' ', MappingElementType.WHITESPACE, 36, 36),
                    elem(7, 'field3', MappingElementType.IDENTIFIER, 37, 42, true, undefined, { type: 'input_field' })
                ],
                contexts: [
                    {
                        id: 1,
                        type: MappingContextType.NULL_COALESCING,
                        elementIds: [3, 10, 4, 11, 5],
                        position: { start: 17, end: 32 },
                        isComplete: true,
                        metadata: {
                            type: 'null_coalescing',
                            operatorId: 4,
                            leftElementIds: [3],
                            rightElementIds: [5]
                        }
                    },
                    {
                        id: 2,
                        type: MappingContextType.NULL_COALESCING,
                        elementIds: [3, 10, 4, 11, 5, 12, 6, 13, 7],
                        position: { start: 17, end: 42 },
                        isComplete: true,
                        metadata: {
                            type: 'null_coalescing',
                            operatorId: 6,
                            leftElementIds: [3, 4, 5],
                            rightElementIds: [7]
                        }
                    },
                    {
                        id: 3,
                        type: MappingContextType.ASSIGNMENT,
                        elementIds: [1, 8, 2, 9, 3, 10, 4, 11, 5, 12, 6, 13, 7],
                        position: { start: 0, end: 42 },
                        isComplete: true,
                        metadata: {
                            type: 'assignment',
                            operatorId: 2,
                            outputElementId: 1,
                            inputElementIds: [3, 4, 5, 6, 7]
                        }
                    }
                ],
                diagnostics: []
            });
        });
    });

    describe('Multiple mappings', () => {
        it('field1 := \'value1\'; field2 := \'value2\'', () => {
            const visitor = new MappingExpressionElementsVisitor();
            const result = visitor.parse('field1 := \'value1\'; field2 := \'value2\'');

            expect(result).toMatchObject({
                isValid: true,
                elements: [
                    elem(1, 'field1', MappingElementType.IDENTIFIER, 0, 5, true, undefined, { type: 'output_field' }),
                    elem(8, ' ', MappingElementType.WHITESPACE, 6, 6),
                    elem(2, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 7, 8),
                    elem(9, ' ', MappingElementType.WHITESPACE, 9, 9),
                    elem(3, '\'value1\'', MappingElementType.LITERAL_TEXT, 10, 17),
                    elem(4, ';', MappingElementType.SEPARATOR_END, 18, 18),
                    elem(10, ' ', MappingElementType.WHITESPACE, 19, 19),
                    elem(5, 'field2', MappingElementType.IDENTIFIER, 20, 25, true, undefined, { type: 'output_field' }),
                    elem(11, ' ', MappingElementType.WHITESPACE, 26, 26),
                    elem(6, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 27, 28),
                    elem(12, ' ', MappingElementType.WHITESPACE, 29, 29),
                    elem(7, '\'value2\'', MappingElementType.LITERAL_TEXT, 30, 37)
                ],
                contexts: [
                    {
                        id: 1,
                        type: MappingContextType.ASSIGNMENT,
                        elementIds: [1, 8, 2, 9, 3],
                        position: { start: 0, end: 17 },
                        isComplete: true,
                        metadata: {
                            type: 'assignment',
                            operatorId: 2,
                            outputElementId: 1,
                            inputElementIds: [3]
                        }
                    },
                    {
                        id: 2,
                        type: MappingContextType.ASSIGNMENT,
                        elementIds: [5, 11, 6, 12, 7],
                        position: { start: 20, end: 37 },
                        isComplete: true,
                        metadata: {
                            type: 'assignment',
                            operatorId: 6,
                            outputElementId: 5,
                            inputElementIds: [7]
                        }
                    }
                ],
                diagnostics: []
            });
        });
    });

    describe('Invalid expressions', () => {
        describe('Incomplete assignments', () => {
            it('incomplete basic assignment: field := ', () => {
                const visitor = new MappingExpressionElementsVisitor();
                const result = visitor.parse('field := ');

                expect(result).toMatchObject({
                    isValid: false,
                    elements: [
                        elem(1, 'field', MappingElementType.IDENTIFIER, 0, 4, true, undefined, { type: 'output_field' }),
                        elem(3, ' ', MappingElementType.WHITESPACE, 5, 5),
                        elem(2, ':=', MappingElementType.OPERATOR_ASSIGNMENT, 6, 7),
                        elem(4, ' ', MappingElementType.WHITESPACE, 8, 8)
                    ],
                    contexts: [
                        {
                            id: 1,
                            type: MappingContextType.ASSIGNMENT,
                            elementIds: [1, 3, 2, 4],
                            position: { start: 0, end: 8 },
                            isComplete: false,
                            metadata: {
                                type: 'assignment',
                                operatorId: 2,
                                outputElementId: 1,
                                inputElementIds: []
                            }
                        }
                    ],
                    diagnostics: [
                        {
                            code: MappingDiagnosticCode.UNEXPECTED_TOKEN,
                            "message": "Parser error: mismatched input '<EOF>' expecting {NULL, FORMAT, LENGTH, COUNT, BOOL, '-', '(', '[', DECIMAL, TEXT, IDENTIFIER}",
                            position: { start: 9, end: 8 },
                            severity: 'error'
                        }
                    ]
                });
            });

            it('incomplete conditional assignment: field  ', () => {
                const visitor = new MappingExpressionElementsVisitor();
                const result = visitor.parse('field :?= ');

                expect(result).toMatchObject({
                    isValid: false,
                    elements: [
                        elem(1, 'field', MappingElementType.IDENTIFIER, 0, 4, true, undefined, { type: 'output_field' }),
                        elem(3, ' ', MappingElementType.WHITESPACE, 5, 5),
                        elem(2, ':?=', MappingElementType.OPERATOR_ASSIGNMENT, 6, 8),
                        elem(4, ' ', MappingElementType.WHITESPACE, 9, 9)
                    ],
                    contexts: [
                        {
                            id: 1,
                            type: MappingContextType.CONDITIONAL_ASSIGNMENT,
                            elementIds: [1, 3, 2, 4],
                            position: { start: 0, end: 9 },
                            isComplete: false,
                            metadata: {
                                type: 'conditional_assignment',
                                operatorId: 2,
                                outputElementId: 1,
                                inputElementIds: []
                            }
                        }
                    ],
                    diagnostics: [
                        {
                            code: MappingDiagnosticCode.UNEXPECTED_TOKEN,
                            message: 'Parser error: missing IDENTIFIER at \'<EOF>\'',
                            position: { start: 10, end: 9 },
                            severity: 'error'
                        }
                    ]
                });
            });

        });

    });
});