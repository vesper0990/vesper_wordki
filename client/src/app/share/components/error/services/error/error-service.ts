import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    errorMessage = '';
    error: any = null;

    setError(errorMessage: string, error: any): void {
        if (this.errorMessage.length > 0 || this.error !== null) {
            return;
        }
        this.errorMessage = errorMessage;
        this.error = error;
    }

    clearError(): void {
        this.errorMessage = '';
        this.error = null;
    }
}
