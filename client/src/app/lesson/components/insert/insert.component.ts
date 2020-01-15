import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LessonStateEnum, LessonStep } from '../../models/lesson-state';
import { WordRepeat } from '../../models/word-repeat';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { getLessonStateEnum, getFirstWord } from '../../store/selectors';
import { Subscription } from 'rxjs';
import { CheckAnswerAction, AnswerAction } from '../../store/actions';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit, OnDestroy {

  private readonly arrowLeft = 'ArrowLeft';
  private readonly arrowRight = 'ArrowRight';

  private lessonStateSub: Subscription;
  private wordSub: Subscription;

  lessonStep: LessonStep;
  word: WordRepeat;

  questionVisibility: boolean;
  answer: string;
  answerIsEnable: boolean;

  result: string;

  constructor(private lessonStore: Store<LessonState>) { }

  ngOnInit(): void {
    this.answerIsEnable = false;
    this.questionVisibility = false;
    this.answer = '';
    this.lessonStateSub = this.lessonStore.select(getLessonStateEnum)
      .subscribe((storeValue: LessonStep) => this.handleLessonStep(storeValue));

    this.wordSub = this.lessonStore.select(getFirstWord)
      .subscribe((storeValue: WordRepeat) => this.handleFirstWord(storeValue));

  }

  ngOnDestroy(): void {
    this.lessonStateSub.unsubscribe();
    this.wordSub.unsubscribe();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (this.lessonStep.step === 0) {
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

  private handleArrowRight(): void {
    this.lessonStore.dispatch(
      this.lessonStep.step === LessonStateEnum.WordDisplay
        ? new CheckAnswerAction()
        : new AnswerAction({ wordId: this.word.id, isCorrect: true })
    );
  }

  private handleArrowLeft(): void {
    this.lessonStore.dispatch(
      this.lessonStep.step === LessonStateEnum.WordDisplay
        ? new CheckAnswerAction()
        : new AnswerAction({ wordId: this.word.id, isCorrect: false })
    );
  }

  private handleLessonStep(lessonStep: LessonStep): void {
    this.lessonStep = lessonStep;
    this.questionVisibility = this.lessonStep.questionVisibility;
    this.answerIsEnable = this.lessonStep.answerIsEnable;
    switch (this.lessonStep.step) {
      case LessonStateEnum.WordDisplay: {
        this.answer = '';
        this.result = '';
        break;
      }
      case LessonStateEnum.AnswerDisplay: {
        this.result = this.word.language2 === this.answer ? 'dobrze' : 'zle';
        break;
      }
    }
  }

  private handleFirstWord(wordRepeat: WordRepeat): void {
    this.word = wordRepeat;
    console.log(this.word);
  }

}
