import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { Subscription } from 'rxjs';
import { getLessonStateEnum, getFirstWord } from '../../store/selectors';
import { LessonStateEnum } from '../../models/lesson-state';
import { WordRepeat } from '../../models/word-repeat';
import { AnswerAction, CheckAnswerAction } from '../../store/actions';

@Component({
  selector: 'app-fiszka',
  templateUrl: './fiszka.component.html',
  styleUrls: ['./fiszka.component.scss']
})
export class FiszkaComponent implements OnInit, OnDestroy {

  private readonly arrowLeft = 'ArrowLeft';
  private readonly arrowRight = 'ArrowRight';

  private lessonStateSub: Subscription;
  private wordSub: Subscription;

  lessonStateEnum: LessonStateEnum;
  word: WordRepeat;
  questionVisibility: boolean;
  answerVisibility: boolean;

  constructor(private lessonStore: Store<LessonState>) { }

  ngOnInit(): void {
    this.lessonStateSub = this.lessonStore.select(getLessonStateEnum)
      .subscribe((storeValue: LessonStateEnum) => this.handleLessonStateEnum(storeValue));

    this.wordSub = this.lessonStore.select(getFirstWord)
      .subscribe((storeValue: WordRepeat) => this.handleFirstWord(storeValue));
  }

  ngOnDestroy(): void {
    this.lessonStateSub.unsubscribe();
    this.wordSub.unsubscribe();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (this.lessonStateEnum === 0) {
      return;
    }
    switch (event.key) {
      case this.arrowRight:
        this.handleArrowRight();
        break;
      case this.arrowLeft:
        this.handleArrowLeft();
        break;
    }
  }

  private handleLessonStateEnum(storeValue: LessonStateEnum): void {
    this.lessonStateEnum = storeValue;
    this.questionVisibility = this.lessonStateEnum === LessonStateEnum.WordDisplay;
    this.answerVisibility = this.lessonStateEnum === LessonStateEnum.AnswerDisplay;
  }

  private handleFirstWord(storeValue: WordRepeat): void {
    this.word = storeValue;
  }

  private handleArrowRight(): void {
    this.lessonStore.dispatch(
      this.lessonStateEnum === LessonStateEnum.WordDisplay ? new CheckAnswerAction() : new AnswerAction()
    );
  }

  private handleArrowLeft(): void {
    this.lessonStore.dispatch(
      this.lessonStateEnum === LessonStateEnum.WordDisplay ? new CheckAnswerAction() : new AnswerAction()
    );
  }
}
