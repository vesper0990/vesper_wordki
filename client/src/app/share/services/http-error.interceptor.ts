import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorService } from '../components/error/error-service';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiException } from '../models/error-codes.model';


@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private errorService: ErrorService,
        private router: Router) { }

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
                            this.errorService.setError('test', error);
                            this.router.navigate(['/error']);
                            return throwError(error);

                    }
                })
            );
    }
}
