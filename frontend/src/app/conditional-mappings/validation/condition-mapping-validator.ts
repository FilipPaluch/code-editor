import { ConditionExpressionValidationError, ConditionExpressionValidator, ConditionExpressionValidationAnnotation } from '../../conditions/validation/condition-expression-validator';
import { ExpressionField } from '../../expression-fields/expressionField';
import { MappingExpressionValidationError, MappingExpressionValidationAnnotation, MappingExpressionValidator } from '../../mappings/validation/mapping-expression-validator';
import { ConditionalMappingStructureParser } from '../code-structure/conditional-mapping-structure-parser';

export interface ConditionalMappingValidationResult {
    structureErrors: StructureValidationError[];
    conditionErrors: ConditionExpressionValidationError[];
    mappingErrors: MappingExpressionValidationError[];
    conditionExpessionAnnotations: ConditionExpressionValidationAnnotation[];
    mappingExpressionAnnotations: MappingExpressionValidationAnnotation[];
}

export interface StructureValidationError {
    type: 'empty_mapping' | 'missing_if' | 'missing_then' | 'orphaned_then';
    message: string;
    position: { start: number; end: number };
}

export class ConditionalMappingValidator {
    private structureParser = new ConditionalMappingStructureParser();
    private conditionValidator: ConditionExpressionValidator;
    private mappingValidator: MappingExpressionValidator;

    constructor(expressionFields: ExpressionField[]) {
        this.conditionValidator = new ConditionExpressionValidator(expressionFields);
        this.mappingValidator = new MappingExpressionValidator(expressionFields);
    }

    validate(fullText: string): ConditionalMappingValidationResult {
        const result: ConditionalMappingValidationResult = {
            structureErrors: [],
            conditionErrors: [],
            mappingErrors: [],
            conditionExpessionAnnotations: [],
            mappingExpressionAnnotations: []
        };

        const sections = this.structureParser.parse(fullText);

        for (const section of sections) {
            if (section.type === 'condition') {
                if (section.content) {
                    const conditionResult = this.conditionValidator.validate(section.content);

                    const adjustedErrors = this.adjustPositionsForConditionErrors(conditionResult.errors, section.start);
                    result.conditionErrors.push(...adjustedErrors);

                    const adjustedAnnotations = this.adjustPositionsForConditionAnnotations(conditionResult.annotations, section.start);
                    result.conditionExpessionAnnotations.push(...adjustedAnnotations);
                }
            } else if (section.type === 'mapping') {
                if (section.content.trim() === '') {
                    result.structureErrors.push({
                        type: 'empty_mapping',
                        message: 'Mapping section cannot be empty',
                        position: { start: section.start, end: section.end }
                    });
                } else {
                    const mappingResult = this.mappingValidator.validate(section.content);

                    const adjustedErrors = this.adjustPositionsForMappingErrors(mappingResult.errors, section.start);
                    result.mappingErrors.push(...adjustedErrors);

                    const adjustedAnnotations = this.adjustPositionsForMappingAnnotations(mappingResult.annotations, section.start);
                    result.mappingExpressionAnnotations.push(...adjustedAnnotations);
                }
            }
        }

        return result;
    }

    private adjustPositionsForConditionErrors(
        errors: ConditionExpressionValidationError[],
        offset: number
    ): ConditionExpressionValidationError[] {
        return errors.map(error => {
            switch (error.type) {
                case 'parsing_error':
                    return {
                        ...error,
                        position: {
                            start: error.position.start + offset,
                            end: error.position.end + offset
                        }
                    };

                case 'field_not_exists':
                case 'collection_not_iterable':
                    return {
                        ...error,
                        identifier: {
                            ...error.identifier,
                            range: {
                                start: error.identifier.range.start + offset,
                                end: error.identifier.range.end + offset
                            }
                        }
                    };

                case 'property_not_in_collection':
                    return {
                        ...error,
                        lambdaVariable: {
                            ...error.lambdaVariable,
                            range: {
                                start: error.lambdaVariable.range.start + offset,
                                end: error.lambdaVariable.range.end + offset
                            }
                        },
                        property: {
                            ...error.property,
                            range: {
                                start: error.property.range.start + offset,
                                end: error.property.range.end + offset
                            }
                        },
                        collection: {
                            ...error.collection,
                            range: {
                                start: error.collection.range.start + offset,
                                end: error.collection.range.end + offset
                            }
                        }
                    };

                case 'dropdown_invalid_value':
                    return {
                        ...error,
                        identifier: {
                            ...error.identifier,
                            range: {
                                start: error.identifier.range.start + offset,
                                end: error.identifier.range.end + offset
                            }
                        },
                        invalidValue: {
                            ...error.invalidValue,
                            range: {
                                start: error.invalidValue.range.start + offset,
                                end: error.invalidValue.range.end + offset
                            }
                        }
                    };

                case 'lambda_variable_not_available':
                    return {
                        ...error,
                        lambdaVariable: {
                            ...error.lambdaVariable,
                            range: {
                                start: error.lambdaVariable.range.start + offset,
                                end: error.lambdaVariable.range.end + offset
                            }
                        }
                    };
            }
        });
    }

    private adjustPositionsForMappingErrors(
        errors: MappingExpressionValidationError[],
        offset: number
    ): MappingExpressionValidationError[] {
        return errors.map(error => {
            switch (error.type) {
                case 'parsing_error':
                    return {
                        ...error,
                        position: {
                            start: error.position.start + offset,
                            end: error.position.end + offset
                        }
                    };

                case 'field_not_exists':
                case 'field_not_writable':
                    return {
                        ...error,
                        identifier: {
                            ...error.identifier,
                            range: {
                                start: error.identifier.range.start + offset,
                                end: error.identifier.range.end + offset
                            }
                        }
                    };

                case 'dropdown_invalid_value':
                    return {
                        ...error,
                        identifier: {
                            ...error.identifier,
                            range: {
                                start: error.identifier.range.start + offset,
                                end: error.identifier.range.end + offset
                            }
                        },
                        invalidValue: {
                            ...error.invalidValue,
                            range: {
                                start: error.invalidValue.range.start + offset,
                                end: error.invalidValue.range.end + offset
                            }
                        }
                    };
            }
        });
    }

    private adjustPositionsForConditionAnnotations(
        annotations: ConditionExpressionValidationAnnotation[],
        offset: number
    ): ConditionExpressionValidationAnnotation[] {
        return annotations.map(ann => ({
            ...ann,
            position: {
                start: ann.position.start + offset,
                end: ann.position.end + offset
            }
        }));
    }

    private adjustPositionsForMappingAnnotations(
        annotations: MappingExpressionValidationAnnotation[],
        offset: number
    ): MappingExpressionValidationAnnotation[] {
        return annotations.map(ann => ({
            ...ann,
            position: {
                start: ann.position.start + offset,
                end: ann.position.end + offset
            }
        }));
    }
}