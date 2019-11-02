import { Injectable } from '@angular/core';
import { Word } from '@app/common/models/Word';


@Injectable()
export class LessonCollectorService {

  collect(words: Word[], allWords: boolean): Word[] {
    if (allWords) {
      return this.randomize(words);
    }
    const results: Word[] = [];
    words.forEach(item => {
      if (item.isVisible) {
        results.push(item);
      }
    });
    return this.randomize(results);
  }

  private randomize(list: Word[]): Word[] {
    for (let i = list.length - 1; i > -0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const itemAtIndex = list[randomIndex];

      list[randomIndex] = list[i];
      list[i] = itemAtIndex;
    }
    return list;
  }
}
