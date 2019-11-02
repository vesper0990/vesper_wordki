import { Component, Inject, HostListener } from '@angular/core';
import { LessonBase, LESSON_STATE } from '../lesson-base.component';
import { Router } from '@angular/router';
import { LessonFiszkiService } from '../../services/fiszki.service';
import { LessonBaseService } from '../../services/base.service';
import { LessonSettingsService } from '../../../common/services/lesson-settings.service';

@Component({
  templateUrl: './fiszki.component.html',
  styleUrls: ['./fiszki.component.scss']
})
export class FiszkiComponent extends LessonBase {

  constructor(@Inject(LessonFiszkiService) protected lessonService: LessonBaseService,
    protected lessonSettingsService: LessonSettingsService,
    protected router: Router) {
    super(lessonService, lessonSettingsService, router);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case KEY_CODE.ENTER: {
        this.onEnterClick();
        break;
      }
      case KEY_CODE.LEFT_ARROW: {
        this.onLeftArrowClick();
        break;
      }
      case KEY_CODE.RIGHT_ARROW: {
        this.onRightArrowClick();
        break;
      }
    }
  }

  public onEnterClick(): void {
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

  public onRightArrowClick(): void {
    if (this.lessonState === LESSON_STATE.NEED_TO_ANSWARE) {
      this.know();
    }
  }

  public onLeftArrowClick(): void {
    if (this.lessonState === LESSON_STATE.NEED_TO_ANSWARE) {
      this.unknow();
    }
  }
}

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ENTER = 13,
}
