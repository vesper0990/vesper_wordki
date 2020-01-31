import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    pure: true,
    name: 'toTime'
})
export class NubmerToTimePipe implements PipeTransform {

    transform(value: number, ...args: any[]): string {
        const secTotal = Math.ceil(value / 1000);
        const min = Math.floor(secTotal / 60);
        const sec = secTotal - min * 60;
        return `${min} min ${sec}s`;
    }
}
