import { describe, it, expect } from 'vitest';
import { ConditionalMappingStructureParser } from './conditional-mapping-structure-parser';

describe('ConditionalMappingStructureParser', () => {
    let parser: ConditionalMappingStructureParser;

    beforeEach(() => {
        parser = new ConditionalMappingStructureParser();
    });

    describe('parse', () => {
        it('should parse simple IF-THEN block', () => {
            const text = `#IF
task.status = 'active'
#THEN
process.field := 'value'`;

            const sections = parser.parse(text);

            expect(sections).toEqual([
                {
                    type: 'condition',
                    content: 'task.status = \'active\'',
                    start: 4,
                    end: 26
                },
                {
                    type: 'mapping',
                    content: 'process.field := \'value\'',
                    start: 33,
                    end: 57
                }
            ]);
        });

        it('should parse empty condition', () => {
            const text = `#IF
#THEN
process.field := 'value'`;

            const sections = parser.parse(text);

            expect(sections).toEqual([
                {
                    type: 'condition',
                    content: '',
                    start: 4,
                    end: 4
                },
                {
                    type: 'mapping',
                    content: 'process.field := \'value\'',
                    start: 10,
                    end: 34
                }
            ]);
        });

        it('should parse multiple IF-THEN blocks', () => {
            const text = `#IF
condition1
#THEN
mapping1
#IF
condition2 = true
#THEN
mapping2 := 'test'`;

            const sections = parser.parse(text);

            expect(sections).toEqual([
                {
                    type: 'condition',
                    content: 'condition1',
                    start: 4,
                    end: 14
                },
                {
                    type: 'mapping',
                    content: 'mapping1',
                    start: 21,
                    end: 29
                },
                {
                    type: 'condition',
                    content: 'condition2 = true',
                    start: 34,
                    end: 51
                },
                {
                    type: 'mapping',
                    content: 'mapping2 := \'test\'',
                    start: 58,
                    end: 76
                }
            ]);
        });

        it('should handle multiline conditions and mappings', () => {
            const text = `#IF
task.status = 'active' AND
task.priority > 5
#THEN
process.field1 := 'value1';
process.field2 := 'value2'`;

            const sections = parser.parse(text);

            expect(sections).toEqual([
                {
                    type: 'condition',
                    content: 'task.status = \'active\' AND\ntask.priority > 5',
                    start: 4,
                    end: 48
                },
                {
                    type: 'mapping',
                    content: 'process.field1 := \'value1\';\nprocess.field2 := \'value2\'',
                    start: 55,
                    end: 109
                }
            ]);
        });


        it('should return empty array for text without IF-THEN blocks', () => {
            const text = 'just some random text\nwithout any blocks';

            const sections = parser.parse(text);

            expect(sections).toEqual([]);
        });

        it('should handle incomplete block - missing THEN', () => {
            const text = `#IF
condition without then
some more text`;

            const sections = parser.parse(text);

            expect(sections).toEqual([]);
        });

        it('should handle incomplete block - only THEN', () => {
            const text = `#THEN
mapping without if`;

            const sections = parser.parse(text);

            expect(sections).toEqual([]);
        });

        it('should handle mixed complete and incomplete blocks', () => {
            const text = `#IF
complete condition
#THEN
complete mapping
#IF
incomplete without then`;  

            const sections = parser.parse(text);

            expect(sections).toEqual([
                {
                    type: 'condition',
                    content: 'complete condition',
                    start: 4,
                    end: 22
                },
                {
                    type: 'mapping',
                    content: 'complete mapping',
                    start: 29,
                    end: 45
                }
            ]);
        });
        it('should handle empty mapping', () => {
            const text = `#IF
condition
#THEN
`;

            const sections = parser.parse(text);

            expect(sections).toEqual([
                {
                    type: 'condition',
                    content: 'condition',
                    start: 4,
                    end: 13
                },
                {
                    type: 'mapping',
                    content: '',
                    start: 20,
                    end: 20
                }
            ]);
        });

        it('should handle text before first IF', () => {
            const text = `some text before
#IF
condition
#THEN
mapping`;

            const sections = parser.parse(text);

            expect(sections).toEqual([
                {
                    type: 'condition',
                    content: 'condition',
                    start: 21,
                    end: 30
                },
                {
                    type: 'mapping',
                    content: 'mapping',
                    start: 37,
                    end: 44
                }
            ]);
        });

        it('should handle text after last block', () => {
            const text = `#IF
condition
#THEN
mapping
some text after`;

            const sections = parser.parse(text);

            expect(sections).toEqual([
                {
                    type: 'condition',
                    content: 'condition',
                    start: 4,
                    end: 13
                },
                {
                    type: 'mapping',
                    content: 'mapping\nsome text after',
                    start: 20,
                    end: 43
                }
            ]);
        });
    });

    describe('getSectionAtPosition', () => {
        const text = `#IF
task.status = 'active'
#THEN
process.field := 'value'
#IF
#THEN
var.empty := true`;

        it('should find condition section', () => {
            const section = parser.getSectionAtPosition(text, 10);

            expect(section).toEqual({
                type: 'condition',
                content: 'task.status = \'active\'',
                start: 4,
                end: 26
            });
        });

        it('should find mapping section', () => {
            const section = parser.getSectionAtPosition(text, 40);

            expect(section).toEqual({
                type: 'mapping',
                content: 'process.field := \'value\'',
                start: 33,
                end: 57
            });
        });

        it('should return null for position outside sections', () => {
            const section = parser.getSectionAtPosition(text, 0);

            expect(section).toBeNull();
        });

        it('should return null for position between sections', () => {
            const section = parser.getSectionAtPosition(text, 31); // In "#THEN\n"

            expect(section).toBeNull();
        });

        it('should handle position at section boundaries', () => {
            const parser = new ConditionalMappingStructureParser();

            // At start of condition
            const atStart = parser.getSectionAtPosition(text, 4);
            expect(atStart).toEqual({
                type: 'condition',
                content: 'task.status = \'active\'',
                start: 4,
                end: 26
            });

            // At end of condition
            const atEnd = parser.getSectionAtPosition(text, 26);
            expect(atEnd).toEqual({
                type: 'condition',
                content: 'task.status = \'active\'',
                start: 4,
                end: 26
            });
        });
    });
});