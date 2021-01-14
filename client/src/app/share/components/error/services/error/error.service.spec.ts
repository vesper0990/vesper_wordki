import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ErrorService } from './error-service';

describe('ErrorService', () => {

    let service: ErrorService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                ErrorService
            ]
        }).compileComponents();
        service = TestBed.inject(ErrorService);
        router = TestBed.inject(Router);
    });

    it('should setError if not set', () => {
        const spy = spyOn(router, 'navigate');
        const error = { error: 'error' };
        service.setError('message', error);

        expect(service.error).toBe(error);
        expect(service.errorMessage).toBe('message');
        expect(spy.calls.first().args[0]).toContain('/error');
    });

    it('should not setError if already set', () => {
        const spy = spyOn(router, 'navigate');
        const error1 = { error: 'error1' };
        service.error = error1;
        service.errorMessage = 'message1';

        const error = { error: 'error' };
        service.setError('message', error);

        expect(service.error).toBe(error1);
        expect(service.errorMessage).toBe('message1');
        expect(spy.calls.any()).toBeFalse();
    });

});
