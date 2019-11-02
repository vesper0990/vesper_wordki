import { Pipe, PipeTransform } from '@angular/core';
import { GroupItem } from '../models/GroupItem';

@Pipe({ name: 'appNextLesson' })
export class NextLessonPipe implements PipeTransform {

  private intervals = [0, 1, 1, 2, 3, 5];

  transform(value: GroupItem) {
    const daysAgo = Math.floor((new Date().getTime() - new Date(value.lastLessonDate).getTime()) / 1000 / 60 / 60 / 24);
    const daysAgoMax = this.intervals[value.resultsCount];
    let daysToLesson = daysAgoMax - daysAgo;
    if (daysToLesson < 0) {
      daysToLesson = 0;
    }
    return daysToLesson;
  }
}
