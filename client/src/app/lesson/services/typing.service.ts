import { Injectable } from '@angular/core';

import { LessonBaseService } from './base.service';
import { WordComparerService } from './word-comparer.service';
import { LessonResultService } from './lesson-result.service';

@Injectable({
  providedIn: 'root'
})
export class LessonTypingService extends LessonBaseService {

  private wordComparer: WordComparerService;

  constructor(public lessonResultService: LessonResultService) {
    super(lessonResultService);
  }

  public initilize(): void{
    super.initilize();
    this.wordComparer = new WordComparerService(this.lessonSettings.translationDirectionEnum);
  }

  public check(translation: string): void {
    if (this.wordComparer.compare(this.currentWord, translation)) {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }
}
