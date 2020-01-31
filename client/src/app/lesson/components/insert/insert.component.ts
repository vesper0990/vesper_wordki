import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { LessonStateEnum, LessonStep } from '../../models/lesson-state';
import { WordRepeat } from '../../models/word-repeat';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { getLessonStateEnum, getFirstWord } from '../../store/selectors';
import { Subscription } from 'rxjs';
import { CheckAnswerAction, AnswerAction, SetLastAnswerAction } from '../../store/actions';
import { WordComparerService } from '../../services/word-comparer/word-comparer.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit, OnDestroy {

  private readonly arrowLeft = 'ArrowLeft';
  private readonly arrowRight = 'ArrowRight';
  private readonly enter = 'Enter';

  private lessonStateSub: Subscription;
  private wordSub: Subscription;

  @ViewChild('answerElement', { static: false }) inputElement: ElementRef;

  lessonStep: LessonStep;
  word: WordRepeat;

  questionVisibility: boolean;
  answer: string;
  answerIsEnable: boolean;

  result: string;
  isCorrect: boolean;

  constructor(private lessonStore: Store<LessonState>,
    private wordComparer: WordComparerService) { }

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
      case this.enter:
        this.handleEnter();
        break;
    }
  }

  private handleArrowRight(): void {
    this.lessonStore.dispatch(
      this.lessonStep.step === LessonStateEnum.WordDisplay
        ? new CheckAnswerAction()
        : new AnswerAction({ wordId: this.word.id, result: this.isCorrect ? 1 : 0 })
    );
  }

  private handleArrowLeft(): void {
    this.lessonStore.dispatch(
      this.lessonStep.step === LessonStateEnum.WordDisplay
        ? new CheckAnswerAction()
        : new AnswerAction({ wordId: this.word.id, result: -1 })
    );
  }

  private handleEnter(): void {
    if (this.lessonStep.step === LessonStateEnum.WordDisplay) {
      this.lessonStore.dispatch(new CheckAnswerAction());
    } else if (this.lessonStep.step === LessonStateEnum.AnswerDisplay) {
      this.lessonStore.dispatch(new AnswerAction({ wordId: this.word.id, result: this.isCorrect ? 1 : -1 }));
    }
  }

  private handleLessonStep(lessonStep: LessonStep): void {
    this.lessonStep = lessonStep;
    this.questionVisibility = this.lessonStep.questionVisibility;
    this.answerIsEnable = this.lessonStep.answerIsEnable;
    switch (this.lessonStep.step) {
      case LessonStateEnum.WordDisplay: {
        this.answer = '';
        this.result = '';
        setTimeout(() => this.inputElement.nativeElement.focus(), 0);
        break;
      }
      case LessonStateEnum.AnswerDisplay: {
        this.isCorrect = this.wordComparer.isCorrect(this.word.language2, this.answer);
        this.lessonStore.dispatch(new SetLastAnswerAction({ isCorrect: this.isCorrect }));
        this.result = this.isCorrect ? 'dobrze' : 'zle';
        break;
      }
    }
  }

  private handleFirstWord(wordRepeat: WordRepeat): void {
    this.word = wordRepeat;
    console.log(this.word);
  }

}
