import { mapErrorCodeToMessage } from './error-handler';

describe('ErrorHandler', () => {
    it('should return proper description', () => {
        const result = mapErrorCodeToMessage('LoginUserNotFound');
        expect(result).toBe('Invalid username or password');
    });
});
