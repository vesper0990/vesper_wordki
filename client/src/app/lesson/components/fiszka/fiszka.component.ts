import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { Subscription, Observable } from 'rxjs';
import { getLessonStateEnum, getFirstWord, getLessonSettings } from '../../store/selectors';
import { LessonStateEnum, LessonStep } from '../../models/lesson-state';
import { WordRepeat } from '../../models/word-repeat';
import { AnswerAction, CheckAnswerAction } from '../../store/actions';
import { map, filter } from 'rxjs/operators';
import { CardModel } from 'src/app/share/components/card/card.model';
import { LessonSettings } from '../../models/lesson-settings';

@Component({
  selector: 'app-fiszka',
  templateUrl: './fiszka.component.html',
  styleUrls: ['./fiszka.component.scss']
})
export class FiszkaComponent implements OnInit, OnDestroy {

  private readonly arrowLeft = 'ArrowLeft';
  private readonly arrowRight = 'ArrowRight';

  private lessonStateSub: Subscription;

  word$: Observable<CardModel>;
  wordId: number;

  lessonStep$: Observable<LessonStep>;
  lessonState: LessonStateEnum;

  lessonSettings$: Observable<LessonSettings>;

  questionVisibility: boolean;
  answerVisibility: boolean;

  constructor(private lessonStore: Store<LessonState>) { }

  ngOnInit(): void {
    this.lessonSettings$ = this.lessonStore.select(getLessonSettings);

    this.lessonStep$ = this.lessonStore.select(getLessonStateEnum).pipe(
      map((step: LessonStep) => {
        this.lessonState = step.state;
        return step;
      })
    );

    this.word$ = this.lessonStore.select(getFirstWord).pipe(
      filter((word: WordRepeat) => {
        return word !== null && word !== undefined;
      }),
      map((word: WordRepeat) => {
        this.wordId = word.id;
        return {
          groupName: word.groupName,
          groupLanguage1: word.groupLanguage1,
          groupLanguage2: word.groupLanguage2,
          language1: word.language1,
          language2: word.language2,
          example1: word.example1,
          example2: word.example2,
          drawer: word.drawer
        } as CardModel;
      })
    );
  }

  ngOnDestroy(): void {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    if (this.lessonState === 0) {
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

  getCardSide(lessonStep: LessonStep, lessonSettings: LessonSettings, word: CardModel): string {
    console.log('test');
    if (lessonStep.answerVisibility) {
      if (lessonSettings.answerLanguage === word.groupLanguage1) {
        return 'language1';
      } else {
        return 'language2';
      }
    } else {
      if (lessonSettings.questionLanguage === word.groupLanguage1) {
        return 'language1';
      } else {
        return 'language2';
      }
    }
  }

  private handleArrowRight(): void {
    this.lessonStore.dispatch(
      this.lessonState === LessonStateEnum.WordDisplay
        ? new CheckAnswerAction()
        : new AnswerAction({ wordId: this.wordId, result: 1 })
    );
  }

  private handleArrowLeft(): void {
    this.lessonStore.dispatch(
      this.lessonState === LessonStateEnum.WordDisplay
        ? new CheckAnswerAction()
        : new AnswerAction({ wordId: this.wordId, result: -1 })
    );
  }
}
