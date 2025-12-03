import { ExpressionField, DropdownOption } from '../../expression-fields/expressionField';
import { LambdaContextBuilder, LambdaDetails } from '../context/lambda-context-builder';
import { ConditionExpressionParsingResult, ElementType, IdentifierElement, LambdaVariableContext, LambdaPropertyAccessContext, ContextType, ComparisonMetadata, ConditionExpressionElementsVisitor } from '../visitors/condition-expression-elements-visitor';


export type ConditionExpressionValidationError =
    | ParsingError
    | FieldNotExistsError
    | PropertyNotInCollectionError
    | DropdownInvalidValueError
    | CollectionNotIterableError
    | LambdaVariableNotAvailableError;

export interface ParsingError {
    type: 'parsing_error';
    message: string;
    position: {
        start: number;
        end: number;
    };
}
export interface FieldNotExistsError {
    type: 'field_not_exists';
    message: string;
    identifier: {
        value: string;
        range: { start: number; end: number };
    };
}

export interface PropertyNotInCollectionError {
    type: 'property_not_in_collection';
    message: string;
    lambdaVariable: {
        value: string;
        range: { start: number; end: number };
    };
    property: {
        value: string;
        range: { start: number; end: number };
    };
    collection: {
        value: string;
        range: { start: number; end: number };
    };
}

export interface DropdownInvalidValueError {
    type: 'dropdown_invalid_value';
    message: string;
    identifier: {
        value: string;
        range: { start: number; end: number };
    };
    invalidValue: {
        value: string;
        range: { start: number; end: number };
    };
}

export interface CollectionNotIterableError {
    type: 'collection_not_iterable';
    message: string;
    identifier: {
        value: string;
        range: { start: number; end: number };
    };
}

export interface LambdaVariableNotAvailableError {
    type: 'lambda_variable_not_available';
    message: string;
    lambdaVariable: {
        value: string;
        range: { start: number; end: number };
    };
}

export interface DropdownOptionAnnotation {
    type: 'dropdown_option';
    position: {
        start: number;
        end: number;
    };
    fieldPath: string;
    guid: string;
    displayValue: string;
}

export type ConditionExpressionValidationAnnotation = DropdownOptionAnnotation;

export interface ConditionExpressionValidationErrorResult {
    errors: ConditionExpressionValidationError[];
    annotations: ConditionExpressionValidationAnnotation[];
}

export class ConditionExpressionValidator {
    private expressionFieldsMap = new Map<string, ExpressionField>();
    private lambdaContextBuilder: LambdaContextBuilder;
    private visitor: ConditionExpressionElementsVisitor = new ConditionExpressionElementsVisitor();

    constructor(fields: ExpressionField[]) {
        this.expressionFieldsMap = this.buildFieldMap(fields);
        this.lambdaContextBuilder = new LambdaContextBuilder(this.expressionFieldsMap);
    }

    public validate(fullText: string): ConditionExpressionValidationErrorResult {
        const parseResult = this.visitor.parse(fullText);

        const errors: ConditionExpressionValidationError[] = [];
        const annotations: ConditionExpressionValidationAnnotation[] = [];

        if (!parseResult.isValid) {
            parseResult.diagnostics.forEach(diagnostic => {
                errors.push({
                    type: 'parsing_error',
                    message: diagnostic.message,
                    position: diagnostic.position
                });
            });
        }

        const lambdasHierarchy = this.lambdaContextBuilder.buildAllLambdasHierarchyForExpression(parseResult);

        const identifiers = parseResult.elements
            .filter(el => el.type === ElementType.IDENTIFIER)
            .map(el => el as IdentifierElement);

        for (const identifier of identifiers) {
            const identifierResults = this.validateIdentifier(identifier, parseResult, lambdasHierarchy);

            errors.push(...identifierResults.errors);
            annotations.push(...identifierResults.annotations);
        }

        for (const lambda of lambdasHierarchy.values()) {

            if (!this.isIterableCollection(lambda.collectionField)) {

                const error: CollectionNotIterableError = {
                    type: 'collection_not_iterable',
                    message: `Field "${lambda.collectionPath}" is not a collection and cannot be iterated`,
                    identifier: {
                        value: lambda.collectionPath,
                        range: lambda.collectionElement.position
                    }
                };

                errors.push(error);
            }
        }

        return { errors, annotations };
    }

    private validateIdentifier(
        identifier: IdentifierElement,
        parseResult: ConditionExpressionParsingResult,
        lambdasHierarchy: Map<number, LambdaDetails>
    ): { errors: ConditionExpressionValidationError[], annotations: ConditionExpressionValidationAnnotation[] } {
        const context = identifier.identifierContext;
        if (!context) return { errors: [], annotations: [] };

        switch (context.type) {
            case 'normal_identifier':
                return this.validateNormalIdentifier(identifier, parseResult);
            case 'lambda_variable':
                return this.validateLambdaVariable(identifier, parseResult);
            case 'lambda_property_access':
                return this.validateLambdaProperty(identifier, parseResult, lambdasHierarchy);
            default:
                return { errors: [], annotations: [] };
        }
    }


    private validateNormalIdentifier(
        identifier: IdentifierElement,
        parseResult: ConditionExpressionParsingResult
    ): { errors: ConditionExpressionValidationError[], annotations: ConditionExpressionValidationAnnotation[] } {
        const errors: ConditionExpressionValidationError[] = [];
        const annotations: ConditionExpressionValidationAnnotation[] = [];

        const field = this.expressionFieldsMap.get(identifier.value.toLowerCase());

        if (!field) {
            errors.push({
                type: 'field_not_exists',
                message: `Field "${identifier.value}" does not exist`,
                identifier: {
                    value: identifier.value,
                    range: identifier.position
                }
            });
            return { errors, annotations };
        }

        if (field.options.length > 0) {
            const dropdownResults = this.validateDropdownValue(identifier, field.options, parseResult);
            errors.push(...dropdownResults.errors);
            annotations.push(...dropdownResults.annotations);

        }

        return { errors, annotations };
    }

    private validateLambdaVariable(
        identifier: IdentifierElement,
        parseResult: ConditionExpressionParsingResult
    ): { errors: ConditionExpressionValidationError[], annotations: ConditionExpressionValidationAnnotation[] } {

        const errors: ConditionExpressionValidationError[] = [];
        const annotations: ConditionExpressionValidationAnnotation[] = [];

        const context = identifier.identifierContext as LambdaVariableContext;

        if (context.role === 'definition') return { errors, annotations };

        const availableVariables = this.lambdaContextBuilder.getAvailableLambdaVariablesAtCursorPosition(
            identifier.position.start,
            parseResult
        );

        if (!availableVariables.includes(identifier.value.toLowerCase())) {
            errors.push({
                type: 'lambda_variable_not_available',
                message: `Lambda variable "${identifier.value}" is not available in this scope`,
                lambdaVariable: {
                    value: identifier.value,
                    range: identifier.position
                }
            });
        }

        return { errors, annotations };
    }

    private validateLambdaProperty(
        identifier: IdentifierElement,
        parseResult: ConditionExpressionParsingResult,
        lambdasHierarchy: Map<number, LambdaDetails>
    ): { errors: ConditionExpressionValidationError[], annotations: ConditionExpressionValidationAnnotation[] } {

        const errors: ConditionExpressionValidationError[] = [];
        const annotations: ConditionExpressionValidationAnnotation[] = [];

        const context = identifier.identifierContext as LambdaPropertyAccessContext;

        const lambdaVarElement = parseResult.elements.find(el => el.id === context.lambdaVariableElementId) as IdentifierElement;
        if (!lambdaVarElement) return { errors, annotations };

        const definitionLambda = this.findLambdaByVariable(lambdaVarElement.value, lambdasHierarchy);

        if (!definitionLambda) {
            return { errors, annotations };
        }

        const property = definitionLambda.collectionField.properties.find(p => p.name.toLowerCase() === identifier.value.toLowerCase());

        if (!property) {
            errors.push({
                type: 'property_not_in_collection',
                message: `Property "${identifier.value}" is not available in collection "${definitionLambda.collectionPath}"`,
                lambdaVariable: {
                    value: lambdaVarElement.value,
                    range: lambdaVarElement.position
                },
                property: {
                    value: identifier.value,
                    range: identifier.position
                },
                collection: {
                    value: definitionLambda.collectionPath,
                    range: definitionLambda.collectionElement.position
                }
            });
            return { errors, annotations };
        }

        if (property.options.length > 0) {
            const dropdownResults = this.validateDropdownValue(
                identifier,
                property.options,
                parseResult
            );
            errors.push(...dropdownResults.errors);
            annotations.push(...dropdownResults.annotations);
        }

        return { errors, annotations };
    }

    findLambdaByVariable(variableName: string, lambdasHierarchy: Map<number, LambdaDetails>): LambdaDetails | undefined {
        for (const lambda of lambdasHierarchy.values()) {
            if (lambda.variableName === variableName) {
                return lambda;
            }
        }
        return undefined;
    }

    private validateDropdownValue(
        identifier: IdentifierElement,
        dropdownOptions: DropdownOption[],
        parseResult: ConditionExpressionParsingResult
    ): { errors: ConditionExpressionValidationError[], annotations: ConditionExpressionValidationAnnotation[] } {

        const errors: ConditionExpressionValidationError[] = [];
        const annotations: ConditionExpressionValidationAnnotation[] = [];

        const comparison = parseResult.contexts.find(ctx => ctx.type === ContextType.COMPARISON &&
            ctx.elementIds.includes(identifier.id)
        );

        if (!comparison) return { errors, annotations };

        const metadata = comparison.metadata as ComparisonMetadata;

        const isOnLeft = metadata.elementsForLeftOperand.includes(identifier.id);
        const otherSideElementIds = isOnLeft ? metadata.elementsForRightOperand : metadata.elementsForLeftOperand;

        const textLiteral = otherSideElementIds
            .map(id => parseResult.elements.find(el => el.id === id))
            .find(el => el?.type === ElementType.LITERAL_TEXT);

        if (!textLiteral) return { errors, annotations };

        // I remove quotes from string ('item globalid')
        const dropdownValue = textLiteral.value.slice(1, -1);

        const matchingOption = dropdownOptions.find(opt => opt.globalId === dropdownValue);

        
        if (matchingOption) {
            //Case when both values are the same - for example Status suggestions - both values are string
            if (matchingOption.globalId !== matchingOption.value) {
                annotations.push({
                    type: 'dropdown_option',
                    position: textLiteral.position,
                    fieldPath: identifier.value,
                    guid: matchingOption.globalId,
                    displayValue: matchingOption.value
                });
            }
        } else {
            errors.push({
                type: 'dropdown_invalid_value',
                message: `Invalid dropdown value "${dropdownValue}" for field "${identifier.value}"`,
                identifier: {
                    value: identifier.value,
                    range: identifier.position
                },
                invalidValue: {
                    value: dropdownValue,
                    range: textLiteral.position
                }
            });
        }

        return { errors, annotations };
    }

    private buildFieldMap(fields: ExpressionField[]): Map<string, ExpressionField> {
        var expressionFieldsMap = new Map<string, ExpressionField>();
        for (const field of fields) {
            expressionFieldsMap.set(field.uniqueId.toLowerCase(), field);
        }
        return expressionFieldsMap;
    }

    private isIterableCollection(field: ExpressionField): boolean {
        return field.properties.length > 0;
    }

}
