import { Pipe, PipeTransform } from '@angular/core';
import { Never } from '../utils/date-util';

@Pipe({
    pure: true,
    name: 'toDays'
})
export class DateSpanToDaysPipe implements PipeTransform {

    transform(value: Date, ...args: any[]): string {
        if (value === null || value === undefined) {
            return '';
        }
        if (value === Never) {
            return 'never';
        }
        const now = new Date().getTime();
        const then = value.getTime();
        const span = Math.floor((now - then) / 1000 / 3600 / 24);
        if (span === 0) {
            return 'today';
        } else if (span === 1) {
            return 'yesterday';
        } else {
            return `${span} days ago`;
        }
    }
}
