import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AiApi {
    private readonly _baseUrl = environment.apiUrl;

    generate(prompt: string, code: string): Observable<string> {
        const url = `${this._baseUrl}/api/ai/generate`;
        
        return new Observable<string>(observer => {
            const controller = new AbortController();
            const signal = controller.signal;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt, code }),
                signal,
                credentials: 'include'
            }).then(async response => {
                if (!response.ok) {
                    if (response.status === 429) {
                        try {
                            const data = await response.json();
                            const msg = data?.error ?? 'Usage limit exceeded for this demo.';
                            observer.error({
                                type: 'usage-limit',
                                message: msg
                            });
                        } catch {
                            observer.error({
                                type: 'usage-limit',
                                message: 'Usage limit exceeded for this demo.'
                            });
                        }
                        return;
                    }

                    observer.error({
                        type: 'http-error',
                        status: response.status,
                        message: `Request failed with status ${response.status}`
                    });
                    return;
                }

                if (!response.body) {
                    observer.error('Response body is null');
                    return;
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        observer.complete();
                        break;
                    }
                    observer.next(decoder.decode(value, { stream: true }));
                }
            }).catch(err => {
                if (err.name !== 'AbortError') {
                    observer.error(err);
                }
            });

            return () => {
                controller.abort();
            };
        });
    }
}
