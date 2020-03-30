import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    errorMessage: string;
    error: any;

    constructor() {

    }

    setError(errorMessage: string, error: any): void {
        this.errorMessage = errorMessage;
        this.error = error;
    }

    clearError(): void {
        this.errorMessage = '';
        this.error = {};
    }
}
