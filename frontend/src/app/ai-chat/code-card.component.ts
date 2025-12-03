import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-code-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="code-card">
            <div class="code-card-header" (click)="toggleExpanded()">
                <div class="code-card-title">
                    <span class="language-badge">{{ language }}</span>
                    <span class="expand-icon" [class.expanded]="isExpanded()">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M5.25 7.75L8 10.5l2.75-2.75L11.5 8.5L8 12L4.5 8.5L5.25 7.75Z"/>
                        </svg>
                    </span>
                </div>
                <div class="code-card-actions">
                    <button class="copy-button" (click)="copyCode($event)" title="Copy code">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M10 2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM4 3h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
                            <path d="M6 0h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1H4a2 2 0 0 1 2-2z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="code-card-content" [class.collapsed]="!isExpanded()">
                <pre class="code-block"><code>{{ code }}</code></pre>
            </div>
        </div>
    `,
    styleUrls: ['./code-card.component.css']
})
export class CodeCardComponent {
    @Input({ required: true }) code!: string;
    @Input() language: string = 'expression';

    readonly isExpanded = signal(true);

    toggleExpanded(): void {
        this.isExpanded.update(expanded => !expanded);
    }

    async copyCode(event: Event): Promise<void> {
        event.stopPropagation(); // Prevent header click
        
        try {
            await navigator.clipboard.writeText(this.code);
            // TODO: Add toast notification for copy success
            console.log('Code copied to clipboard');
        } catch (err) {
            console.error('Failed to copy code:', err);
            // Fallback for older browsers
            this.fallbackCopyToClipboard(this.code);
        }
    }

    private fallbackCopyToClipboard(text: string): void {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            console.log('Code copied to clipboard (fallback)');
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }
} 