import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    pure: true,
    name: 'secToTime'
})
export class SecToTimePipe implements PipeTransform {
    transform(value: number, ...args: any[]): string {
        const hours = Math.floor(value / 3600);
        const remaining = value - (hours * 3600);
        const min = Math.floor(remaining / 60);
        const sec = remaining - min * 60;
        let result = '';
        if (hours > 0) {
            result = `${hours}h `;
        }
        if (min > 0) {
            result = result + `${min}min `;
        }
        result = result + `${sec}s `;
        return result;
    }
}
