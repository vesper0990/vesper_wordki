import { ErrorService } from './error-service';

describe('ErrorService', () => {

    let service: ErrorService;

    beforeEach(() => {
        service = new ErrorService();
    });

    it('should setError if not set', () => {
        const error = { error: 'error' };
        service.setError('message', error);

        expect(service.error).toBe(error);
        expect(service.errorMessage).toBe('message');
    });

    it('should not setError if already set', () => {
        const error1 = { error: 'error1' };
        service.error = error1;
        service.errorMessage = 'message1';

        const error = { error: 'error' };
        service.setError('message', error);

        expect(service.error).toBe(error1);
        expect(service.errorMessage).toBe('message1');
    });

});
