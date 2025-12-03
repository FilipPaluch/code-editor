import { describe, it, expect, beforeEach } from 'vitest';
import { MappingAnalysisContextType, FieldType, MappingExpressionContextAnalyzer } from './mapping-expression-context-analyzer';
import { TEST_MAPPING_EXPRESSION_FIELDS } from '../test-data/mapping-test-expression-fields';

function parseExpressionWithCursor(expressionWithCursor: string): { expression: string; cursorPosition: number } {
    const cursorIndex = expressionWithCursor.indexOf('|');
    if (cursorIndex === -1) {
        throw new Error('Expression must contain | to indicate cursor position');
    }

    const expression = expressionWithCursor.replace('|', '');
    return { expression, cursorPosition: cursorIndex };
}

describe('MappingExpressionContextAnalyzer', () => {
    let analyzer: MappingExpressionContextAnalyzer;

    beforeEach(() => {
        analyzer = new MappingExpressionContextAnalyzer(TEST_MAPPING_EXPRESSION_FIELDS);
    });

    it('cursor after var. should show only declared variables from current expression', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('process.test := 1; var.total := 10; var.reasons := []; var.sum := var.total + 5; var.|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.OUTPUT_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'total',
                value: 'total',
                fullPath: 'var.total',
                type: FieldType.VARIABLE,
                insertText: 'total'
            },
            {
                name: 'reasons',
                value: 'reasons',
                fullPath: 'var.reasons',
                type: FieldType.VARIABLE,
                insertText: 'reasons'
            },
            {
                name: 'sum',
                value: 'sum',
                fullPath: 'var.sum',
                type: FieldType.VARIABLE,
                insertText: 'sum'
            }
        ]);
    });

    it('cursor after var. on right side should show declared variables', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('var.a := 1; var.b := 2; var.c := var.|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.INPUT_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'a',
                value: 'a',
                fullPath: 'var.a',
                type: FieldType.VARIABLE,
                insertText: 'a'
            },
            {
                name: 'b',
                value: 'b',
                fullPath: 'var.b',
                type: FieldType.VARIABLE,
                insertText: 'b'
            },
            {
                name: 'c',
                value: 'c',
                fullPath: 'var.c',
                type: FieldType.VARIABLE,
                insertText: 'c'
            }
        ]);
    });

    it('cursor after var. when no variables declared should return empty list', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('var.|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.OUTPUT_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([]);
    });

    it('cursor after var. should not show variables declared after cursor position', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('var.a := 1; var.| var.b := 2;');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.OUTPUT_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'a',
                value: 'a',
                fullPath: 'var.a',
                type: FieldType.VARIABLE,
                insertText: 'a'
            }
        ]);
    });

    it('variables with FILES suffix should be recognized', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('var.docs:FILES := task.attachments:FILES; var.|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.OUTPUT_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'docs',
                value: 'docs',
                fullPath: 'var.docs',
                type: FieldType.VARIABLE,
                insertText: 'docs'
            }
        ]);
    });
    it('empty expression with cursor at start should return containers and var', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.EMPTY_SPACE);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'var',
                value: 'var',
                fullPath: 'var',
                type: FieldType.CONTAINER,
                insertText: 'var.'
            },
            {
                name: 'task',
                value: 'task',
                fullPath: 'task',
                type: FieldType.CONTAINER,
                insertText: 'task.'
            },
            {
                name: 'project',
                value: 'project',
                fullPath: 'project',
                type: FieldType.CONTAINER,
                insertText: 'project.'
            },
            {
                name: 'process',
                value: 'process',
                fullPath: 'process',
                type: FieldType.CONTAINER,
                insertText: 'process.'
            }
        ]);
    });

    it('cursor after identifier on left side (output) should return child fields', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('process.form.|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.OUTPUT_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'field1',
                value: 'field1',
                fullPath: 'process.form.field1',
                type: FieldType.FIELD,
                insertText: 'field1'
            },
            {
                name: 'field2',
                value: 'field2',
                fullPath: 'process.form.field2',
                type: FieldType.FIELD,
                insertText: 'field2'
            },
            {
                name: 'status',
                value: 'status',
                fullPath: 'process.form.status',
                type: FieldType.DROPDOWN,
                insertText: 'status'
            },
            {
                name: 'checkboxlist',
                value: 'checkboxlist',
                fullPath: 'process.form.checkboxlist',
                type: FieldType.DROPDOWN,
                insertText: 'checkboxlist'
            },
            {
                name: 'subform',
                value: 'subform',
                fullPath: 'process.form.subform',
                type: FieldType.SUBFORM,
                insertText: 'subform.'
            }
        ]);
    });

    it('cursor after := should return containers and var', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('process.form.field1 := |');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.EMPTY_SPACE);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'var',
                value: 'var',
                fullPath: 'var',
                type: FieldType.CONTAINER,
                insertText: 'var.'
            },
            {
                name: 'task',
                value: 'task',
                fullPath: 'task',
                type: FieldType.CONTAINER,
                insertText: 'task.'
            },
            {
                name: 'project',
                value: 'project',
                fullPath: 'project',
                type: FieldType.CONTAINER,
                insertText: 'project.'
            },
            {
                name: 'process',
                value: 'process',
                fullPath: 'process',
                type: FieldType.CONTAINER,
                insertText: 'process.'
            }
        ]);
    });


    it('cursor after var. should return declared variables', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('var.total := 10; var.reasons := []; var.|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.OUTPUT_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'total',
                value: 'total',
                fullPath: 'var.total',
                type: FieldType.VARIABLE,
                insertText: 'total'
            },
            {
                name: 'reasons',
                value: 'reasons',
                fullPath: 'var.reasons',
                type: FieldType.VARIABLE,
                insertText: 'reasons'
            }
        ]);
    });

    it('cursor after += for variable array should return containers and var', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('var.reasons := []; var.reasons += |');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.EMPTY_SPACE);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'var',
                value: 'var',
                fullPath: 'var',
                type: FieldType.CONTAINER,
                insertText: 'var.'
            },
            {
                name: 'task',
                value: 'task',
                fullPath: 'task',
                type: FieldType.CONTAINER,
                insertText: 'task.'
            },
            {
                name: 'project',
                value: 'project',
                fullPath: 'project',
                type: FieldType.CONTAINER,
                insertText: 'project.'
            },
            {
                name: 'process',
                value: 'process',
                fullPath: 'process',
                type: FieldType.CONTAINER,
                insertText: 'process.'
            }
        ]);
    });

    it('cursor after semicolon should return containers and var', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('process.form.field1 := \'test\'; |');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.EMPTY_SPACE);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'var',
                value: 'var',
                fullPath: 'var',
                type: FieldType.CONTAINER,
                insertText: 'var.'
            },
            {
                name: 'task',
                value: 'task',
                fullPath: 'task',
                type: FieldType.CONTAINER,
                insertText: 'task.'
            },
            {
                name: 'project',
                value: 'project',
                fullPath: 'project',
                type: FieldType.CONTAINER,
                insertText: 'project.'
            },
            {
                name: 'process',
                value: 'process',
                fullPath: 'process',
                type: FieldType.CONTAINER,
                insertText: 'process.'
            }
        ]);
    });

    it('cursor in identifier on right side (input) should return child fields', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('process.form.field1 := task.|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.INPUT_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'id',
                value: 'id',
                fullPath: 'task.id',
                type: FieldType.FIELD,
                insertText: 'id'
            },
            {
                name: 'title',
                value: 'title',
                fullPath: 'task.title',
                type: FieldType.FIELD,
                insertText: 'title'
            },
            {
                name: 'status',
                value: 'status',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN,
                insertText: 'status'
            },
            {
                name: 'priority',
                value: 'priority',
                fullPath: 'task.priority',
                type: FieldType.DROPDOWN,
                insertText: 'priority'
            },
            {
                name: 'details',
                value: 'details',
                fullPath: 'task.details',
                type: FieldType.FORM,
                insertText: 'details.'
            },
            {
                name: 'subtasks',
                value: 'subtasks',
                fullPath: 'task.subtasks',
                type: FieldType.COLLECTION,
                insertText: 'subtasks'
            }
        ]);
    });

    it('cursor after := for dropdown assignment should return dropdown options', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('process.form.status := |');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.DROPDOWN_VALUE);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'Draft',
                value: 'process-draft-guid',
                fullPath: 'process.form.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'process-draft-guid\'',
                description: 'Draft'
            },
            {
                name: 'Submitted',
                value: 'process-submitted-guid',
                fullPath: 'process.form.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'process-submitted-guid\'',
                description: 'Submitted'
            },
            {
                name: 'Approved',
                value: 'process-approved-guid',
                fullPath: 'process.form.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'process-approved-guid\'',
                description: 'Approved'
            }
        ]);
    });

    it('cursor in middle of identifier should return containers', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('pro|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.OUTPUT_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'var',
                value: 'var',
                fullPath: 'var',
                type: FieldType.CONTAINER,
                insertText: 'var.'
            },
            {
                name: 'task',
                value: 'task',
                fullPath: 'task',
                type: FieldType.CONTAINER,
                insertText: 'task.'
            },
            {
                name: 'project',
                value: 'project',
                fullPath: 'project',
                type: FieldType.CONTAINER,
                insertText: 'project.'
            },
            {
                name: 'process',
                value: 'process',
                fullPath: 'process',
                type: FieldType.CONTAINER,
                insertText: 'process.'
            }
        ]);
    });

    it('cursor after COPY( should return containers and var', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('process.form.subform := COPY(|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.EMPTY_SPACE);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'var',
                value: 'var',
                fullPath: 'var',
                type: FieldType.CONTAINER,
                insertText: 'var.'
            },
            {
                name: 'task',
                value: 'task',
                fullPath: 'task',
                type: FieldType.CONTAINER,
                insertText: 'task.'
            },
            {
                name: 'project',
                value: 'project',
                fullPath: 'project',
                type: FieldType.CONTAINER,
                insertText: 'project.'
            },
            {
                name: 'process',
                value: 'process',
                fullPath: 'process',
                type: FieldType.CONTAINER,
                insertText: 'process.'
            }
        ]);
    });

    it('cursor after conditional assignment :?= should return containers and var', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('process.form.field1 :?= |');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.EMPTY_SPACE);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'var',
                value: 'var',
                fullPath: 'var',
                type: FieldType.CONTAINER,
                insertText: 'var.'
            },
            {
                name: 'task',
                value: 'task',
                fullPath: 'task',
                type: FieldType.CONTAINER,
                insertText: 'task.'
            },
            {
                name: 'project',
                value: 'project',
                fullPath: 'project',
                type: FieldType.CONTAINER,
                insertText: 'project.'
            },
            {
                name: 'process',
                value: 'process',
                fullPath: 'process',
                type: FieldType.CONTAINER,
                insertText: 'process.'
            }
        ]);
    });

    it('cursor in FILES assignment should return containers', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('process.attachments:FILES := |');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(MappingAnalysisContextType.EMPTY_SPACE);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'var',
                value: 'var',
                fullPath: 'var',
                type: FieldType.CONTAINER,
                insertText: 'var.'
            },
            {
                name: 'task',
                value: 'task',
                fullPath: 'task',
                type: FieldType.CONTAINER,
                insertText: 'task.'
            },
            {
                name: 'project',
                value: 'project',
                fullPath: 'project',
                type: FieldType.CONTAINER,
                insertText: 'project.'
            },
            {
                name: 'process',
                value: 'process',
                fullPath: 'process',
                type: FieldType.CONTAINER,
                insertText: 'process.'
            }
        ]);
    });
});