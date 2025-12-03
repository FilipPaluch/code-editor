import { Component, inject, input, output, ViewChild, ElementRef, AfterViewInit, effect, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiChatService } from './ai-chat.service';
import { MarkdownParserPipe } from './markdown-parser.pipe';
import { CodeCardComponent } from './code-card.component';

@Component({
    selector: 'app-ai-chat',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MarkdownParserPipe,
        CodeCardComponent
    ],
    templateUrl: './ai-chat.component.html',
    styleUrls: ['./ai-chat.component.css']
})
export class AiChatComponent implements AfterViewInit {
    currentCode = input.required<string>();
    codeUpdate = output<string>();

    @ViewChild('messageList', { static: false }) messageListRef!: ElementRef<HTMLDivElement>;
    @ViewChild('chatTextarea', { static: false }) chatTextareaRef!: ElementRef<HTMLTextAreaElement>;

    private readonly _aiChatService = inject(AiChatService);

    readonly userInput = model<string>('');

    // Expose service state to template
    get messages() { return this._aiChatService.messages; }
    get isLoading() { return this._aiChatService.isLoading; }

    constructor() {
        // Auto-scroll when messages change
        effect(() => {
            const messages = this.messages();
            if (messages.length > 0) {
                // Use setTimeout to ensure the DOM is updated
                setTimeout(() => this.scrollToBottom(), 0);
            }
        });

        // Auto-scroll during streaming
        effect(() => {
            const messages = this.messages();
            const hasStreamingMessage = messages.some((msg) => msg.isStreaming());
            if (hasStreamingMessage) {
                // Scroll more frequently during streaming
                const scrollInterval = setInterval(() => {
                    const currentMessages = this.messages();
                    if (currentMessages.some((msg) => msg.isStreaming())) {
                        this.scrollToBottom();
                    } else {
                        clearInterval(scrollInterval);
                    }
                }, 100);
            }
        });
    }

    ngAfterViewInit(): void {
        this.scrollToBottom();

        if (this.chatTextareaRef?.nativeElement) {
            this.adjustTextareaHeight(this.chatTextareaRef.nativeElement);
        }
    }

    private scrollToBottom(): void {
        if (this.messageListRef?.nativeElement) {
            const element = this.messageListRef.nativeElement;
            element.scrollTop = element.scrollHeight;
        }
    }

    async sendMessage(): Promise<void> {
        try {
            const input = this.userInput();
            this.userInput.set('');

            setTimeout(() => {
                this.adjustTextareaHeight(this.chatTextareaRef.nativeElement);
            });

            const extractedCode = await this._aiChatService.sendMessage(
                this.currentCode(),
                input
            );

            if (extractedCode) {
                this.codeUpdate.emit(extractedCode);
            }

        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

    cancelStream(): void {
        this._aiChatService.cancelStream();
    }

    clearMessages(): void {
        this._aiChatService.clearMessages();
    }

    adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
        // Reset height to auto to get the actual content height
        textarea.style.height = 'auto';

        // Set height to scrollHeight, respecting min/max constraints
        const scrollHeight = textarea.scrollHeight;
        const minHeight = 40; // matches CSS min-height

        const newHeight = Math.max(scrollHeight, minHeight);
        textarea.style.height = newHeight + 'px';
    }
}
