import { describe, it, expect, beforeEach } from 'vitest';
import { MappingExpressionValidator } from './mapping-expression-validator';
import { ExpressionField } from '../../expression-fields/expressionField';

const TEST_MAPPING_FIELDS: ExpressionField[] = [
    // Read-only fields
    {
        uniqueId: 'task.id',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: false
    },
    {
        uniqueId: 'task.createdDate',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: false
    },
    // Writable fields
    {
        uniqueId: 'process.form.field1',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'process.form.field2',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    // Dropdown fields
    {
        uniqueId: 'process.form.status',
        options: [
            { value: 'Active', globalId: 'status-active-guid' },
            { value: 'Inactive', globalId: 'status-inactive-guid' },
            { value: 'Pending', globalId: 'status-pending-guid' }
        ],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    {
        uniqueId: 'process.form.priority',
        options: [
            { value: 'High', globalId: 'priority-high-guid' },
            { value: 'Medium', globalId: 'priority-medium-guid' },
            { value: 'Low', globalId: 'priority-low-guid' }
        ],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    // Checkbox list (array field)
    {
        uniqueId: 'process.form.checkboxlist',
        options: [
            { value: 'Option 1', globalId: 'checkbox-option1-guid' },
            { value: 'Option 2', globalId: 'checkbox-option2-guid' },
            { value: 'Option 3', globalId: 'checkbox-option3-guid' }
        ],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    // Fields with files capability
    {
        uniqueId: 'process.attachments',
        options: [],
        properties: [],
        canHaveFiles: true,
        isWritable: true
    },
    {
        uniqueId: 'task.documents',
        options: [],
        properties: [],
        canHaveFiles: true,
        isWritable: false
    },
    // Field without files capability
    {
        uniqueId: 'process.form.description',
        options: [],
        properties: [],
        canHaveFiles: false,
        isWritable: true
    },
    // Collections
    {
        uniqueId: 'task.subtasks',
        options: [],
        properties: [
            { name: 'id', options: [] },
            { name: 'name', options: [] },
            {
                name: 'status', options: [
                    { value: 'Todo', globalId: 'subtask-todo-guid' },
                    { value: 'Done', globalId: 'subtask-done-guid' }
                ]
            }
        ],
        canHaveFiles: false,
        isWritable: false
    }
];

describe('MappingExpressionValidator', () => {
    let validator: MappingExpressionValidator;

    beforeEach(() => {
        validator = new MappingExpressionValidator(TEST_MAPPING_FIELDS);
    });

    describe('Field Existence Validation', () => {
        it('should validate non-existent output field', () => {
            const result = validator.validate('nonexistent.field := \'value\'');

            expect(result.errors).toContainEqual({
                type: 'field_not_exists',
                message: 'Field "nonexistent.field" does not exist',
                identifier: {
                    value: 'nonexistent.field',
                    range: { start: 0, end: 16 }
                }
            });
        });

        it('should validate non-existent input field', () => {
            const result = validator.validate('process.form.field1 := nonexistent.field');

            expect(result.errors).toContainEqual({
                type: 'field_not_exists',
                message: 'Field "nonexistent.field" does not exist',
                identifier: {
                    value: 'nonexistent.field',
                    range: { start: 23, end: 39 }
                }
            });
        });

        it('should validate existing fields without errors', () => {
            const result = validator.validate('process.form.field1 := process.form.field2');

            expect(result.errors).toHaveLength(0);
            expect(result.annotations).toHaveLength(0);
        });
    });

    describe('Field Writability Validation', () => {
        it('should error when assigning to read-only field', () => {
            const result = validator.validate('task.id := \'new-id\'');

            expect(result.errors).toContainEqual({
                type: 'field_not_writable',
                message: 'Field "task.id" is read-only and cannot be assigned a value',
                identifier: {
                    value: 'task.id',
                    range: { start: 0, end: 6 }
                }
            });
        });

        it('should allow assignment to writable field', () => {
            const result = validator.validate('process.form.field1 := \'value\'');

            expect(result.errors).toHaveLength(0);
        });

        it('should validate read-only field with conditional assignment', () => {
            const result = validator.validate('task.createdDate :?= \'2024-01-01\'');

            expect(result.errors).toContainEqual({
                type: 'field_not_writable',
                message: 'Field "task.createdDate" is read-only and cannot be assigned a value',
                identifier: {
                    value: 'task.createdDate',
                    range: { start: 0, end: 15 }
                }
            });
        });
    });

    describe('Dropdown Validation', () => {
        it('should validate invalid dropdown value with :=', () => {
            const result = validator.validate('process.form.status := \'invalid-guid\'');

            expect(result.errors).toContainEqual({
                type: 'dropdown_invalid_value',
                message: 'Invalid dropdown value "invalid-guid" for field "process.form.status"',
                identifier: {
                    value: 'process.form.status',
                    range: { start: 0, end: 18 }
                },
                invalidValue: {
                    value: 'invalid-guid',
                    range: { start: 23, end: 36 }
                }
            });
        });

        it('should validate valid dropdown value with :=', () => {
            const result = validator.validate('process.form.status := \'status-active-guid\'');

            expect(result.errors).toHaveLength(0);
            expect(result.annotations).toContainEqual({
                type: 'dropdown_option',
                position: { start: 23, end: 42 },
                fieldPath: 'process.form.status',
                guid: 'status-active-guid',
                displayValue: 'Active'
            });
        });


        it('should not validate dropdown for non-literal values', () => {
            const result = validator.validate('process.form.status := task.id');

            expect(result.errors).toHaveLength(0);
            expect(result.annotations).toHaveLength(0);
        });
    });

    describe('Complex Expressions', () => {
        it('should validate multiple assignments', () => {
            const result = validator.validate('process.form.field1 := \'test\'; process.form.status := \'status-pending-guid\'');

            expect(result.errors).toHaveLength(0);
            expect(result.annotations).toContainEqual({
                type: 'dropdown_option',
                position: { start: 54, end: 74 },
                fieldPath: 'process.form.status',
                guid: 'status-pending-guid',
                displayValue: 'Pending'
            });
        });

        it('should validate assignment with null coalescing', () => {
            const result = validator.validate('process.form.field1 := task.id ?? \'default\'');

            expect(result.errors).toHaveLength(0);
        });

        it('should validate mathematical expressions', () => {
            const result = validator.validate('process.form.field1 := 10 + 20 * 5');

            expect(result.errors).toHaveLength(0);
        });
    });

    describe('Parsing Errors', () => {
        it('should report parsing error for invalid syntax', () => {
            const result = validator.validate('process.form.field1 :=');

            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'parsing_error',
                    message: expect.stringContaining('Parser error')
                })
            );
        });

        it('should report parsing error for unclosed string', () => {
            const result = validator.validate('process.form.field1 := \'unclosed');

            expect(result.errors).toContainEqual(
                expect.objectContaining({
                    type: 'parsing_error'
                })
            );
        });
    });

    describe('Multiple Errors', () => {
        it('should report multiple errors in single expression', () => {
            const result = validator.validate('nonexistent.field := \'value\'; task.id := \'new-id\'');

            expect(result.errors).toEqual([
                {
                    type: 'field_not_exists',
                    message: 'Field "nonexistent.field" does not exist',
                    identifier: {
                        value: 'nonexistent.field',
                        range: { start: 0, end: 16 }
                    }
                },
                {
                    type: 'field_not_writable',
                    message: 'Field "task.id" is read-only and cannot be assigned a value',
                    identifier: {
                        value: 'task.id',
                        range: { start: 30, end: 36 }
                    }
                }
            ]);
        });

        it('should report multiple dropdown errors', () => {
            const result = validator.validate('process.form.status := \'invalid1\'; process.form.priority := \'invalid2\'');

            expect(result.errors).toEqual([
                {
                    type: 'dropdown_invalid_value',
                    message: 'Invalid dropdown value "invalid1" for field "process.form.status"',
                    identifier: {
                        value: 'process.form.status',
                        range: { start: 0, end: 18 }
                    },
                    invalidValue: {
                        value: 'invalid1',
                        range: { start: 23, end: 32 }
                    }
                },
                {
                    type: 'dropdown_invalid_value',
                    message: 'Invalid dropdown value "invalid2" for field "process.form.priority"',
                    identifier: {
                        value: 'process.form.priority',
                        range: { start: 35, end: 55 }
                    },
                    invalidValue: {
                        value: 'invalid2',
                        range: { start: 60, end: 69 }
                    }
                }
            ]);
        });
    });
});