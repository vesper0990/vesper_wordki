import { Never } from '../utils/date-util';
import { DateSpanToDaysPipe } from './datespan-to-days.pipe';

describe('DateSpanToDays', () => {

    const pipe = new DateSpanToDaysPipe();

    beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(2020, 1, 15));
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    [
        { value: Never, result: 'never' },
        { value: null, result: '' },
        { value: undefined, result: '' },
        { value: new Date(2020, 1, 14), result: 'yesterday' },
        { value: new Date(2020, 1, 15), result: 'today' },
        { value: new Date(2020, 1, 10), result: '5 days ago' },
    ].forEach((item, index) =>
        it('should return proper value ' + index, () => {
            expect(pipe.transform(item.value)).toBe(item.result);
        })
    );
});

