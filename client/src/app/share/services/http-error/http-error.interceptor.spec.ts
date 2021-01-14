import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { createProvider } from 'src/app/test/helpers.spec';
import { ErrorService } from '../../components/error/services/error/error-service';
import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
    let service: HttpErrorInterceptor;
    let error: jasmine.SpyObj<ErrorService>;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                HttpErrorInterceptor,
                createProvider(ErrorService)
            ]
        }).compileComponents();

        service = TestBed.inject(HttpErrorInterceptor);
        router = TestBed.inject(Router);
        error = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should intercept and catch 400', () => {
        const request = {} as any;
        const handler = { handle: () => { } } as any;
        spyOn(handler, 'handle').and.returnValue(throwError({ status: 400, error: { message: 'message', code: 1 } }));
        const sub = service.intercept(request, handler).pipe(catchError((catchedError: any) => {
            expect(catchedError.message).toBe('message');
            expect(catchedError.code).toBe(1);
            return of({});
        })).subscribe();
        sub.unsubscribe();
    });

    it('should intercept and catch other ErrorEvents', () => {
        const spy = spyOn(router, 'navigate');
        const errorEvent = new ErrorEvent('', { message: 'messageErrorEvent' });
        const request = {} as any;
        const handler = { handle: () => { } } as any;
        spyOn(handler, 'handle').and.returnValue(throwError({ status: 500, error: errorEvent }));
        const sub = service.intercept(request, handler).pipe(catchError((catchedError: any) => {
            expect(error.setError).toHaveBeenCalled();
            expect(spy.calls.first().args[0]).toContain('/error');
            return of({});
        })).subscribe();
        sub.unsubscribe();
    });

    it('should intercept and catch other errors', () => {
        const spy = spyOn(router, 'navigate');
        const request = {} as any;
        const handler = { handle: () => { } } as any;
        spyOn(handler, 'handle').and.returnValue(throwError({ status: 500, error: { message: 'error' } }));
        const sub = service.intercept(request, handler).pipe(catchError((catchedError: any) => {
            expect(error.setError).toHaveBeenCalled();
            expect(spy.calls.first().args[0]).toContain('/error');
            return of({});
        })).subscribe();
        sub.unsubscribe();
    });


});
