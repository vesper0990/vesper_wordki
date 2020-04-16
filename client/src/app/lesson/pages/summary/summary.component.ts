import { Component, OnInit, OnDestroy } from '@angular/core';
import { LessonState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { ResetStoreAction } from '../../store/actions';
import { Observable } from 'rxjs';
import { LessonResult } from '../../models/lesson-result';
import { getLessonResult } from '../../store/selectors';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  result$: Observable<LessonResult>;

  constructor(private lessonStore: Store<LessonState>) { }

  ngOnInit() {
    this.result$ = this.lessonStore.select(getLessonResult);
  }

  ngOnDestroy(): void {
    this.resetStore();
  }

  private resetStore(): void {
    this.lessonStore.dispatch(new ResetStoreAction());
  }

}
