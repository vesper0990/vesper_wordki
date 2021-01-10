import { mapErrorCodeToMessage } from './error-handler';

describe('ErrorHandler', () => {
    it('should return proper description', () => {
        const result = mapErrorCodeToMessage('RegisterUserAlreadyExists');
        expect(result).toBe('Username is already registered');
    });
});
