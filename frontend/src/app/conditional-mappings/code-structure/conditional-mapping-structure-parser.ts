export interface ConditionalMappingSection {
   type: 'condition' | 'mapping';
   content: string;
   start: number;
   end: number;
}

export class ConditionalMappingStructureParser {
   private readonly IF_MARKER = '#IF';
   private readonly THEN_MARKER = '#THEN';
   private readonly CARRIAGE_RETURN = '\r';
   private readonly LINE_FEED = '\n';
   
   parse(text: string): ConditionalMappingSection[] {
       const sections: ConditionalMappingSection[] = [];
       let currentPosition = 0;
       
       while (currentPosition < text.length) {
           const conditionBlockStartPosition = this.findNextConditionBlock(text, currentPosition);
           if (conditionBlockStartPosition === -1) break;
           
           const mappingBlockStartPosition = this.findMappingBlockForCondition(text, conditionBlockStartPosition);

           if (mappingBlockStartPosition === -1) {
               currentPosition = conditionBlockStartPosition + this.IF_MARKER.length;
               continue;
           }
           
           const conditionSection = this.extractConditionContent(text, conditionBlockStartPosition, mappingBlockStartPosition);
           const mappingSection = this.extractMappingContent(text, mappingBlockStartPosition);
           
           sections.push(conditionSection);
           sections.push(mappingSection);
           
           currentPosition = this.getNextBlockPosition(text, mappingSection.start);
       }
       
       return sections;
   }
   
   private findNextConditionBlock(text: string, startPosition: number): number {
       return text.indexOf(this.IF_MARKER, startPosition);
   }
   
   private findMappingBlockForCondition(text: string, afterPosition: number): number {
       return text.indexOf(this.THEN_MARKER, afterPosition);
   }
   
   private extractConditionContent(
       text: string, 
       conditionBlockStartPosition: number, 
       mappingBlockStartPosition: number
   ): ConditionalMappingSection {
       const conditionContentStart = this.skipMarkerAndLineEnding(
           text, 
           conditionBlockStartPosition + this.IF_MARKER.length
       );
       
       const rawContent = text.substring(conditionContentStart, mappingBlockStartPosition);
       const conditionContent = this.removeTrailingLineEnding(rawContent);
       
       return {
           type: 'condition',
           content: conditionContent,
           start: conditionContentStart,
           end: conditionContentStart + conditionContent.length
       };
   }
   
   private extractMappingContent(text: string, mappingBlockStartPosition: number): ConditionalMappingSection {
       const mappingContentStart = this.skipMarkerAndLineEnding(
           text, 
           mappingBlockStartPosition + this.THEN_MARKER.length
       );
       
       const nextConditionBlockStartPosition = this.findNextConditionBlock(text, mappingContentStart);
       const rawMappingEnd = nextConditionBlockStartPosition !== -1 ? nextConditionBlockStartPosition - 1 : text.length - 1;
       
       const rawMappingContent = text.substring(mappingContentStart, rawMappingEnd + 1);

       const mappingContent = nextConditionBlockStartPosition !== -1 
           ? this.removeTrailingWhitespace(rawMappingContent)
           : rawMappingContent;
       
       return {
           type: 'mapping',
           content: mappingContent,
           start: mappingContentStart,
           end: mappingContentStart + mappingContent.length
       };
   }
   
   private skipMarkerAndLineEnding(text: string, positionAfterMarker: number): number {
       let position = positionAfterMarker;
       
       if (position < text.length && text[position] === this.CARRIAGE_RETURN) {
           position++;
       }
       if (position < text.length && text[position] === this.LINE_FEED) {
           position++;
       }
       
       return position;
   }
   
   private removeTrailingLineEnding(content: string): string {
       if (content.endsWith(this.CARRIAGE_RETURN + this.LINE_FEED)) {
           return content.slice(0, -2);
       }
       if (content.endsWith(this.LINE_FEED) || content.endsWith(this.CARRIAGE_RETURN)) {
           return content.slice(0, -1);
       }
       return content;
   }
   
   private removeTrailingWhitespace(content: string): string {
       return content.replace(/[\r\n]+$/, '');
   }
   
   private getNextBlockPosition(text: string, afterPosition: number): number {
       const nextBlock = this.findNextConditionBlock(text, afterPosition);
       return nextBlock !== -1 ? nextBlock : text.length;
   }
   
   getSectionAtPosition(text: string, position: number): ConditionalMappingSection | null {
       const sections = this.parse(text);
       return sections.find(section => 
           position >= section.start && position <= section.end
       ) || null;
   }
}