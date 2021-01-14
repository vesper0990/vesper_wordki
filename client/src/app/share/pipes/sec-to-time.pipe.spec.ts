import { SecToTimePipe } from './sec-to-time.pipe';

describe('SecToTimePipe', () => {

    const pipe = new SecToTimePipe();

    [
        { value: 1, result: '1s' },
        { value: 0, result: '0s' },
        { value: 60, result: '1min 0s' },
        { value: 61, result: '1min 1s' },
        { value: 3600, result: '1h 0s' },
    ].forEach((item, index) =>
        it('should return proper value ' + index, () => {
            expect(pipe.transform(item.value)).toBe(item.result);
        })
    );
});

