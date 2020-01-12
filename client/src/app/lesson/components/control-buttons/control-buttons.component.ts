import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { Subscription } from 'rxjs';
import { getLessonStateEnum, getFirstWord } from '../../store/selectors';
import { LessonStateEnum } from '../../models/lesson-state';
import { StartLessonAction, CheckAnswerAction, AnswerAction } from '../../store/actions';
import { WordRepeat } from '../../models/word-repeat';

@Component({
  selector: 'app-control-buttons',
  templateUrl: './control-buttons.component.html',
  styleUrls: ['./control-buttons.component.scss']
})
export class ControlButtonsComponent implements OnInit, OnDestroy {

  private lessonStateSub: Subscription;
  private wordNextSub: Subscription;

  private currectWord: WordRepeat;

  lessonStateEnum: LessonStateEnum;
  startVisibility: boolean;
  checkVisibility: boolean;
  answerVisibility: boolean;

  constructor(private lessonState: Store<LessonState>) { }

  ngOnInit() {
    this.lessonStateSub = this.lessonState.select(getLessonStateEnum).subscribe(
      (storeValue: LessonStateEnum) => this.handleLessonStateEnum(storeValue)
    );

    this.wordNextSub = this.lessonState.select(getFirstWord).subscribe(
      (storeValue: WordRepeat) => this.currectWord = storeValue
    );
  }

  ngOnDestroy(): void {
    this.lessonStateSub.unsubscribe();
    this.wordNextSub.unsubscribe();
  }

  startLesson(): void {
    this.lessonState.dispatch(new StartLessonAction());
  }

  check(): void {
    this.lessonState.dispatch(new CheckAnswerAction());
  }

  correct(): void {
    this.lessonState.dispatch(new AnswerAction({ wordId: this.currectWord.id, isCorrect: true }));
  }

  incorrect(): void {
    this.lessonState.dispatch(new AnswerAction({ wordId: this.currectWord.id, isCorrect: false }));
  }

  private handleLessonStateEnum(storeValue: LessonStateEnum): void {
    this.lessonStateEnum = storeValue;
    this.startVisibility = this.lessonStateEnum === LessonStateEnum.BeforeStart;
    this.checkVisibility = this.lessonStateEnum === LessonStateEnum.WordDisplay;
    this.answerVisibility = this.lessonStateEnum === LessonStateEnum.AnswerDisplay;
  }
}
