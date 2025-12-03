import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly API_KEY_STORAGE_KEY = 'expressioncodeeditordemo_apiKey';

    /**
     * Checks if the user is authenticated by verifying if an API key exists
     */
    isAuthenticated(): boolean {
        const apiKey = localStorage.getItem(this.API_KEY_STORAGE_KEY);
        return apiKey !== null && apiKey.trim() !== '';
    }

    /**
     * Gets the API key from localStorage, prompts user if not found
     */
    getApiKey(): string | null {
        let apiKey = localStorage.getItem(this.API_KEY_STORAGE_KEY);
        
        if (!apiKey || apiKey.trim() === '') {
            apiKey = this.promptForApiKey();
            if (apiKey && apiKey.trim() !== '') {
                localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
            }
        }
        
        return apiKey;
    }

    /**
     * Prompts the user for an API key using browser alert
     */
    private promptForApiKey(): string | null {
        const apiKey = prompt('Please enter your API key:');
        return apiKey;
    }

    /**
     * Clears the stored API key (useful for logout)
     */
    clearApiKey(): void {
        localStorage.removeItem(this.API_KEY_STORAGE_KEY);
    }

    /**
     * Sets a new API key
     */
    setApiKey(apiKey: string): void {
        if (apiKey && apiKey.trim() !== '') {
            localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
        }
    }
}