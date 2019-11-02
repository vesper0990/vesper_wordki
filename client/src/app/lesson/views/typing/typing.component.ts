import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LessonBase, LESSON_STATE } from '../lesson-base.component';
import { LessonTypingService } from '../../services/typing.service';
import { LessonBaseService } from '../../services/base.service';
import { LessonSettingsService } from '../../../common/services/lesson-settings.service';

@Component({
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss']
})
export class TypingComponent extends LessonBase {

  color: string;

  constructor(@Inject(LessonTypingService) protected lessonService: LessonBaseService,
    protected lessonSettingsService: LessonSettingsService,
    protected router: Router) {
    super(lessonService, lessonSettingsService, router);
  }

  public onEnterClick(): void {
    if (this.lessonState === LESSON_STATE.NEED_TO_START) {
      this.startLesson();
      return;
    }
    if (this.lessonState === LESSON_STATE.NEED_TO_CHECK) {
      this.check();
      return;
    }
    if (this.lessonState === LESSON_STATE.NEED_TO_ANSWARE) {
      if (this.lessonService.isCorrect) {
        this.know();
      } else {
        this.unknow();
      }
      return;
    }
  }

  protected setState(state: LESSON_STATE): void {
    super.setState(state);
    this.setColor();
  }

  private setColor(): void {
    switch (this.lessonState) {
      case LESSON_STATE.NEED_TO_START:
        this.color = 'black';
        break;
      case LESSON_STATE.NEED_TO_ANSWARE:
        if (this.lessonService.isCorrect) {
          this.color = 'green';
        } else {
          this.color = 'red';
        }
        break;
      case LESSON_STATE.NEED_TO_CHECK:
        this.color = 'black';
        break;
    }
  }


}
