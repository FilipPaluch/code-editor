import { Injectable, signal, WritableSignal, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AiApi } from './ai.api';

export interface ChatMessage {
    isUser: boolean;
    text: WritableSignal<string>;
    isStreaming: WritableSignal<boolean>;
}

interface CodeBlockState {
    isInBlock: boolean;
    blockType: string;
    extractedCode: string;
    fullText: string;
}

@Injectable({
    providedIn: 'root'
})
export class AiChatService {
    private readonly _aiApi = inject(AiApi);

    private _streamingSubscription: Subscription | null = null;
    private _codeBlockState: CodeBlockState = {
        isInBlock: false,
        blockType: '',
        extractedCode: '',
        fullText: ''
    };
    private _throttleTimer: ReturnType<typeof setTimeout> | null = null;
    private _pendingCodeUpdate: string | null = null;
    private _onCodeUpdateCallback: ((code: string) => void) | null = null;
    private _lastEmissionTime: number = 0;


    // Reactive state using signals - now computed based on current form
    readonly messages: WritableSignal<ChatMessage[]> = signal([{
        isUser: false,
        text: signal("Welcome to Expressions Editor! How can I help you?"),
        isStreaming: signal(false)
    }]);

    readonly isLoading = signal(false);

    /**
     * Throttled code emission to prevent overwhelming the editor
     * Emits at most every 600ms, not less frequently than 600ms
     */
    private emitCodeWithThrottle(code: string): void {
        this._pendingCodeUpdate = code;

        const now = Date.now();
        const timeSinceLastEmission = now - this._lastEmissionTime;

        // If enough time has passed since last emission, emit immediately
        if (timeSinceLastEmission >= 600) {
            this.emitCodeImmediately();
            return;
        }

        // Otherwise, schedule emission for the next available window
        if (!this._throttleTimer) {
            const remainingTime = 600 - timeSinceLastEmission;
            this._throttleTimer = setTimeout(() => {
                this.emitCodeImmediately();
                this._throttleTimer = null;
            }, remainingTime);
        }
    }

    /**
     * Immediately emit pending code and update last emission time
     */
    private emitCodeImmediately(): void {
        if (this._pendingCodeUpdate && this._onCodeUpdateCallback) {
            this._onCodeUpdateCallback(this._pendingCodeUpdate);
            this._pendingCodeUpdate = null;
            this._lastEmissionTime = Date.now();
        }
    }

    /**
     * Clear throttle timer and emit any pending code immediately
     */
    private flushPendingCodeUpdate(): void {
        if (this._throttleTimer) {
            clearTimeout(this._throttleTimer);
            this._throttleTimer = null;
        }

        this.emitCodeImmediately();
    }

    /**
     * Extracts expression code from complete markdown response
     */
    private extractExprCode(text: string): string | null {
        // Look for ```expression code blocks
        const match = text.match(/```expression\s*\n([\s\S]*?)\n```/);
        if (match) {
            return match[1].trim();
        }

        const codeMatch = text.match(/```\s*\n([\s\S]*?)\n```/);
        if (codeMatch) {
            const code = codeMatch[1].trim();
            if (this.isLikelyExpressionCode(code)) {
                return code;
            }
        }

        return null;
    }

    /**
     * Process streaming chunk and extract code in real-time
     */
    private processStreamingChunk(chunk: string): string | null {
        this._codeBlockState.fullText += chunk;

        // Check if we're starting a code block
        if (!this._codeBlockState.isInBlock) {
            // Look for code block start patterns at the end of current text
            const patterns = [
                /```expression\s*$/,
                /```\s*$/
            ];

            for (const pattern of patterns) {
                if (pattern.test(this._codeBlockState.fullText)) {
                    this._codeBlockState.isInBlock = true;
                    this._codeBlockState.blockType = this._codeBlockState.fullText.match(/```(\w+)/)?.[1] || 'generic';
                    this._codeBlockState.extractedCode = '';
                    return null; // Don't emit yet, wait for actual code
                }
            }

            // Also check for newline after code block start
            if (/```(expression|)\s*\n/.test(this._codeBlockState.fullText)) {
                this._codeBlockState.isInBlock = true;
                this._codeBlockState.blockType = this._codeBlockState.fullText.match(/```(\w+)/)?.[1] || 'generic';
                this._codeBlockState.extractedCode = '';
                return null;
            }
        }

        // If we're in a code block, extract the code
        if (this._codeBlockState.isInBlock) {
            // Check if we're ending the code block (look for ``` at the end or followed by whitespace)
            if (/```(\s|$)/.test(this._codeBlockState.fullText)) {
                this._codeBlockState.isInBlock = false;
                const finalCode = this._codeBlockState.extractedCode.trim();

                // Flush any pending update and emit final code immediately
                this.flushPendingCodeUpdate();
                return finalCode || null;
            }

            // Extract code from the current text
            const codeMatch = this._codeBlockState.fullText.match(/```(?:expression|)?\s*\n([\s\S]*?)(?:\n```|$)/);
            if (codeMatch) {
                const currentCode = codeMatch[1];
                if (currentCode !== this._codeBlockState.extractedCode) {
                    this._codeBlockState.extractedCode = currentCode;

                    // Only emit if we have meaningful code (not just whitespace)
                    const trimmedCode = currentCode.trim();
                    if (trimmedCode && this.isLikelyExpressionCode(trimmedCode)) {
                        this.emitCodeWithThrottle(trimmedCode);
                        return trimmedCode; // Return for tracking purposes
                    }
                }
            }
        }

        return null;
    }

    /**
     * Check if the code looks like expression code based on actual grammar keywords
     */
    private isLikelyExpressionCode(code: string): boolean {
        const keywordsAndOps = [
            /\b(AND|OR|NOT)\b/i,
            /\b(ANY|ALL|OF)\b/i,
            /\b(TRUE|FALSE)\b/i,

            /\bNULL\b/i,
            /\?\?/,               // NULLCOALESCING

            /:=/,                 // ASSIGN
            /:\?=/,               // CONDITIONALASSIGN 

            /!=/,                 // NEQ
            />=/,                 // GE
            /<=/,                 // LE
            />/,                  // GT
            /</,                  // LT
            /=/,                  // EQ

            /\^/,                 // POWER
            /\*/,                 // MULTIPLICATION
            /\//,                 // DIVISION
            /\+/,                 // PLUS
            /-/,                  // MINUS

            /\[/,                 // LARRAYPAREN
            /\]/,                 // RARRAYPAREN

            /->/,                 // LAMBDAARROW
            /\{[^}]*\}/,          

            /[a-zA-Z_.][a-zA-Z_.0-9]*:[a-zA-Z_.0-9]+/,

            /'[^']*'/,            // TEXT
            /\b(FORMAT|LENGTH|COUNT|DATE)\s*\(/i, // FORMAT/LENGTH/COUNT

            /;\s*$/               // END
        ];

        const structuralPatterns = [
            /\([^)]+\)/,                               
            /\b[a-zA-Z_.][a-zA-Z_.0-9]*\b/,         
        ];

        const allPatterns = [...keywordsAndOps, ...structuralPatterns];

        const matches = allPatterns.filter(pattern => pattern.test(code)).length;

        return matches >= 2;
    }

    /**
     * Reset code block state for new messages
     */
    private resetCodeBlockState(): void {
        this._codeBlockState = {
            isInBlock: false,
            blockType: '',
            extractedCode: '',
            fullText: ''
        };

        this.flushPendingCodeUpdate();
    }

    sendMessage(currentCode: string, currentInput: string): Promise<string | null> {
        if (!currentInput.trim()) {
            return Promise.resolve(null);
        }

        this.messages.update(messages => [...messages, {
            isUser: true,
            text: signal(currentInput),
            isStreaming: signal(false)
        }]);

        const userPrompt = currentInput;
        this.isLoading.set(true);

        this.resetCodeBlockState();

        this.messages.update(messages => [...messages, {
            isUser: false,
            text: signal(''),
            isStreaming: signal(true)
        }]);

        const currentMessages = this.messages();
        const aiMessage = currentMessages[currentMessages.length - 1];

        return new Promise((resolve, reject) => {
            let finalExtractedCode = '';

            this._streamingSubscription = this
                ._aiApi
                .generate(userPrompt, currentCode)
                .subscribe({
                    next: (chunk: string) => {
                        aiMessage.text.update(txt => `${txt}${chunk}`);

                        const extractedCode = this.processStreamingChunk(chunk);
                        if (extractedCode) {
                            finalExtractedCode = extractedCode;
                        }
                    },
                    error: (error) => {
                        console.error('AI generation failed:', error);
                        const err: any = error;

                        if (err?.type === 'usage-limit' || (typeof err?.message === 'string' && err.message.includes('Usage limit'))) {
                            aiMessage.text.set('You’ve used all 8 free AI requests available in this demo.');
                        } else {
                            aiMessage.text.set('Sorry, something went wrong. Please try again.');
                        }

                        aiMessage.isStreaming.set(false);
                        this.isLoading.set(false);

                        this.resetCodeBlockState();
                        reject(error);
                    },
                    complete: () => {
                        aiMessage.isStreaming.set(false);
                        this.isLoading.set(false);

                        const completeCode = this.extractExprCode(aiMessage.text()) || finalExtractedCode;

                        resolve(completeCode);
                    }
                });
        });
    }

    cancelStream(): void {
        if (this._streamingSubscription) {
            this._streamingSubscription.unsubscribe();
            this._streamingSubscription = null;

            const currentMessages = this.messages();
            const lastMessage = currentMessages[currentMessages.length - 1];

            if (lastMessage && lastMessage.isStreaming()) {
                lastMessage.isStreaming.set(false);
            }

            this.isLoading.set(false);
        }

        // Reset code block state when canceling and flush pending updates
        this.resetCodeBlockState();
        this._onCodeUpdateCallback = null;
    }

    clearMessages(): void {
        this.messages.set([{
            isUser: false,
            text: signal("Welcome to Expressions Editor! How can I help you?"),
            isStreaming: signal(false)
        }]);

        this.cancelStream();
    }

    destroy(): void {
        this.cancelStream();
        // Clean up any remaining timers
        if (this._throttleTimer) {
            clearTimeout(this._throttleTimer);
            this._throttleTimer = null;
        }
    }
} 