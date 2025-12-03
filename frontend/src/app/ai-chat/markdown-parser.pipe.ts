import { Pipe, PipeTransform } from '@angular/core';

export interface MessageFragment {
    type: 'text' | 'code';
    content: string;
    language?: string;
}

@Pipe({
    name: 'markdownParser',
    standalone: true
})
export class MarkdownParserPipe implements PipeTransform {

    transform(text: string): MessageFragment[] {
        if (!text) {
            return [];
        }

        const fragments: MessageFragment[] = [];
        const codeBlockRegex = /```(expression)?\s*\n([\s\S]*?)\n```/g;
        
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(text)) !== null) {
            // Add text before the code block
            if (match.index > lastIndex) {
                const textContent = text.substring(lastIndex, match.index).trim();
                if (textContent) {
                    fragments.push({
                        type: 'text',
                        content: this.parseBasicMarkdown(textContent)
                    });
                }
            }

            // Add the code block
            const language = match[1] || 'expression';
            const codeContent = match[2];
            fragments.push({
                type: 'code',
                content: codeContent,
                language: language
            });

            lastIndex = match.index + match[0].length;
        }

        // Add remaining text after the last code block
        if (lastIndex < text.length) {
            const remainingText = text.substring(lastIndex).trim();
            if (remainingText) {
                fragments.push({
                    type: 'text',
                    content: this.parseBasicMarkdown(remainingText)
                });
            }
        }

        // If no code blocks were found, return the entire text as a single fragment
        if (fragments.length === 0) {
            fragments.push({
                type: 'text',
                content: this.parseBasicMarkdown(text)
            });
        }

        return fragments;
    }

    private parseBasicMarkdown(text: string): string {
        return text
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Line breaks
            .replace(/\n/g, '<br>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    }
} 