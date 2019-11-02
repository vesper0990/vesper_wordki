import { Injectable } from '@angular/core';

import { LessonBaseService } from './base.service';
import { LessonResultService } from './lesson-result.service';

@Injectable({
  providedIn: 'root'
})
export class LessonFiszkiService extends LessonBaseService {

  constructor(public lessonResultService: LessonResultService) {
    super(lessonResultService);
  }

  public check(translation: string): void {
    this.isCorrect = true;
  }
}
