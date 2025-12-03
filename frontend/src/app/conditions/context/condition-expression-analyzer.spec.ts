import { describe, it, expect } from 'vitest';
import { AnalysisContextType, ConditionExpressionAnalyzer, FieldType } from './condition-expression-analyzer';
import { TEST_EXPRESSION_FIELDS } from '../test-data/condition-test-expression-fields';

function parseExpressionWithCursor(expressionWithCursor: string): { expression: string; cursorPosition: number } {
    const cursorIndex = expressionWithCursor.indexOf('|');
    if (cursorIndex === -1) {
        throw new Error('Expression must contain | to indicate cursor position');
    }

    const expression = expressionWithCursor.replace('|', '');
    return { expression, cursorPosition: cursorIndex };
}

describe('ConditionExpressionAnalyzer', () => {
    let analyzer: ConditionExpressionAnalyzer;

    beforeEach(() => {
        analyzer = new ConditionExpressionAnalyzer(TEST_EXPRESSION_FIELDS);
    });

    it('empty expression with cursor at start should return containers', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.EMPTY_SPACE);
        expect(result.positionContext.availableFields).toEqual([
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
            }
        ]);
    });

    it('cursor after AND operator should return containers', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('task.status = \'status-active-guid\' AND |');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.EMPTY_SPACE);
        expect(result.positionContext.availableFields).toEqual([
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
            }
        ]);
    });

    it('should return next nodes for identifier 1', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('task.|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.IDENTIFIER);
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

    it('should return next nodes for identifier 2', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('task.details.|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'description',
                value: 'description',
                fullPath: 'task.details.description',
                type: FieldType.FIELD,
                insertText: 'description'
            },
            {
                name: 'notes',
                value: 'notes',
                fullPath: 'task.details.notes',
                type: FieldType.FIELD,
                insertText: 'notes'
            },
            {
                fullPath: "task.details.details2",
                insertText: "details2.",
                name: "details2",
                type: "subform",
                value: "details2"
            }
                
        ]);
    });

    it('cursor after = for dropdown should return dropdown items only', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('task.status =|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.DROPDOWN);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'Active',
                value: 'status-active-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-active-guid\'',
                description: 'Active'
            },
            {
                name: 'Completed',
                value: 'status-completed-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-completed-guid\'',
                description: 'Completed'
            },
            {
                name: 'Cancelled',
                value: 'status-cancelled-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-cancelled-guid\'',
                description: 'Cancelled'
            }
        ]);
    });
    it('cursor after = on right side with whitespace for dropdown should return dropdown items only', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('task.status =  |');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.DROPDOWN);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'Active',
                value: 'status-active-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-active-guid\'',
                description: 'Active'
            },
            {
                name: 'Completed',
                value: 'status-completed-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-completed-guid\'',
                description: 'Completed'
            },
            {
                name: 'Cancelled',
                value: 'status-cancelled-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-cancelled-guid\'',
                description: 'Cancelled'
            }
        ]);
    });
    it('cursor after = on right side with whitespace and bracket for dropdown should return dropdown items only', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('(task.status =  |)');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.DROPDOWN);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'Active',
                value: 'status-active-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-active-guid\'',
                description: 'Active'
            },
            {
                name: 'Completed',
                value: 'status-completed-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-completed-guid\'',
                description: 'Completed'
            },
            {
                name: 'Cancelled',
                value: 'status-cancelled-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-cancelled-guid\'',
                description: 'Cancelled'
            }
        ]);
    });

    it('cursor after = on right side with whitespace before AND for dropdown should return dropdown items only', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('(task.status =  | AND 1 = 1)');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.DROPDOWN);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'Active',
                value: 'status-active-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-active-guid\'',
                description: 'Active'
            },
            {
                name: 'Completed',
                value: 'status-completed-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-completed-guid\'',
                description: 'Completed'
            },
            {
                name: 'Cancelled',
                value: 'status-cancelled-guid',
                fullPath: 'task.status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'status-cancelled-guid\'',
                description: 'Cancelled'
            }
        ]);
    });
    it('cursor at empty position in lambda should return containers and lambda variable', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { | ');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.LAMBDA_EMPTY_SPACE);

        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'x',
                value: 'x',
                fullPath: 'x',
                type: FieldType.LAMBDA_VARIABLE,
                insertText: 'x:',
                description: 'Lambda variable from task.subtasks collection'
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
            }
        ]);
    });

    it('cursor after colon in lambda should return all properties from collection', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:| }');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.LAMBDA_IDENTIFIER);

        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'id',
                value: 'id',
                fullPath: 'id',
                type: FieldType.FIELD,
                insertText: 'id'
            },
            {
                name: 'name',
                value: 'name',
                fullPath: 'name',
                type: FieldType.FIELD,
                insertText: 'name'
            },
            {
                name: 'status',
                value: 'status',
                fullPath: 'status',
                type: FieldType.DROPDOWN,
                insertText: 'status'
            },
            {
                name: 'assignee',
                value: 'assignee',
                fullPath: 'assignee',
                type: FieldType.FORM,
                insertText: 'assignee.'
            },
            {
                fullPath: "items",
                insertText: "items",
                name: "items",
                type: "field",
                value: "items"
            }
        ]);
    });

    it('should return next nodes for property in lambda', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:assignee.| }');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.LAMBDA_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'name',
                value: 'name',
                fullPath: 'assignee.name',
                type: FieldType.FIELD,
                insertText: 'name'
            },
            {
                name: 'email',
                value: 'email',
                fullPath: 'assignee.email',
                type: FieldType.FIELD,
                insertText: 'email'
            }
        ]);
    });

    it('should return next nodes for property also when lambda is not closed', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:assignee.| ');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.LAMBDA_IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'name',
                value: 'name',
                fullPath: 'assignee.name',
                type: FieldType.FIELD,
                insertText: 'name'
            },
            {
                name: 'email',
                value: 'email',
                fullPath: 'assignee.email',
                type: FieldType.FIELD,
                insertText: 'email'
            }
        ]);
    });

    it('cursor after dropdown in lambda should return dropdown items only', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('ANY OF task.subtasks IS x -> { x:status = | }');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.DROPDOWN);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'Todo',
                value: 'subtask-todo-guid',
                fullPath: 'status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'subtask-todo-guid\'',
                description: 'Todo'
            },
            {
                name: 'InProgress',
                value: 'subtask-inprogress-guid',
                fullPath: 'status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'subtask-inprogress-guid\'',
                description: 'InProgress'
            },
            {
                name: 'Done',
                value: 'subtask-done-guid',
                fullPath: 'status',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'subtask-done-guid\'',
                description: 'Done'
            }
        ]);
    });



    it('cursor in the middle of container identifier should return containers', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('tas|');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.IDENTIFIER);
        expect(result.positionContext.availableFields).toEqual([
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
            }
        ]);
    });

    it('cursor after dropdown != should return dropdown items only', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('task.priority != |');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.DROPDOWN);
        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'High',
                value: 'priority-high-guid',
                fullPath: 'task.priority',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'priority-high-guid\'',
                description: 'High'
            },
            {
                name: 'Medium',
                value: 'priority-medium-guid',
                fullPath: 'task.priority',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'priority-medium-guid\'',
                description: 'Medium'
            },
            {
                name: 'Low',
                value: 'priority-low-guid',
                fullPath: 'task.priority',
                type: FieldType.DROPDOWN_OPTION,
                insertText: '\'priority-low-guid\'',
                description: 'Low'
            }
        ]);
    });

    it('cursor at empty position in nested lambda should return all lambda variables and containers', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('ANY OF project.members IS user -> { ANY OF task.subtasks IS subtask -> { | } }');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.LAMBDA_EMPTY_SPACE);

        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'user',
                value: 'user',
                fullPath: 'user',
                type: FieldType.LAMBDA_VARIABLE,
                insertText: 'user:',
                description: 'Lambda variable from project.members collection'
            },
            {
                name: 'subtask',
                value: 'subtask',
                fullPath: 'subtask',
                type: FieldType.LAMBDA_VARIABLE,
                insertText: 'subtask:',
                description: 'Lambda variable from task.subtasks collection'
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
            }
        ]);
    });

    it('cursor after colon in nested lambda should return all properties from collection', () => {
        const { expression, cursorPosition } = parseExpressionWithCursor('ANY OF project.members IS user -> { ANY OF task.subtasks IS subtask -> { user:| } }');
        const result = analyzer.analyze(expression, cursorPosition);

        expect(result.positionContext.contextType).toBe(AnalysisContextType.LAMBDA_IDENTIFIER);

        expect(result.positionContext.availableFields).toEqual([
            {
                name: 'userId',
                value: 'userId',
                fullPath: 'userId',
                type: FieldType.FIELD,
                insertText: 'userId'
            },
            {
                name: 'role',
                value: 'role',
                fullPath: 'role',
                type: FieldType.DROPDOWN,
                insertText: 'role'
            },
            {
                name: 'profile',
                value: 'profile',
                fullPath: 'profile',
                type: FieldType.FIELD,
                insertText: 'profile'
            }
        ]);
    });
});