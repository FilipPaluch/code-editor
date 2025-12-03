import {
    Context,
    ContextType,
    ConditionExpressionParsingResult,
    LambdaMetadata,
    IdentifierElement,
    ParsedElement
} from '../visitors/condition-expression-elements-visitor';
import { ExpressionField } from '../../expression-fields/expressionField';

export interface LambdaDetails {
    variableName: string;
    collectionPath: string;
    collectionField: ExpressionField;
    context: Context;
    metadata: LambdaMetadata;
    variableElement: IdentifierElement;
    collectionElement: IdentifierElement;
    parentLambda?: LambdaDetails;
    level: number;
}


export class LambdaContextBuilder {
    constructor(private fieldMap: Map<string, ExpressionField>) { }

    /**
     * Builds a complete hierarchy of all lambda expressions in the parsed expression.
     * Returns a map where keys are lambda context IDs and values are lambda details.
     * The hierarchy includes parent-child relationships between nested lambdas.
     */
    buildAllLambdasHierarchyForExpression(parseResult: ConditionExpressionParsingResult): Map<number, LambdaDetails> {
        const allLambdasHierarchyForExpression = new Map<number, LambdaDetails>();
        const lambdaContexts = parseResult.contexts.filter(ctx => ctx.type === ContextType.LAMBDA);

        for (const context of lambdaContexts) {

            const metadata = context.metadata as LambdaMetadata;
            const variableElement = this.findElement(parseResult, metadata.variableElementId) as IdentifierElement;
            const collectionElement = this.findElement(parseResult, metadata.collectionElementId) as IdentifierElement;

            if (!variableElement || !collectionElement) continue;

            const collectionPath = collectionElement.value;
            const collectionField = this.fieldMap.get(collectionPath);

            if (!collectionField) continue;

            allLambdasHierarchyForExpression.set(context.id, {
                variableName: variableElement.value,
                collectionPath,
                collectionField,
                context,
                metadata,
                variableElement,
                collectionElement,
                level: 0
            });
        }

        for (const lambda of allLambdasHierarchyForExpression.values()) {
            const closestParent = this.findClosestParentLambda(lambda, allLambdasHierarchyForExpression);
            if (closestParent) {
                lambda.parentLambda = closestParent;
                lambda.level = closestParent.level + 1;
            }
        }

        return allLambdasHierarchyForExpression;
    }

    /**
     * The stack is ordered from outermost to innermost lambda.
     */
    buildLambdaStackForCursorPosition(
        cursorPosition: number,
        parseResult: ConditionExpressionParsingResult
    ): LambdaDetails[] {
        const allLambdasHierarchyForExpression = this.buildAllLambdasHierarchyForExpression(parseResult);
        const lambdasStackForCursorPosition = this.getAllLambdasContainingCursorPosition(cursorPosition, allLambdasHierarchyForExpression);

        const sortedLambdas = this.sortLambdasByDepthDeepestFirst(lambdasStackForCursorPosition);

        if (sortedLambdas.length > 0) {
            return this.buildDetailsStackFromDeepestLambdaToRoot(sortedLambdas[0]);
        }

        return [];
    }

    private buildDetailsStackFromDeepestLambdaToRoot(deepestLambda: LambdaDetails): LambdaDetails[] {
        const stack: LambdaDetails[] = [];
        let current: LambdaDetails | undefined = deepestLambda;

        while (current) {
            stack.unshift(current);
            current = current.parentLambda;
        }

        return stack;
    }

    getAvailableLambdaVariablesAtCursorPosition(
        cursorPosition: number,
        parseResult: ConditionExpressionParsingResult
    ): string[] {
        const stack = this.buildLambdaStackForCursorPosition(cursorPosition, parseResult);
        return stack.map(item => item.variableName.toLowerCase());
    }

    private getAllLambdasContainingCursorPosition(
        cursorPosition: number,
        allLambdasHierarchyForExpression: Map<number, LambdaDetails>
    ): LambdaDetails[] {
        const lambdasStackForCursorPosition: LambdaDetails[] = [];

        for (const lambda of allLambdasHierarchyForExpression.values()) {
            var lambdaMetadata = lambda.context.metadata as LambdaMetadata;

            if (cursorPosition >= lambda.context.position.start &&
                (cursorPosition <= lambda.context.position.end || !lambdaMetadata.closeBraceElementId)) {

                lambdasStackForCursorPosition.push(lambda);

            }
        }

        return lambdasStackForCursorPosition;
    }

    private sortLambdasByDepthDeepestFirst(lambdas: LambdaDetails[]): LambdaDetails[] {
        return [...lambdas].sort((a, b) => b.level - a.level);
    }

    /**
     * Finds the closest parent lambda for the given lambda.
     * A parent lambda is one that contains the child lambda.
     * If multiple lambdas contain this one, returns the closest (smallest containing) parent.
     */
    private findClosestParentLambda(
        childLambda: LambdaDetails,
        allLambdasHierarchyForExpression: Map<number, LambdaDetails>
    ): LambdaDetails | undefined {
        let closestParent: LambdaDetails | undefined;
        let minDistance = Infinity;

        for (const potentialParent of allLambdasHierarchyForExpression.values()) {
            if (childLambda === potentialParent) continue;

            if (this.isContextInsideAnother(childLambda.context, potentialParent.context)) {
                // Calculate distance between lambda start positions
                // The smaller the distance, the closer (more immediate) the parent
                const distance = childLambda.context.position.start - potentialParent.context.position.start;
                if (distance < minDistance) {
                    minDistance = distance;
                    closestParent = potentialParent;
                }
            }
        }

        return closestParent;
    }

    /**
     * Checks if one context is fully contained within another context.
     * A context is inside another if its start position is >= the outer context's start
     * AND its end position is <= the outer context's end.
     * Contexts with the same ID are never considered as containing each other.
     */
    private isContextInsideAnother(inner: Context, outer: Context): boolean {
        return inner.position.start >= outer.position.start &&
            inner.position.end <= outer.position.end &&
            inner.id !== outer.id;
    }

    private findElement(parseResult: ConditionExpressionParsingResult, id: number): ParsedElement | undefined {
        return parseResult.elements.find(el => el.id === id);
    }
}