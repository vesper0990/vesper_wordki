import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { Subscription } from 'rxjs';
import { getFirstWord } from '../../store/selectors';
import { WordRepeat } from '../../models/word-repeat';
import { WordProviderBase } from '../../services/word.provider/word.provider';
import { SetWordsAction, GetWordsAction } from '../../store/actions';
import { Router } from '@angular/router';

@Component({
  templateUrl: './repeat.component.html',
  styleUrls: ['./repeat.component.scss']
})
export class RepeatComponent implements OnInit, OnDestroy {

  private testSub: Subscription;

  word: WordRepeat;

  constructor(private lessonStore: Store<LessonState>,
    private wordProvider: WordProviderBase,
    private router: Router) {
  }

  ngOnInit(): void {
    this.testSub = this.lessonStore.select(getFirstWord)
      .subscribe((storeValue: WordRepeat) => { this.word = storeValue; });

    this.lessonStore.dispatch(new GetWordsAction({ count: 2 }));
    // this.wordProvider.getNextWord(2).subscribe(
    //   (words: WordRepeat[]) => this.handleGetNextWords(words),
    //   (error: any) => this.handleError(error));
  }

  ngOnDestroy(): void {
    this.testSub.unsubscribe();
  }

  private handleGetNextWords(words: WordRepeat[]): void {
    this.lessonStore.dispatch(new SetWordsAction(words));
  }

  private handleError(error: any): void {
    console.error(error);
    this.router.navigate(['error']);
  }

}
