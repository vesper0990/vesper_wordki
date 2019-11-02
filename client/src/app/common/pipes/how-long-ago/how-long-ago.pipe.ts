import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'howLongAgo'
})
export class HowLongAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    const daysAgo = Math.floor((new Date().getTime() - new Date(value).getTime()) / 1000 / 60 / 60 / 24);

    if (daysAgo < 0) {
      return null;
    } else if (daysAgo === 0) {
      return "Dzisiaj";
    } else if (daysAgo === 1) {
      return "Wczoraj";
    }
    return `${daysAgo} dni temu`;
  }

}
