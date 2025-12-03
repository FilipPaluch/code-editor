import { ConditionExpressionAnalyzer } from '../../conditions/context/condition-expression-analyzer';
import { ExpressionField } from '../../expression-fields/expressionField';
import { MappingExpressionContextAnalyzer } from '../../mappings/context/mapping-expression-context-analyzer';
import { ConditionalMappingStructureParser } from '../code-structure/conditional-mapping-structure-parser';

export class ConditionalMappingAnalyzer {
  private structureParser = new ConditionalMappingStructureParser();
  private conditionAnalyzer: ConditionExpressionAnalyzer;
  private mappingAnalyzer: MappingExpressionContextAnalyzer;
  
  constructor(expressionFields: ExpressionField[]) {
    this.conditionAnalyzer = new ConditionExpressionAnalyzer(expressionFields);
    this.mappingAnalyzer = new MappingExpressionContextAnalyzer(expressionFields);
  }
  
  analyze(fullText: string, cursorPosition: number) {
    const section = this.structureParser.getSectionAtPosition(fullText, cursorPosition);
    
    if (!section) {
      return {
        type: 'structure',
        suggestions: ['#IF', '#THEN']
      };
    }
    
    if (section.type === 'condition') {
      const relativePosition = cursorPosition - section.start;
      return this.conditionAnalyzer.analyze(section.content, relativePosition);
    } else {
      const relativePosition = cursorPosition - section.start;
      return this.mappingAnalyzer.analyze(section.content, relativePosition);
    }
  }
}