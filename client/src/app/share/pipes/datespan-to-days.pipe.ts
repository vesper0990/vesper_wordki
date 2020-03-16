import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    pure: true,
    name: 'toDays'
})
export class DateSpanToDaysPipe implements PipeTransform {

    transform(value: Date, ...args: any[]): string {
        const now = new Date().getTime();
        const then = value.getTime();
        const span = Math.floor((now - then) / 1000 / 3600 / 24);
        if (span === 0) {
            return 'dzisiaj';
        } else if (span === 1) {
            return 'wczoraj';
        } else {
            return `${span} dni temu`;
        }
    }
}
