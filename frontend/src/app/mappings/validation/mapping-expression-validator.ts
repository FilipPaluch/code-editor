import { DropdownOption, ExpressionField } from '../../expression-fields/expressionField';
import { 
    MappingElementType, 
    MappingExpressionElementsVisitor, 
    MappingExpressionParsingResult, 
    MappingIdentifierElement,
    MappingContext,
    MappingContextType,
    MappingAssignmentMetadata,
    MappingParsedElement,
    MappingLiteralElement
} from '../visitors/mapping-expression-elements-visitor';

export type MappingExpressionValidationError =
    | ParsingError
    | FieldNotExistsError
    | FieldNotWritableError
    | DropdownInvalidValueError;

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

export interface FieldNotWritableError {
    type: 'field_not_writable';
    message: string;
    identifier: {
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

export type MappingExpressionValidationAnnotation = DropdownOptionAnnotation;

export interface MappingExpressionValidationErrorResult {
    errors: MappingExpressionValidationError[];
    annotations: MappingExpressionValidationAnnotation[];
}

export class MappingExpressionValidator {
    private expressionFieldsMap = new Map<string, ExpressionField>();
    private visitor: MappingExpressionElementsVisitor = new MappingExpressionElementsVisitor();

    constructor(fields: ExpressionField[]) {
        this.expressionFieldsMap = this.buildFieldMap(fields);
    }

    public validate(fullText: string): MappingExpressionValidationErrorResult {
        const parseResult = this.visitor.parse(fullText);
        const errors: MappingExpressionValidationError[] = [];
        const annotations: MappingExpressionValidationAnnotation[] = [];

        if (!parseResult.isValid) {
            parseResult.diagnostics.forEach(diagnostic => {
                errors.push({
                    type: 'parsing_error',
                    message: diagnostic.message,
                    position: diagnostic.position
                });
            });
        }

        const identifiers = parseResult.elements
            .filter(el => el.type === MappingElementType.IDENTIFIER)
            .map(el => el as MappingIdentifierElement);

        for (const identifier of identifiers) {
            const identifierResults = this.validateIdentifier(identifier, parseResult);
            errors.push(...identifierResults.errors);
            annotations.push(...identifierResults.annotations);
        }

        return { errors, annotations };
    }

    private validateIdentifier(
        identifier: MappingIdentifierElement,
        parseResult: MappingExpressionParsingResult
    ): { errors: MappingExpressionValidationError[], annotations: MappingExpressionValidationAnnotation[] } {
        const errors: MappingExpressionValidationError[] = [];
        const annotations: MappingExpressionValidationAnnotation[] = [];

        const context = identifier.identifierContext;
        if (!context) return { errors, annotations };

        if(identifier.value.startsWith('var.'))
            return { errors, annotations }; 

        switch (context.type) {
            case 'output_field':
                return this.validateOutputField(identifier, parseResult);
            case 'input_field':
                return this.validateInputField(identifier, parseResult);
            default:
                return { errors, annotations };
        }
    }

    private validateOutputField(
        identifier: MappingIdentifierElement,
        parseResult: MappingExpressionParsingResult
    ): { errors: MappingExpressionValidationError[], annotations: MappingExpressionValidationAnnotation[] } {
        const errors: MappingExpressionValidationError[] = [];
        const annotations: MappingExpressionValidationAnnotation[] = [];

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

        if (!field.isWritable) {
            errors.push({
                type: 'field_not_writable',
                message: `Field "${identifier.value}" is read-only and cannot be assigned a value`,
                identifier: {
                    value: identifier.value,
                    range: identifier.position
                }
            });
        }

        
        if (field.options.length > 0) {
            const dropdownResults = this.validateDropdownValue(identifier, field.options, parseResult);
            errors.push(...dropdownResults.errors);
            annotations.push(...dropdownResults.annotations);
        }


        return { errors, annotations };
    }

    private validateInputField(
        identifier: MappingIdentifierElement,
        parseResult: MappingExpressionParsingResult
    ): { errors: MappingExpressionValidationError[], annotations: MappingExpressionValidationAnnotation[] } {
        const errors: MappingExpressionValidationError[] = [];
        const annotations: MappingExpressionValidationAnnotation[] = [];


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

        return { errors, annotations };
    }
    
    private validateDropdownValue(
        identifier: MappingIdentifierElement,
        dropdownOptions: DropdownOption[],
        parseResult: MappingExpressionParsingResult
    ): { errors: MappingExpressionValidationError[], annotations: MappingExpressionValidationAnnotation[] } {
        const errors: MappingExpressionValidationError[] = [];
        const annotations: MappingExpressionValidationAnnotation[] = [];

        const assignmentContext = parseResult.contexts.find(ctx => {
            if (ctx.type === MappingContextType.ASSIGNMENT) {
                return ctx.elementIds.includes(identifier.id);
            }
            return false;
        });

        if (!assignmentContext) return { errors, annotations };

        const metadata = assignmentContext.metadata as MappingAssignmentMetadata;
        
        let valueElement: MappingParsedElement | undefined;
        
        if (assignmentContext.type === MappingContextType.ASSIGNMENT) {
            const operatorElement = parseResult.elements.find(el => el.id === metadata.operatorId);
            if (operatorElement) {
                valueElement = parseResult.elements.find(el => 
                    el.type === MappingElementType.LITERAL_TEXT &&
                    el.position.start > operatorElement.position.end
                );
            }
        } else {
            valueElement = metadata.inputElementIds
                .map(id => parseResult.elements.find(el => el.id === id))
                .find(el => el?.type === MappingElementType.LITERAL_TEXT);
        }

        if (!valueElement || valueElement.type !== MappingElementType.LITERAL_TEXT) {
            return { errors, annotations };
        }

        const dropdownValue = valueElement.value.slice(1, -1);

        const matchingOption = dropdownOptions.find(opt => opt.globalId === dropdownValue);

        if (matchingOption) {
            //Case when both values are the same - for example Status suggestions - both values are string
            if (matchingOption.globalId !== matchingOption.value) {
                annotations.push({
                    type: 'dropdown_option',
                    position: valueElement.position,
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
                    range: valueElement.position
                }
            });
        }

        return { errors, annotations };
    }

    private buildFieldMap(fields: ExpressionField[]): Map<string, ExpressionField> {
        const expressionFieldsMap = new Map<string, ExpressionField>();
        for (const field of fields) {
            expressionFieldsMap.set(field.uniqueId.toLowerCase(), field);
        }
        return expressionFieldsMap;
    }
}