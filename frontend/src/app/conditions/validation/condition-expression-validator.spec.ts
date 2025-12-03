import { describe, it, expect } from 'vitest';
import { ConditionExpressionValidator } from './condition-expression-validator';
import { TEST_EXPRESSION_FIELDS } from '../test-data/condition-test-expression-fields';

function parseExpressionWithCursor(expressionWithCursor: string): { expression: string; cursorPosition: number } {
    const cursorIndex = expressionWithCursor.indexOf('|');
    if (cursorIndex === -1) {
        throw new Error('Expression must contain | to indicate cursor position');
    }

    const expression = expressionWithCursor.replace('|', '');
    return { expression, cursorPosition: cursorIndex };
}

describe('ConditionExpressionValidator', () => {
    let validator: ConditionExpressionValidator;

    beforeEach(() => {
        validator = new ConditionExpressionValidator(TEST_EXPRESSION_FIELDS);
    });

    describe('Validation Errors', () => {
        it('should validate non-existent field', () => {
            const { expression } = parseExpressionWithCursor('task.nonexistent = |');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'field_not_exists',
                        message: 'Field "task.nonexistent" does not exist',
                        identifier: {
                            value: 'task.nonexistent',
                            range: { start: 0, end: 15 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate non-existent container', () => {
            const { expression } = parseExpressionWithCursor('badcontainer.field = |');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'field_not_exists',
                        message: 'Field "badcontainer.field" does not exist',
                        identifier: {
                            value: 'badcontainer.field',
                            range: { start: 0, end: 17 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate lambda variable not available', () => {
            const { expression } = parseExpressionWithCursor('y:field = |');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'lambda_variable_not_available',
                        message: 'Lambda variable "y" is not available in this scope',
                        lambdaVariable: {
                            value: 'y',
                            range: { start: 0, end: 0 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate property not in collection', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:badprop = | }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'property_not_in_collection',
                        message: 'Property "badprop" is not available in collection "task.subtasks"',
                        lambdaVariable: {
                            value: 'x',
                            range: { start: 31, end: 31 }
                        },
                        property: {
                            value: 'badprop',
                            range: { start: 33, end: 39 }
                        },
                        collection: {
                            value: 'task.subtasks',
                            range: { start: 7, end: 19 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate nested property not in collection', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:assignee.badfield = | }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'property_not_in_collection',
                        message: 'Property "assignee.badfield" is not available in collection "task.subtasks"',
                        lambdaVariable: {
                            value: 'x',
                            range: { start: 31, end: 31 }
                        },
                        property: {
                            value: 'assignee.badfield',
                            range: { start: 33, end: 49 }
                        },
                        collection: {
                            value: 'task.subtasks',
                            range: { start: 7, end: 19 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate invalid dropdown value', () => {
            const { expression } = parseExpressionWithCursor('task.status = \'invalid-value\'|');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([
                {
                    type: 'dropdown_invalid_value',
                    message: 'Invalid dropdown value "invalid-value" for field "task.status"',
                    identifier: {
                        value: 'task.status',
                        range: { start: 0, end: 10 }
                    },
                    invalidValue: {
                        value: 'invalid-value',
                        range: { start: 14, end: 28 }
                    }
                }
            ]);

            expect(result.annotations).toEqual([]);
        });

        it('should validate collection not iterable', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.title IS x -> { | }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'collection_not_iterable',
                        message: 'Field "task.title" is not a collection and cannot be iterated',
                        identifier: {
                            value: 'task.title',
                            range: { start: 7, end: 16 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate nested property path error', () => {
            const { expression } = parseExpressionWithCursor('task.details.nonexistent = |');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'field_not_exists',
                        message: 'Field "task.details.nonexistent" does not exist',
                        identifier: {
                            value: 'task.details.nonexistent',
                            range: { start: 0, end: 23 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate lambda property with wrong collection', () => {
            const { expression } = parseExpressionWithCursor('ANY OF project.members IS user -> { user:badfield = | }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'property_not_in_collection',
                        message: 'Property "badfield" is not available in collection "project.members"',
                        lambdaVariable: {
                            value: 'user',
                            range: { start: 36, end: 39 }
                        },
                        property: {
                            value: 'badfield',
                            range: { start: 41, end: 48 }
                        },
                        collection: {
                            value: 'project.members',
                            range: { start: 7, end: 21 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate lambda dropdown with invalid value', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:status = \'invalid-status\'| }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([
                {
                    type: 'dropdown_invalid_value',
                    message: 'Invalid dropdown value "invalid-status" for field "status"',
                    identifier: {
                        value: 'status',
                        range: { start: 33, end: 38 }
                    },
                    invalidValue: {
                        value: 'invalid-status',
                        range: { start: 42, end: 57 }
                    }
                }
            ]);

            expect(result.annotations).toEqual([]);
        });

        it('should validate multiple lambda variables - wrong variable', () => {
            const { expression } = parseExpressionWithCursor('ANY OF project.members IS user -> { ANY OF task.subtasks IS subtask -> { user:badfield = | } }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'property_not_in_collection',
                        message: 'Property "badfield" is not available in collection "project.members"',
                        lambdaVariable: {
                            value: 'user',
                            range: { start: 73, end: 76 }
                        },
                        property: {
                            value: 'badfield',
                            range: { start: 78, end: 85 }
                        },
                        collection: {
                            value: 'project.members',
                            range: { start: 7, end: 21 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate multiple errors in one expression', () => {
            const { expression } = parseExpressionWithCursor('badcontainer.field = \'invalid\' AND task.nonexistent > 5 |');
            const result = validator.validate(expression);

            expect(result.errors).toHaveLength(2);

            expect(result.errors[0]).toEqual({
                type: 'field_not_exists',
                message: 'Field "badcontainer.field" does not exist',
                identifier: {
                    value: 'badcontainer.field',
                    range: { start: 0, end: 17 }
                }
            });

            expect(result.errors[1]).toEqual({
                type: 'field_not_exists',
                message: 'Field "task.nonexistent" does not exist',
                identifier: {
                    value: 'task.nonexistent',
                    range: { start: 35, end: 50 }
                }
            });

            expect(result.annotations).toEqual([]);
        });

        it('should validate lambda variable in nested lambda context', () => {
            const { expression } = parseExpressionWithCursor('ANY OF project.members IS user -> { ANY OF task.subtasks IS subtask -> { z:field = | } }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'lambda_variable_not_available',
                        message: 'Lambda variable "z" is not available in this scope',
                        lambdaVariable: {
                            value: 'z',
                            range: { start: 73, end: 73 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate collection not iterable - field used in ANY OF', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.title IS x -> { | }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: 'parsing_error'
                    }),
                    {
                        type: 'collection_not_iterable',
                        message: 'Field "task.title" is not a collection and cannot be iterated',
                        identifier: {
                            value: 'task.title',
                            range: { start: 7, end: 16 }
                        }
                    }
                ])
            );

            expect(result.annotations).toEqual([]);
        });

        it('should validate dropdown with value on left side', () => {
            const { expression } = parseExpressionWithCursor('\'status-active-guid\' = task.status |');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([]);

            expect(result.annotations).toEqual([
                {
                    type: 'dropdown_option',
                    position: { start: 0, end: 19 },
                    fieldPath: 'task.status',
                    guid: 'status-active-guid',
                    displayValue: 'Active'
                }
            ]);
        });

        it('should validate dropdown with invalid value on left side', () => {
            const { expression } = parseExpressionWithCursor('\'invalid-status-guid\' = task.status |');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([
                {
                    type: 'dropdown_invalid_value',
                    message: 'Invalid dropdown value "invalid-status-guid" for field "task.status"',
                    identifier: {
                        value: 'task.status',
                        range: { start: 24, end: 34 }
                    },
                    invalidValue: {
                        value: 'invalid-status-guid',
                        range: { start: 0, end: 20 }
                    }
                }
            ]);

            expect(result.annotations).toEqual([]);
        });

        it('should validate lambda dropdown with value on left side', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { \'subtask-done-guid\' = x:status }|');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([]);

            expect(result.annotations).toEqual([
                {
                    type: 'dropdown_option',
                    position: { start: 31, end: 49 },
                    fieldPath: 'status',
                    guid: 'subtask-done-guid',
                    displayValue: 'Done'
                }
            ]);
        });

        it('should validate lambda dropdown with invalid value on left side', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { \'invalid-subtask-status\' = x:status } |');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([
                {
                    type: 'dropdown_invalid_value',
                    message: 'Invalid dropdown value "invalid-subtask-status" for field "status"',
                    identifier: {
                        value: 'status',
                        range: { start: 60, end: 65 }
                    },
                    invalidValue: {
                        value: 'invalid-subtask-status',
                        range: { start: 31, end: 54 }
                    }
                }
            ]);

            expect(result.annotations).toEqual([]);
        });

        it('should validate dropdown with non-equality operators', () => {
            const { expression } = parseExpressionWithCursor('task.status != \'invalid-guid\' |');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([
                {
                    type: 'dropdown_invalid_value',
                    message: 'Invalid dropdown value "invalid-guid" for field "task.status"',
                    identifier: {
                        value: 'task.status',
                        range: { start: 0, end: 10 }
                    },
                    invalidValue: {
                        value: 'invalid-guid',
                        range: { start: 15, end: 28 }
                    }
                }
            ]);

            expect(result.annotations).toEqual([]);
        });

        it('should validate lambda variable reference to non-existent outer scope', () => {
            const { expression } = parseExpressionWithCursor('ANY OF project.members IS user -> { ANY OF task.subtasks IS subtask -> { nonexistent:field = \'test\' |} }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([
                {
                    type: 'lambda_variable_not_available',
                    message: 'Lambda variable "nonexistent" is not available in this scope',
                    lambdaVariable: {
                        value: 'nonexistent',
                        range: { start: 73, end: 83 }
                    }
                }
            ]);

            expect(result.annotations).toEqual([]);
        });

        it('should validate multiple lambda dropdown errors', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:status = \'invalid1\' AND x:status = \'invalid2\'| }');
            const result = validator.validate(expression);

            expect(result.errors).toHaveLength(2);
            expect(result.errors[0]).toEqual({
                type: 'dropdown_invalid_value',
                message: 'Invalid dropdown value "invalid1" for field "status"',
                identifier: {
                    value: 'status',
                    range: { start: 33, end: 38 }
                },
                invalidValue: {
                    value: 'invalid1',
                    range: { start: 42, end: 51 }
                }
            });
            expect(result.errors[1]).toEqual({
                type: 'dropdown_invalid_value',
                message: 'Invalid dropdown value "invalid2" for field "status"',
                identifier: {
                    value: 'status',
                    range: { start: 59, end: 64 }
                },
                invalidValue: {
                    value: 'invalid2',
                    range: { start: 68, end: 77 }
                }
            });

            expect(result.annotations).toEqual([]);
        });

        it('should validate nested property path in collection - basic', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:assignee.badfield = \'test\' |}');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([
                {
                    type: 'property_not_in_collection',
                    message: 'Property "assignee.badfield" is not available in collection "task.subtasks"',
                    lambdaVariable: {
                        value: 'x',
                        range: { start: 31, end: 31 }
                    },
                    property: {
                        value: 'assignee.badfield',
                        range: { start: 33, end: 49 }
                    },
                    collection: {
                        value: 'task.subtasks',
                        range: { start: 7, end: 19 }
                    }
                }
            ]);

            expect(result.annotations).toEqual([]);
        });

        it('should validate valid nested property path in collection', () => {
            const { expression } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:assignee.name = \'John\' |}');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([]);
            expect(result.annotations).toEqual([]);
        });

        it('should validate lambda property access outside any lambda context', () => {
            const { expression } = parseExpressionWithCursor('x:property = \'value\'|');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([
                {
                    type: 'lambda_variable_not_available',
                    message: 'Lambda variable "x" is not available in this scope',
                    lambdaVariable: {
                        value: 'x',
                        range: { start: 0, end: 0 }
                    }
                }
            ]);

            expect(result.annotations).toEqual([]);
        });

        it('should validate complex nested expression with multiple errors', () => {
            const { expression } = parseExpressionWithCursor('badfield = \'test\' AND ANY OF task.title IS x -> { x:badprop = \'invalid\'| }');
            const result = validator.validate(expression);

            expect(result.errors).toHaveLength(3);

            expect(result.errors).toContainEqual({
                type: 'field_not_exists',
                message: 'Field "badfield" does not exist',
                identifier: {
                    value: 'badfield',
                    range: { start: 0, end: 7 }
                }
            });

            expect(result.errors).toContainEqual({
                type: 'property_not_in_collection',
                message: 'Property "badprop" is not available in collection "task.title"',
                lambdaVariable: {
                    value: 'x',
                    range: { start: 50, end: 50 }
                },
                property: {
                    value: 'badprop',
                    range: { start: 52, end: 58 }
                },
                collection: {
                    value: 'task.title',
                    range: { start: 29, end: 38 }
                }
            });

            expect(result.errors).toContainEqual({
                type: 'collection_not_iterable',
                message: 'Field "task.title" is not a collection and cannot be iterated',
                identifier: {
                    value: 'task.title',
                    range: { start: 29, end: 38 }
                }
            });

            expect(result.annotations).toEqual([]);
        });

        it('should validate three-level nested lambda variables', () => {
            const { expression } = parseExpressionWithCursor('ANY OF project.members IS user -> { ANY OF task.subtasks IS subtask -> { ANY OF task.subtasks IS subtask2 -> { user:role = \'admin-guid\' AND subtask:status = \'subtask-done-guid\' AND subtask2:name = \'test\' |} } }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([]);

            expect(result.annotations).toEqual([
                {
                    type: 'dropdown_option',
                    position: { start: 123, end: 134 },
                    fieldPath: 'role',
                    guid: 'admin-guid',
                    displayValue: 'Admin'
                },
                {
                    type: 'dropdown_option',
                    position: { start: 157, end: 175 },
                    fieldPath: 'status',
                    guid: 'subtask-done-guid',
                    displayValue: 'Done'
                }
            ]);
        });

        it('should validate wrong lambda variable in deep nesting', () => {
            const { expression } = parseExpressionWithCursor('ANY OF project.members IS user -> { ANY OF task.subtasks IS subtask -> { ANY OF subtask:items IS item -> { wrongvar:field = \'test\' |} } }');
            const result = validator.validate(expression);

            expect(result.errors).toEqual([
                {
                    type: 'lambda_variable_not_available',
                    message: 'Lambda variable "wrongvar" is not available in this scope',
                    lambdaVariable: {
                        value: 'wrongvar',
                        range: { start: 107, end: 114 }
                    }
                }
            ]);

            expect(result.annotations).toEqual([]);
        });
    });
});