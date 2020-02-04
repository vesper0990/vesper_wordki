import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { Subscription } from 'rxjs';
import { getLessonStateEnum, getFirstWord, getLastAnswer } from '../../store/selectors';
import { LessonStep } from '../../models/lesson-state';
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
  private lastAnswerSub: Subscription;

  private currectWord: WordRepeat;
  private lastAnswer: boolean;

  lessonStep: LessonStep;
  startVisibility: boolean;
  checkVisibility: boolean;
  answerVisibility: boolean;


  constructor(private lessonState: Store<LessonState>) { }

  ngOnInit() {
    this.lessonStateSub = this.lessonState.select(getLessonStateEnum).subscribe(
      (storeValue: LessonStep) => this.handleLessonStateEnum(storeValue)
    );

    this.wordNextSub = this.lessonState.select(getFirstWord).subscribe(
      (storeValue: WordRepeat) => this.currectWord = storeValue
    );

    this.lastAnswerSub = this.lessonState.select(getLastAnswer).subscribe(
      (storeValue: boolean) => this.lastAnswer = storeValue
    );
  }

  ngOnDestroy(): void {
    this.lessonStateSub.unsubscribe();
    this.wordNextSub.unsubscribe();
    this.lastAnswerSub.unsubscribe();
  }

  startLesson(): void {
    this.lessonState.dispatch(new StartLessonAction());
  }

  check(): void {
    this.lessonState.dispatch(new CheckAnswerAction());
  }

  correct(): void {
    this.lessonState.dispatch(new AnswerAction({ wordId: this.currectWord.id, result: this.lastAnswer ? 1 : 0 }));
  }

  incorrect(): void {
    this.lessonState.dispatch(new AnswerAction({ wordId: this.currectWord.id, result: -1 }));
  }

  private handleLessonStateEnum(storeValue: LessonStep): void {
    this.lessonStep = storeValue;
    this.startVisibility = this.lessonStep.startVisibility;
    this.checkVisibility = this.lessonStep.checkVisibility;
    this.answerVisibility = this.lessonStep.answerVisibility;
  }
}
