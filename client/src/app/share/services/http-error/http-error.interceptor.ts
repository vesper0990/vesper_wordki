import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from '../../components/error/services/error/error-service';
import { ApiException } from '../../models/error-codes.model';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private readonly errorService: ErrorService,
        private readonly router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    switch (error.status) {
                        case 400:
                            const apiException = new ApiException(error.error.message, error.error.code);
                            return throwError(apiException);
                        default:
                            let errorMessage = '';
                            if (error.error instanceof ErrorEvent) {
                                errorMessage = `Error: ${error.error.message}`;
                            } else {
                                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                            }
                            this.errorService.setError(errorMessage, error);
                            this.router.navigate(['/error']);
                            return throwError(error);

                    }
                })
            );
    }
}
