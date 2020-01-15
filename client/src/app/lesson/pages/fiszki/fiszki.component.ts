import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { GetWordsAction } from '../../store/actions';

@Component({
  templateUrl: './fiszki.component.html',
  styleUrls: ['./fiszki.component.scss']
})
export class FiszkiComponent implements OnInit, OnDestroy {

  constructor(private lessonStore: Store<LessonState>) {
  }

  ngOnInit(): void {
    this.lessonStore.dispatch(new GetWordsAction({ count: 2 }));
  }

  ngOnDestroy(): void {
  }

}
