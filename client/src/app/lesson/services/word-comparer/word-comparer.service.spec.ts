import { WordComparerService } from './word-comparer.service';

describe('WordComparerService', () => {

    let service: WordComparerService;

    beforeEach(() => {
        service = new WordComparerService();
    });

    it('should compare if the same', () => {
        const original = 'test';
        const provided = 'test';
        const result = service.isCorrect(original, provided);
        expect(result).toBeTrue();
    });

    it('should compare if different', () => {
        const original = 'test';
        const provided = 'test1';
        const result = service.isCorrect(original, provided);
        expect(result).toBeFalse();
    });

});
