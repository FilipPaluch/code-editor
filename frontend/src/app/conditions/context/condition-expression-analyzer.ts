import { ExpressionField, Property } from '../../expression-fields/expressionField';
import { LambdaContextBuilder, LambdaDetails } from './lambda-context-builder';
import {
    ConditionExpressionElementsVisitor,
    Context,
    ContextType,
    ElementType,
    IdentifierElement,
    LambdaMetadata,
    ComparisonMetadata,
    BinaryMetadata,
    ConditionExpressionParsingResult,
    ParsedElement,
    SeparatorElement
} from '../visitors/condition-expression-elements-visitor';

export interface ConditionExpressionContext {
    parseResult: ConditionExpressionParsingResult;
    positionContext: PositionContext;
    cursorPosition: number;
    fullText: string;
}

export interface PositionContext {
    contextType: AnalysisContextType;
    availableFields: AvailableField[];
}

export enum AnalysisContextType {
    IDENTIFIER = 'identifier',
    LAMBDA_IDENTIFIER = 'lambda_identifier',
    DROPDOWN = 'dropdown',
    EMPTY_SPACE = 'empty_space',
    LAMBDA_EMPTY_SPACE = 'lambda_empty_space'
}

export interface AvailableField {
    name: string;
    value: string;
    fullPath: string;
    type: FieldType;
    insertText: string;
    description?: string;
}

export enum FieldType {
    CONTAINER = 'container',
    FORM = 'form',
    SUBFORM = 'subform',
    FIELD = 'field',
    DROPDOWN = 'dropdown',
    COLLECTION = 'collection',
    DROPDOWN_OPTION = 'dropdown_option',
    LAMBDA_VARIABLE = 'lambda_variable'
}

export interface LambdaScope {
    variable: string;
    collectionFieldPath: string;
    collectionField: ExpressionField;
    level: number;
}


export class ConditionExpressionAnalyzer {
    private fieldMap: Map<string, ExpressionField> = new Map();
    private visitor: ConditionExpressionElementsVisitor = new ConditionExpressionElementsVisitor();
    private lambdaContextBuilder: LambdaContextBuilder;

    constructor(private expressionFields: ExpressionField[]) {
        this.buildFieldMaps();
        this.lambdaContextBuilder = new LambdaContextBuilder(this.fieldMap);
    }

    public analyze(fullText: string, cursorPosition: number): ConditionExpressionContext {
        const parseResult = this.visitor.parse(fullText);
        const positionContext = this.buildPositionContext(fullText, cursorPosition, parseResult);

        return {
            parseResult,
            positionContext,
            cursorPosition,
            fullText
        };
    }

    private buildFieldMaps(): void {
        for (const field of this.expressionFields) {
            this.fieldMap.set(field.uniqueId, field);
        }
    }

    private buildPositionContext(
        fullText: string,
        cursorPosition: number,
        parseResult: ConditionExpressionParsingResult
    ): PositionContext {
        const elementAtCursor = this.findElementAtPosition(cursorPosition, parseResult.elements);

        return this.analyzePositionAndBuildFields(
            cursorPosition,
            elementAtCursor,
            parseResult
        );
    }

    private analyzePositionAndBuildFields(
        cursorPosition: number,
        elementAtCursor: ParsedElement | null,
        parseResult: ConditionExpressionParsingResult
    ): PositionContext {
        const lambdaStack = this.lambdaContextBuilder.buildLambdaStackForCursorPosition(cursorPosition, parseResult);

        const isInLambda = lambdaStack.length > 0;

        const dropdownField = this.findDropdownFieldFromComparisonContext(
            cursorPosition,
            parseResult,
            lambdaStack
        );

        if (dropdownField) {
            return {
                contextType: AnalysisContextType.DROPDOWN,
                availableFields: this.buildDropdownOptions(dropdownField)
            };
        }

        if (elementAtCursor) {
            if (elementAtCursor.type === ElementType.SEPARATOR_COLON && isInLambda) {
                return {
                    contextType: AnalysisContextType.LAMBDA_IDENTIFIER,
                    availableFields: this.buildFieldsForLambdaColon(elementAtCursor, lambdaStack, parseResult)
                };
            }

            if (elementAtCursor.type === ElementType.IDENTIFIER) {
                const identifierContext = (elementAtCursor as IdentifierElement).identifierContext;

                if (isInLambda && (identifierContext?.type === 'lambda_variable' ||
                    identifierContext?.type === 'lambda_property_access')) {
                    return {
                        contextType: AnalysisContextType.LAMBDA_IDENTIFIER,
                        availableFields: this.buildFieldsForLambdaIdentifier(elementAtCursor, lambdaStack, parseResult)
                    };
                }

                return {
                    contextType: AnalysisContextType.IDENTIFIER,
                    availableFields: this.buildIdentifierFields(elementAtCursor, parseResult)
                };
            }
        }
        if (isInLambda) {
            return {
                contextType: AnalysisContextType.LAMBDA_EMPTY_SPACE,
                availableFields: this.buildFieldsForLambdaEmptySpace(lambdaStack)
            };
        }

        return {
            contextType: AnalysisContextType.EMPTY_SPACE,
            availableFields: this.buildRootLevelFields()
        };
    }

    private findElementAtPosition(
        cursorPosition: number,
        elements: ParsedElement[]
    ): ParsedElement | null {
        return elements.find(el =>
            cursorPosition >= el.position.start &&
            cursorPosition <= el.position.end + 1
        ) || null;
    }


    private buildRootLevelFields(): AvailableField[] {
        return this.getTopLevelContainers().map(field => ({
            name: field.uniqueId,
            value: field.uniqueId,
            fullPath: field.uniqueId,
            type: FieldType.CONTAINER,
            insertText: `${field.uniqueId}.`
        }));
    }

    private buildIdentifierFields(
        elementAtCursor: ParsedElement | null,
        parseResult: ConditionExpressionParsingResult
    ): AvailableField[] {
        if (!elementAtCursor || elementAtCursor.type !== ElementType.IDENTIFIER) {
            return this.buildRootLevelFields();
        }

        const identifierValue = elementAtCursor.value;

        const valueWithoutTrailingDot = identifierValue.endsWith('.')
            ? identifierValue.slice(0, -1)
            : identifierValue;

        if (identifierValue.endsWith('.')) {
            return this.buildChildFields(valueWithoutTrailingDot);
        }

        const parentPath = this.extractParentPath(valueWithoutTrailingDot);
        if (parentPath) {
            const parentField = this.fieldMap.get(parentPath);
            if (parentField) {
                return this.buildChildFields(parentPath);
            }
        }

        return this.buildRootLevelFields();
    }

    private buildDropdownOptions(dropdownField: ExpressionField): AvailableField[] {
        return dropdownField.options.map(option => ({
            name: option.value,
            value: option.globalId,
            fullPath: dropdownField.uniqueId,
            type: FieldType.DROPDOWN_OPTION,
            insertText: `'${option.globalId}'`,
            description: option.value
        }));
    }

    private buildFieldsForLambdaEmptySpace(lambdaStack: LambdaDetails[]): AvailableField[] {
        const lambdaVariables = lambdaStack.map(lambda => ({
            name: lambda.variableName,
            value: lambda.variableName,
            fullPath: lambda.variableName,
            type: FieldType.LAMBDA_VARIABLE,
            insertText: `${lambda.variableName}:`,
            description: `Lambda variable from ${lambda.collectionPath} collection`
        }));

        const rootFields = this.buildRootLevelFields();

        return [...lambdaVariables, ...rootFields];
    }

    private buildFieldsForLambdaColon(
        colonElement: ParsedElement,
        lambdaStack: LambdaDetails[],
        parseResult: ConditionExpressionParsingResult
    ): AvailableField[] {
        const separatorElement = colonElement as SeparatorElement;
        if (!separatorElement.lambdaVariableElementId) return [];

        const lambdaDetails = this.findLambdaDetailsForVariableElement(
            separatorElement.lambdaVariableElementId,
            lambdaStack,
            parseResult
        );

        if (!lambdaDetails) return [];

        return this.buildCollectionPropertiesAsFields(
            lambdaDetails.collectionField,
            null
        );
    }

    private buildFieldsForLambdaIdentifier(
        identifierElement: ParsedElement,
        lambdaStack: LambdaDetails[],
        parseResult: ConditionExpressionParsingResult
    ): AvailableField[] {
        const identifier = identifierElement as IdentifierElement;
        const context = identifier.identifierContext;

        if (context?.type !== 'lambda_property_access') return [];

        const lambdaDetails = this.findLambdaDetailsForVariableElement(
            context.lambdaVariableElementId,
            lambdaStack,
            parseResult
        );

        if (!lambdaDetails) return [];

        const propertyPath = this.extractPropertyPath(identifier.value.toLowerCase());
        return this.buildCollectionPropertiesAsFields(
            lambdaDetails.collectionField,
            propertyPath
        );
    }

    private buildChildFields(parentPath: string): AvailableField[] {
        const directChildren = this.getDirectChildrenOfField(parentPath);

        return directChildren.map(childField => {
            const childName = this.extractFieldName(childField.uniqueId, parentPath);
            const fieldType = this.determineFieldType(childField);

            return {
                name: childName,
                value: childName,
                fullPath: childField.uniqueId,
                type: fieldType,
                insertText: this.shouldAppendDot(fieldType) ? `${childName}.` : childName
            };
        });
    }

    private buildCollectionPropertiesAsFields(
        collectionField: ExpressionField,
        parentPropertyPath: string | null
    ): AvailableField[] {
        const properties = parentPropertyPath
            ? this.getDirectChildProperties(collectionField.properties, parentPropertyPath)
            : this.getTopLevelProperties(collectionField.properties);

        return properties.map(property => {
            const propertyName = parentPropertyPath
                ? property.name.substring(parentPropertyPath.length + 1)
                : property.name;

            const propertyType = this.determinePropertyType(property, collectionField);

            return {
                name: propertyName,
                value: propertyName,
                fullPath: property.name,
                type: propertyType,
                insertText: this.shouldAppendDot(propertyType) ? `${propertyName}.` : propertyName
            };
        });
    }


    private findDropdownFieldFromComparisonContext(
        cursorPosition: number,
        parseResult: ConditionExpressionParsingResult,
        lambdaStack: LambdaDetails[] = []
    ): ExpressionField | null {

        const comparisonContext = this.findComparisonContextAtPosition(cursorPosition, parseResult.contexts);

        if (!comparisonContext) return null;

        const comparisonMetadata = comparisonContext.metadata as ComparisonMetadata;

        const otherSideIdentifier = this.findIdentifierOnOtherSideOfComparison(
            cursorPosition,
            comparisonMetadata,
            parseResult
        );
        if (!otherSideIdentifier) return null;

        return this.resolveDropdownFieldFromIdentifier(
            otherSideIdentifier,
            parseResult,
            lambdaStack
        );
    }

    private findComparisonContextAtPosition(
        cursorPosition: number,
        contexts: Context[]
    ): Context | null {
        return contexts.find(ctx =>
            ctx.type === ContextType.COMPARISON &&
            cursorPosition >= ctx.position.start &&
            (ctx.position.end === undefined || cursorPosition <= ctx.position.end + 1)
        ) || null;
    }

    private findIdentifierOnOtherSideOfComparison(
        cursorPosition: number,
        comparisonContextMetadata: ComparisonMetadata,
        parseResult: ConditionExpressionParsingResult
    ): IdentifierElement | null {

        const operatorElement = parseResult.elements.find(el => el.id === comparisonContextMetadata.operatorId);
        if (!operatorElement) return null;

        const isOnRightSide = cursorPosition > operatorElement.position.end;

        const otherSideElementIds = isOnRightSide
            ? comparisonContextMetadata.elementsForLeftOperand
            : comparisonContextMetadata.elementsForRightOperand;

        const identifiers = otherSideElementIds
            .map(id => parseResult.elements.find(el => el.id === id))
            .filter(el => el?.type === ElementType.IDENTIFIER) as IdentifierElement[];

        const lambdaPropertyAccess = identifiers.find(el =>
            el.identifierContext?.type === 'lambda_property_access'
        );

        if (lambdaPropertyAccess) {
            return lambdaPropertyAccess;
        }

        return identifiers.find(el =>
            el.identifierContext?.type === 'normal_identifier' || !el.identifierContext
        ) || null;
    }

    private resolveDropdownFieldFromIdentifier(
        identifierElement: IdentifierElement,
        parseResult: ConditionExpressionParsingResult,
        lambdaStack: LambdaDetails[]
    ): ExpressionField | null {
        const context = identifierElement.identifierContext;

        if (context?.type === 'lambda_property_access') {
            return this.resolveDropdownFieldFromLambdaProperty(
                identifierElement,
                context,
                parseResult,
                lambdaStack
            );
        }

        const field = this.fieldMap.get(identifierElement.value.toLowerCase());
        return (field && field.options.length > 0) ? field : null;
    }

    private resolveDropdownFieldFromLambdaProperty(
        identifierElement: IdentifierElement,
        context: any,
        parseResult: ConditionExpressionParsingResult,
        lambdaStack: LambdaDetails[]
    ): ExpressionField | null {
        const lambdaDetails = this.findLambdaDetailsForVariableElement(
            context.lambdaVariableElementId,
            lambdaStack,
            parseResult
        );

        if (!lambdaDetails) return null;

        const property = lambdaDetails.collectionField.properties.find(
            prop => prop.name.toLowerCase() === identifierElement.value.toLowerCase()
        );

        if (property && property.options.length > 0) {
            return {
                uniqueId: identifierElement.value,
                options: property.options,
                properties: [],
                canHaveFiles: false
            };
        }

        return null;
    }

    private findLambdaDetailsForVariableElement(
        variableElementId: number,
        lambdaStack: LambdaDetails[],
        parseResult: ConditionExpressionParsingResult
    ): LambdaDetails | null {
        const variableElement = parseResult.elements.find(
            el => el.id === variableElementId
        ) as IdentifierElement;

        if (!variableElement) return null;

        return lambdaStack.find(lambda =>
            lambda.variableName === variableElement.value
        ) || null;
    }

    private getTopLevelContainers(): ExpressionField[] {
        const topLevelContainers = new Map<string, ExpressionField>();

        for (const field of this.expressionFields) {
            const firstDotIndex = field.uniqueId.indexOf('.');
            if (firstDotIndex !== -1) {
                const containerName = field.uniqueId.substring(0, firstDotIndex);

                if (!topLevelContainers.has(containerName)) {
                    topLevelContainers.set(containerName, {
                        uniqueId: containerName,
                        options: [],
                        properties: [],
                        canHaveFiles: false
                    });
                }
            }
        }

        return Array.from(topLevelContainers.values());
    }
    private getDirectChildrenOfField(parentPath: string): ExpressionField[] {
        const directChildren = new Map<string, ExpressionField>();

        this.expressionFields.forEach(field => {
            if (field.uniqueId === parentPath) return;

            if (!field.uniqueId.startsWith(parentPath + '.')) return;

            const remainingPath = field.uniqueId.substring(parentPath.length + 1);

            const firstDotIndex = remainingPath.indexOf('.');
            const childName = firstDotIndex === -1 ? remainingPath : remainingPath.substring(0, firstDotIndex);
            const childFullPath = `${parentPath}.${childName}`;

            if (!directChildren.has(childName)) {
                const existingField = this.fieldMap.get(childFullPath);

                if (existingField) {
                    directChildren.set(childName, existingField);
                } else {
                    directChildren.set(childName, {
                        uniqueId: childFullPath,
                        options: [],
                        properties: [],
                        canHaveFiles: false
                    });
                }
            }
        });

        return Array.from(directChildren.values());
    }

    private getTopLevelProperties(properties: Property[]): Property[] {
        const topLevelProps = new Map<string, Property>();

        properties.forEach(property => {
            const firstDotIndex = property.name.indexOf('.');

            if (firstDotIndex === -1) {
                topLevelProps.set(property.name, property);
            } else {
                const formName = property.name.substring(0, firstDotIndex);

                if (!topLevelProps.has(formName)) {
                    topLevelProps.set(formName, {
                        name: formName,
                        options: []
                    });
                }
            }
        });

        return Array.from(topLevelProps.values());
    }

    private getDirectChildProperties(properties: Property[], parentPropertyPath: string): Property[] {
        return properties.filter(property => {
            if (!property.name.startsWith(parentPropertyPath + '.')) return false;

            const remainingPath = property.name.substring(parentPropertyPath.length + 1);
            return !remainingPath.includes('.');
        });
    }

    private extractFieldName(fullPath: string, parentPath: string): string {
        return fullPath.substring(parentPath.length + 1).toLowerCase();
    }

    private extractParentPath(identifierValue: string): string | null {
        const lastDotIndex = identifierValue.lastIndexOf('.');
        if (lastDotIndex === -1 || lastDotIndex === identifierValue.length - 1) {
            return null;
        }
        return identifierValue.substring(0, lastDotIndex).toLowerCase();
    }

    private extractPropertyPath(propertyValue: string): string | null {

        if (propertyValue.endsWith('.')) {
            return propertyValue.slice(0, -1);
        }

        const lastDotIndex = propertyValue.lastIndexOf('.');
        if (lastDotIndex === -1 || lastDotIndex === propertyValue.length - 1) {
            return null;
        }
        return propertyValue.substring(0, lastDotIndex);
    }

    private determineFieldType(field: ExpressionField): FieldType {
        if (field.properties.length > 0) {
            return FieldType.COLLECTION;
        }

        if (field.options.length > 0) {
            return FieldType.DROPDOWN;
        }

        if (this.hasChildFields(field)) {
            const depth = field.uniqueId.split('.').length;
            if (depth === 1) return FieldType.CONTAINER;
            if (depth === 2) return FieldType.FORM;
            return FieldType.SUBFORM;
        }

        return FieldType.FIELD;
    }

    private determinePropertyType(property: Property, collectionField: ExpressionField): FieldType {
        if (property.options.length > 0) {
            return FieldType.DROPDOWN;
        }

        const propertyDepth = property.name.split('.').length;
        const hasNestedProperties = this.propertyHasChildren(property.name, collectionField.properties);

        if (hasNestedProperties) {
            return propertyDepth === 1 ? FieldType.FORM : FieldType.SUBFORM;
        }

        return FieldType.FIELD;
    }

    private hasChildFields(field: ExpressionField): boolean {
        return this.expressionFields.some(otherField =>
            otherField.uniqueId.startsWith(field.uniqueId + '.') &&
            otherField.uniqueId !== field.uniqueId
        );
    }

    private propertyHasChildren(propertyName: string, allProperties: Property[]): boolean {
        return allProperties.some(prop =>
            prop.name.startsWith(propertyName + '.') &&
            prop.name !== propertyName
        );
    }

    private shouldAppendDot(fieldType: FieldType): boolean {
        return fieldType === FieldType.CONTAINER ||
            fieldType === FieldType.FORM ||
            fieldType === FieldType.SUBFORM;
    }
}

