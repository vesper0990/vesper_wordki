import { shuffleArray } from './shuffle-array';

describe('shullfe-array', () => {
    it('should randomize array', () => {
        const array = [1, 2, 3, 4, 5];
        const result = shuffleArray([1, 2, 3, 4, 5]);
        expect(result.length).toBe(array.length);
        let areSame = true;
        array.forEach((item, index) => {
            areSame = areSame && item === result[index];
        });
        expect(areSame).toBeFalse();
    });
});
