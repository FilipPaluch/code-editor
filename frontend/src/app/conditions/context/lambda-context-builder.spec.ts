import { describe, it, expect, beforeEach } from 'vitest';
import { LambdaContextBuilder } from './lambda-context-builder';
import { ConditionExpressionElementsVisitor } from '../visitors/condition-expression-elements-visitor';
import { TEST_EXPRESSION_FIELDS } from '../test-data/condition-test-expression-fields';

//TODO: adjust tests to new model - few tests are not passing - i know about it
describe('LambdaContextBuilder', () => {
    let lambdaContextBuilder: LambdaContextBuilder;
    let visitor: ConditionExpressionElementsVisitor;
    let expressionFields: Map<string, typeof TEST_EXPRESSION_FIELDS[0]>;

    beforeEach(() => {
        expressionFields = new Map(TEST_EXPRESSION_FIELDS.map(f => [f.uniqueId, f]));
        lambdaContextBuilder = new LambdaContextBuilder(expressionFields);
        visitor = new ConditionExpressionElementsVisitor();
    });

    function parseExpressionWithCursor(expressionWithCursor: string): { expression: string; cursorPosition: number } {
        const cursorIndex = expressionWithCursor.indexOf('|');
        if (cursorIndex === -1) {
            throw new Error('Expression must contain | to indicate cursor position');
        }
        const expression = expressionWithCursor.replace('|', '');
        return { expression, cursorPosition: cursorIndex };
    }

    describe('buildAllLambdasHierarchyForExpression', () => {
        it('should build empty hierarchy for expression without lambdas', () => {
            const expression = 'task.id = 5';
            const parseResult = visitor.parse(expression);
            
            const lambdasHierarchy = lambdaContextBuilder.buildAllLambdasHierarchyForExpression(parseResult);
            
            expect(lambdasHierarchy.size).toBe(0);
        });

        it('should build hierarchy for single lambda expression', () => {
            const expression = 'ANY OF task.subtasks IS subtask -> { subtask:id = 5 }';
            const parseResult = visitor.parse(expression);
            
            const lambdasHierarchy = lambdaContextBuilder.buildAllLambdasHierarchyForExpression(parseResult);
            
            expect(Array.from(lambdasHierarchy.values())).toEqual([
                expect.objectContaining({
                    variableName: 'subtask',
                    collectionPath: 'task.subtasks',
                    level: 0
                })
            ]);
        });

        it('should build hierarchy for nested lambdas with parent-child relationships', () => {
            const expression = 'ANY OF task.subtasks IS subtask -> { ANY OF project.members IS member -> { member:userId = 1 } }';
            const parseResult = visitor.parse(expression);
            
            const lambdasHierarchy = lambdaContextBuilder.buildAllLambdasHierarchyForExpression(parseResult);
            
            const lambdas = Array.from(lambdasHierarchy.values());
            expect(lambdas).toHaveLength(2);
            
            const outerLambda = lambdas.find(l => l.variableName === 'subtask');
            expect(outerLambda).toMatchObject({
                variableName: 'subtask',
                collectionPath: 'task.subtasks',
                level: 0
            });
            expect(outerLambda?.parentLambda).toBeUndefined();
            
            const innerLambda = lambdas.find(l => l.variableName === 'member');
            expect(innerLambda).toMatchObject({
                variableName: 'member',
                collectionPath: 'project.members',
                level: 1
            });
            expect(innerLambda?.parentLambda).toBe(outerLambda);
        });

        it('should handle unclosed lambda expression', () => {
            const expression = 'ANY OF task.subtasks IS subtask -> { subtask:id = 5';
            const parseResult = visitor.parse(expression);
            
            const lambdasHierarchy = lambdaContextBuilder.buildAllLambdasHierarchyForExpression(parseResult);
            
            expect(Array.from(lambdasHierarchy.values())).toEqual([
                expect.objectContaining({
                    variableName: 'subtask',
                    collectionPath: 'task.subtasks',
                    level: 0
                })
            ]);
        });

        it('should handle multiple unclosed nested lambdas', () => {
            const expression = 'ANY OF task.subtasks IS x -> { ANY OF project.members IS y -> { y:role = "admin"';
            const parseResult = visitor.parse(expression);
            
            const lambdasHierarchy = lambdaContextBuilder.buildAllLambdasHierarchyForExpression(parseResult);
            
            expect(lambdasHierarchy.size).toBe(2);
            const lambdas = Array.from(lambdasHierarchy.values());
            
            const outerLambda = lambdas.find(l => l.variableName === 'x');
            const innerLambda = lambdas.find(l => l.variableName === 'y');
            
            expect(innerLambda?.parentLambda).toBe(outerLambda);
            expect(innerLambda?.level).toBe(1);
        });
    });

    describe('buildLambdaStackForCursorPosition', () => {
        it('should return empty stack when cursor is outside any lambda', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor('| task.id = 5');
            const parseResult = visitor.parse(expression);
            
            const stack = lambdaContextBuilder.buildLambdaStackForCursorPosition(cursorPosition, parseResult);
            
            expect(stack).toEqual([]);
        });

        it('should build stack when cursor is inside single lambda', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor('ANY OF task.subtasks IS subtask -> { subtask:id = 5 | }');
            const parseResult = visitor.parse(expression);
            
            const stack = lambdaContextBuilder.buildLambdaStackForCursorPosition(cursorPosition, parseResult);
            
            expect(stack).toEqual([
                expect.objectContaining({
                    variable: 'subtask',
                    collectionFieldPath: 'task.subtasks',
                    collectionField: expressionFields.get('task.subtasks'),
                    level: 0
                })
            ]);
        });

        it('should build stack for nested lambdas when cursor is in inner lambda', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor(
                'ANY OF task.subtasks IS x -> { ANY OF project.members IS y -> { y:userId = | } }'
            );
            const parseResult = visitor.parse(expression);
            
            const stack = lambdaContextBuilder.buildLambdaStackForCursorPosition(cursorPosition, parseResult);
            
            expect(stack).toEqual([
                {
                    variable: 'x',
                    collectionFieldPath: 'task.subtasks',
                    collectionField: expressionFields.get('task.subtasks'),
                    level: 0
                },
                {
                    variable: 'y',
                    collectionFieldPath: 'project.members',
                    collectionField: expressionFields.get('project.members'),
                    level: 1
                }
            ]);
        });

        it('should build stack when cursor is in outer lambda but outside inner lambda', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor(
                'ANY OF task.subtasks IS x -> { | ANY OF project.members IS y -> { y:userId = 1 } }'
            );
            const parseResult = visitor.parse(expression);
            
            const stack = lambdaContextBuilder.buildLambdaStackForCursorPosition(cursorPosition, parseResult);
            
            expect(stack).toEqual([
                {
                    variable: 'x',
                    collectionFieldPath: 'task.subtasks',
                    collectionField: expressionFields.get('task.subtasks'),
                    level: 0
                }
            ]);
        });

        it('should handle cursor position at lambda boundaries', () => {
            const expression = 'ANY OF task.subtasks IS x -> { x:id = 5 }';
            const parseResult = visitor.parse(expression);
            
            const openBracePos = expression.indexOf('{');
            const stackAtOpen = lambdaContextBuilder.buildLambdaStackForCursorPosition(openBracePos, parseResult);
            
            expect(stackAtOpen).toEqual([
                {
                    variable: 'x',
                    collectionFieldPath: 'task.subtasks',
                    collectionField: expressionFields.get('task.subtasks'),
                    level: 0
                }
            ]);
            
            const closeBracePos = expression.indexOf('}');
            const stackAtClose = lambdaContextBuilder.buildLambdaStackForCursorPosition(closeBracePos, parseResult);
            
            expect(stackAtClose).toEqual([
                {
                    variable: 'x',
                    collectionFieldPath: 'task.subtasks',
                    collectionField: expressionFields.get('task.subtasks'),
                    level: 0
                }
            ]);
        });

        it('should handle unclosed lambda with cursor inside', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor(
                'ANY OF task.subtasks IS x -> { x:name = \'test\' |'
            );
            const parseResult = visitor.parse(expression);
            
            const stack = lambdaContextBuilder.buildLambdaStackForCursorPosition(cursorPosition, parseResult);
            
            expect(stack).toEqual([
                {
                    variable: 'x',
                    collectionFieldPath: 'task.subtasks',
                    collectionField: expressionFields.get('task.subtasks'),
                    level: 0
                }
            ]);
        });
    });

    describe('getAvailableLambdaVariablesAtCursorPosition', () => {
        it('should return empty array when cursor is outside any lambda', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor('task.status = "active" |');
            const parseResult = visitor.parse(expression);
            
            const variables = lambdaContextBuilder.getAvailableLambdaVariablesAtCursorPosition(cursorPosition, parseResult);
            
            expect(variables).toEqual([]);
        });

        it('should return single variable when cursor is inside single lambda', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor(
                'ANY OF task.subtasks IS subtask -> { | subtask:id = 5 }'
            );
            const parseResult = visitor.parse(expression);
            
            const variables = lambdaContextBuilder.getAvailableLambdaVariablesAtCursorPosition(cursorPosition, parseResult);
            
            expect(variables).toEqual(['subtask']);
        });

        it('should return all parent variables when cursor is inside nested lambdas', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor(
                'ANY OF task.subtasks IS a -> { ANY OF project.members IS b -> { | } }'
            );
            const parseResult = visitor.parse(expression);
            
            const variables = lambdaContextBuilder.getAvailableLambdaVariablesAtCursorPosition(cursorPosition, parseResult);
            
            expect(variables).toEqual(['a', 'b']);
        });

        it('should handle three levels of nesting', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor(
                'ALL OF task.subtasks IS x -> { ANY OF project.members IS y -> { ALL OF task.subtasks IS z -> { | } } }'
            );
            const parseResult = visitor.parse(expression);
            
            const variables = lambdaContextBuilder.getAvailableLambdaVariablesAtCursorPosition(cursorPosition, parseResult);
            
            expect(variables).toEqual(['x', 'y', 'z']);
        });

        it('should handle unclosed nested lambdas', () => {
            const { expression, cursorPosition } = parseExpressionWithCursor(
                'ANY OF task.subtasks IS x -> { ANY OF project.members IS y -> { |'
            );
            const parseResult = visitor.parse(expression);
            
            const variables = lambdaContextBuilder.getAvailableLambdaVariablesAtCursorPosition(cursorPosition, parseResult);
            
            expect(variables).toEqual(['x', 'y']);
        });
    });
});