

import { ExpressionField } from '../../expression-fields/expressionField';
import {
    MappingExpressionElementsVisitor,
    MappingContext,
    MappingContextType,
    MappingElementType,
    MappingIdentifierElement,
    MappingExpressionParsingResult,
    MappingParsedElement,
    MappingAssignmentMetadata
} from '../visitors/mapping-expression-elements-visitor';

export interface MappingExpressionContext {
    parseResult: MappingExpressionParsingResult;
    positionContext: MappingPositionContext;
    cursorPosition: number;
    fullText: string;
}

export interface MappingPositionContext {
    contextType: MappingAnalysisContextType;
    availableFields: AvailableField[];
}

export enum MappingAnalysisContextType {
    OUTPUT_IDENTIFIER = 'output_identifier',
    INPUT_IDENTIFIER = 'input_identifier',
    DROPDOWN_VALUE = 'dropdown_value',
    EMPTY_SPACE = 'empty_space'
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
    VARIABLE = 'variable'
}

export class MappingExpressionContextAnalyzer {
    private fieldMap: Map<string, ExpressionField> = new Map();
    private visitor: MappingExpressionElementsVisitor = new MappingExpressionElementsVisitor();
    private declaredVariables: Set<string> = new Set();

    constructor(private expressionFields: ExpressionField[]) {
        this.buildFieldMaps();
    }

    public analyze(fullText: string, cursorPosition: number): MappingExpressionContext {
        const parseResult = this.visitor.parse(fullText);
        this.extractDeclaredVariables(parseResult);
        const positionContext = this.buildPositionContext(cursorPosition, parseResult);

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

    private extractDeclaredVariables(parseResult: MappingExpressionParsingResult): void {

        parseResult.contexts
            .filter(ctx =>
                ctx.type === MappingContextType.ASSIGNMENT
            )
            .forEach(ctx => {
                const metadata = ctx.metadata as MappingAssignmentMetadata;
                const outputElement = parseResult.elements.find(el => el.id === metadata.outputElementId);

                if (outputElement && outputElement.type === MappingElementType.IDENTIFIER) {
                    const identifier = (outputElement as MappingIdentifierElement).value.toLowerCase();

                    if (identifier.startsWith('var.')) {
                        const varName = identifier.substring(4);
                        if (varName) {
                            this.declaredVariables.add(varName);
                        }
                    }
                }
            });
    }
    private buildPositionContext(
        cursorPosition: number,
        parseResult: MappingExpressionParsingResult
    ): MappingPositionContext {

        const dropdownField = this.findDropdownFieldFromAssignmentContext(
            cursorPosition,
            parseResult
        );

        if (dropdownField) {
            return {
                contextType: MappingAnalysisContextType.DROPDOWN_VALUE,
                availableFields: this.buildDropdownOptions(dropdownField)
            };
        }

        const isAfterAssignmentOperator = this.isAfterAssignmentOperator(cursorPosition, parseResult);

        const elementAtCursor = this.findElementAtPosition(cursorPosition, parseResult.elements);

        if (elementAtCursor && elementAtCursor.type === MappingElementType.IDENTIFIER) {
            return {
                contextType: isAfterAssignmentOperator ?
                    MappingAnalysisContextType.INPUT_IDENTIFIER :
                    MappingAnalysisContextType.OUTPUT_IDENTIFIER,
                availableFields: this.buildIdentifierFields(elementAtCursor)
            };
        }

        return {
            contextType: MappingAnalysisContextType.EMPTY_SPACE,
            availableFields: this.buildRootLevelFields()
        };
    }

    private isAfterAssignmentOperator(
        cursorPosition: number,
        parseResult: MappingExpressionParsingResult
    ): boolean {
        const operatorBeforeCursor = parseResult.elements
            .filter(el =>
                el.type === MappingElementType.OPERATOR_ASSIGNMENT &&
                el.position.end < cursorPosition
            )
            .sort((a, b) => b.position.end - a.position.end)[0];

        if (!operatorBeforeCursor) {
            return false;
        }

        const semicolonAfterOperator = parseResult.elements.find(el =>
            el.type === MappingElementType.SEPARATOR_END &&
            el.position.start > operatorBeforeCursor.position.end &&
            el.position.end < cursorPosition
        );

        return !semicolonAfterOperator;
    }

    private findElementAtPosition(
        cursorPosition: number,
        elements: MappingParsedElement[]
    ): MappingParsedElement | null {
        return elements.find(el =>
            cursorPosition >= el.position.start &&
            cursorPosition <= el.position.end + 1
        ) || null;
    }


    private findDropdownFieldFromAssignmentContext(
        cursorPosition: number,
        parseResult: MappingExpressionParsingResult
    ): ExpressionField | null {

        const assignmentContext = parseResult.contexts.find(ctx =>
            (ctx.type === MappingContextType.ASSIGNMENT) &&
            cursorPosition >= ctx.position.start &&
            cursorPosition <= ctx.position.end + 1
        );

        if (!assignmentContext) return null;

        const metadata = assignmentContext.metadata as MappingAssignmentMetadata;
        const operatorElement = parseResult.elements.find(el => el.id === metadata.operatorId);

        if (!operatorElement || cursorPosition <= operatorElement.position.end) {
            return null;
        }

        if (assignmentContext.type === MappingContextType.ASSIGNMENT) {
            const outputElement = parseResult.elements.find(el => el.id === metadata.outputElementId);
            if (outputElement && outputElement.type === MappingElementType.IDENTIFIER) {
                const identifier = (outputElement as MappingIdentifierElement).value.toLowerCase();
                const field = this.fieldMap.get(identifier);
                return (field && field.options.length > 0) ? field : null;
            }
        }

        return null;
    }

    private buildRootLevelFields(): AvailableField[] {
        const containers = this.getTopLevelContainers();

        const varContainer: AvailableField = {
            name: 'var',
            value: 'var',
            fullPath: 'var',
            type: FieldType.CONTAINER,
            insertText: 'var.'
        };

        return [varContainer, ...containers.map(field => ({
            name: field.uniqueId,
            value: field.uniqueId,
            fullPath: field.uniqueId,
            type: FieldType.CONTAINER,
            insertText: `${field.uniqueId}.`
        }))];
    }

    private buildIdentifierFields(elementAtCursor: MappingParsedElement): AvailableField[] {
        if (elementAtCursor.type !== MappingElementType.IDENTIFIER) {
            return this.buildRootLevelFields();
        }

        const identifierValue = elementAtCursor.value.toLowerCase();

        if (identifierValue === 'var.' || identifierValue === 'var') {
            return this.buildVariableFields();
        }

        if (identifierValue.endsWith('.')) {
            const valueWithoutDot = identifierValue.slice(0, -1);

            return this.buildChildFields(valueWithoutDot);
        }

        const parentPath = this.extractParentPath(identifierValue);
        if (parentPath) {
            if (parentPath === 'var') {
                return this.buildVariableFields();
            }

            const parentField = this.fieldMap.get(parentPath);
            if (parentField) {
                return this.buildChildFields(parentPath);
            }
        }

        return this.buildRootLevelFields();
    }

    private buildVariableFields(): AvailableField[] {
        return Array.from(this.declaredVariables).map(varName => ({
            name: varName,
            value: varName,
            fullPath: `var.${varName}`,
            type: FieldType.VARIABLE,
            insertText: varName
        }));
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
                        canHaveFiles: false,
                        isWritable: false
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
                        canHaveFiles: false,
                        isWritable: false
                    });
                }
            }
        });

        return Array.from(directChildren.values());
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

    private hasChildFields(field: ExpressionField): boolean {
        return this.expressionFields.some(otherField =>
            otherField.uniqueId.startsWith(field.uniqueId + '.') &&
            otherField.uniqueId !== field.uniqueId
        );
    }

    private shouldAppendDot(fieldType: FieldType): boolean {
        return fieldType === FieldType.CONTAINER ||
            fieldType === FieldType.FORM ||
            fieldType === FieldType.SUBFORM;
    }
}