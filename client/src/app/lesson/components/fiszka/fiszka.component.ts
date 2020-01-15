import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { Subscription } from 'rxjs';
import { getLessonStateEnum, getFirstWord } from '../../store/selectors';
import { LessonStateEnum, LessonStep } from '../../models/lesson-state';
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

  lessonStep: LessonStep;
  word: WordRepeat;
  questionVisibility: boolean;
  answerVisibility: boolean;

  constructor(private lessonStore: Store<LessonState>) { }

  ngOnInit(): void {
    this.lessonStateSub = this.lessonStore.select(getLessonStateEnum)
      .subscribe((storeValue: LessonStep) => this.handleLessonStateEnum(storeValue));

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

  private handleLessonStateEnum(storeValue: LessonStep): void {
    this.lessonStep = storeValue;
    this.questionVisibility = this.lessonStep.questionVisibility;
    this.answerVisibility = this.lessonStep.questionVisibility;
  }

  private handleFirstWord(storeValue: WordRepeat): void {
    this.word = storeValue;
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
}
