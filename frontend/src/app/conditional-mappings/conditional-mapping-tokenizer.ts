import { MonacoConditionGrammarTokenizer } from '../conditions/suggestions/monaco-condition-grammar-tokenizer';
import { MonacoMappingGrammarTokenizer } from '../mappings/suggestions/monaco-mapping-grammar-tokenizer';
import { ConditionalMappingStructureParser, ConditionalMappingSection } from './code-structure/conditional-mapping-structure-parser';
import * as monaco from 'monaco-editor';

export interface SectionInfo {
    type: 'keyword' | 'condition' | 'mapping';
    startLine: number;
    endLine: number;
}

export class ConditionalMappingState implements monaco.languages.IState {
    constructor(
        public lineNumber: number = 0,
        public sections: SectionInfo[] = [],
        public documentText: string = ''
    ) {}

    clone(): ConditionalMappingState {
        return new ConditionalMappingState(
            this.lineNumber,
            [...this.sections], 
            this.documentText
        );
    }

    equals(other: monaco.languages.IState): boolean {
        if (!(other instanceof ConditionalMappingState)) {
            return false;
        }
        
        return this.lineNumber === other.lineNumber &&
               this.documentText === other.documentText;
    }
}

export class ConditionalMappingTokenizer {
    private readonly structureParser = new ConditionalMappingStructureParser();
    private readonly IF_KEYWORD = '#IF';
    private readonly THEN_KEYWORD = '#THEN';
    private readonly CARRIAGE_RETURN = '\r';
    private readonly LINE_FEED = '\n';
    
    getInitialState(): ConditionalMappingState {
        return new ConditionalMappingState();
    }
    
    updateDocumentStructure(documentText: string): SectionInfo[] {
        const parsedSections = this.structureParser.parse(documentText);
        const lines = this.splitDocumentIntoLines(documentText);
        
        return this.buildSectionInfoFromLines(lines, parsedSections, documentText);
    }
    
    tokenizeLine(line: string, state: ConditionalMappingState): monaco.languages.ILineTokens {
        const currentSection = this.findSectionForLine(state.lineNumber, state.sections);
        
        if (!currentSection) {
            return this.createEmptyTokenResult(state);
        }
        
        const tokens = this.tokenizeSectionLine(line, currentSection.type);
        
        return {
            tokens,
            endState: this.createNextState(state)
        };
    }
    
    private splitDocumentIntoLines(documentText: string): string[] {
        return documentText.split(/\r?\n/);
    }
    
    private buildSectionInfoFromLines(
        lines: string[], 
        parsedSections: ConditionalMappingSection[], 
        documentText: string
    ): SectionInfo[] {
        const sectionInfos: SectionInfo[] = [];
        let currentTextPosition = 0;
        
        lines.forEach((line, lineIndex) => {
            const sectionInfo = this.determineSectionForLine(
                line, 
                lineIndex, 
                currentTextPosition, 
                parsedSections
            );
            
            if (sectionInfo) {
                this.addOrExtendSection(sectionInfos, sectionInfo, lineIndex);
            }
            
            currentTextPosition = this.updateTextPosition(
                currentTextPosition, 
                line.length, 
                documentText, 
                lineIndex, 
                lines.length
            );
        });
        
        return sectionInfos;
    }
    
    private determineSectionForLine(
        line: string, 
        lineIndex: number,
        currentTextPosition: number,
        parsedSections: ConditionalMappingSection[]
    ): { type: SectionInfo['type'] } | null {
        const trimmedLine = line.trim();
        
        if (this.isKeywordLine(trimmedLine)) {
            return { type: 'keyword' };
        }
        
        const section = this.findParsedSectionAtPosition(parsedSections, currentTextPosition);
        return section ? { type: section.type } : null;
    }
    
    private isKeywordLine(trimmedLine: string): boolean {
        return trimmedLine === this.IF_KEYWORD || trimmedLine === this.THEN_KEYWORD;
    }
    
    private findParsedSectionAtPosition(
        sections: ConditionalMappingSection[], 
        position: number
    ): ConditionalMappingSection | undefined {
        return sections.find(section => 
            position >= section.start && position <= section.end
        );
    }
    
    private addOrExtendSection(
        sectionInfos: SectionInfo[], 
        newSection: { type: SectionInfo['type'] }, 
        lineIndex: number
    ): void {
        const lastSection = sectionInfos[sectionInfos.length - 1];
        
        if (this.shouldExtendLastSection(lastSection, newSection, lineIndex)) {
            lastSection.endLine = lineIndex;
        } else {
            sectionInfos.push({
                type: newSection.type,
                startLine: lineIndex,
                endLine: lineIndex
            });
        }
    }
    
    private shouldExtendLastSection(
        lastSection: SectionInfo | undefined,
        newSection: { type: SectionInfo['type'] },
        currentLineIndex: number
    ): lastSection is SectionInfo {
        return Boolean(
            lastSection && 
            lastSection.type === newSection.type && 
            lastSection.endLine === currentLineIndex - 1
        );
    }
    
    private updateTextPosition(
        currentPosition: number,
        lineLength: number,
        documentText: string,
        lineIndex: number,
        totalLines: number
    ): number {
        let newPosition = currentPosition + lineLength;
        
        if (lineIndex < totalLines - 1) {
            newPosition += this.getLineEndingLength(documentText, newPosition);
        }
        
        return newPosition;
    }
    
    private getLineEndingLength(text: string, position: number): number {
        if (position >= text.length) return 0;
        
        if (this.hasCarriageReturnLineFeed(text, position)) return 2;
        if (this.hasSingleLineEnding(text, position)) return 1;
        
        return 0;
    }
    
    private hasCarriageReturnLineFeed(text: string, position: number): boolean {
        return text[position] === this.CARRIAGE_RETURN && 
               text[position + 1] === this.LINE_FEED;
    }
    
    private hasSingleLineEnding(text: string, position: number): boolean {
        return text[position] === this.LINE_FEED || 
               text[position] === this.CARRIAGE_RETURN;
    }
    
    private findSectionForLine(lineNumber: number, sections: SectionInfo[]): SectionInfo | undefined {
        return sections.find(section => 
            lineNumber >= section.startLine && lineNumber <= section.endLine
        );
    }
    
    private createEmptyTokenResult(state: ConditionalMappingState): monaco.languages.ILineTokens {
        return {
            tokens: [],
            endState: this.createNextState(state)
        };
    }
    
    private tokenizeSectionLine(line: string, sectionType: SectionInfo['type']): Array<{ startIndex: number; scopes: string }> {
        switch (sectionType) {
            case 'keyword':
                return this.tokenizeKeywordLine(line);
            case 'condition':
                return this.tokenizeConditionLine(line);
            case 'mapping':
                return this.tokenizeMappingLine(line);
            default:
                return [];
        }
    }
    
    private tokenizeKeywordLine(line: string): Array<{ startIndex: number; scopes: string }> {
        const trimmedLine = line.trim();
        
        if (!this.isKeywordLine(trimmedLine)) {
            return [];
        }
        
        const keywordStartIndex = line.indexOf(trimmedLine);
        return [{
            startIndex: keywordStartIndex,
            scopes: 'keyword.control.conditional-mapping'
        }];
    }
    
    private tokenizeConditionLine(line: string): Array<{ startIndex: number; scopes: string }> {
        const result = MonacoConditionGrammarTokenizer.tokenizeMonacoLine(line);
        return result.tokens;
    }
    
    private tokenizeMappingLine(line: string): Array<{ startIndex: number; scopes: string }> {
        const result = MonacoMappingGrammarTokenizer.tokenizeMonacoLine(line);
        return result.tokens;
    }
    
    private createNextState(currentState: ConditionalMappingState): ConditionalMappingState {
        return new ConditionalMappingState(
            currentState.lineNumber + 1,
            currentState.sections,
            currentState.documentText
        );
    }
}