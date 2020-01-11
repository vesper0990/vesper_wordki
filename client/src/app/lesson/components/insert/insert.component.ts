import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonStateEnum } from '../../models/lesson-state';
import { WordRepeat } from '../../models/word-repeat';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { getLessonStateEnum, getFirstWord } from '../../store/selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit, OnDestroy {


  private lessonStateSub: Subscription;
  private wordSub: Subscription;

  lessonStateEnum: LessonStateEnum;
  word: WordRepeat;

  answer: string;
  answerIsEnable: boolean;

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

  private handleLessonStateEnum(lessonStateEnum: LessonStateEnum): void {

  }

  private handleFirstWord(wordRepeat: WordRepeat): void {

  }

}
