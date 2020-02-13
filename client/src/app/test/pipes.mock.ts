import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toTime'
})
export class NubmerToTimeMockPipe implements PipeTransform {

    transform(value: number, ...args: any[]): string {
        return '';
    }
}
