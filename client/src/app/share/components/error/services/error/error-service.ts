import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private readonly router: Router) { }

    errorMessage = '';
    error: any = null;

    setError(errorMessage: string, error: any): void {
        if (this.errorMessage.length > 0 || this.error !== null) {
            return;
        }
        this.errorMessage = errorMessage;
        this.error = error;
        this.router.navigate(['/error']);
    }

    clearError(): void {
        this.errorMessage = '';
        this.error = null;
    }
}
