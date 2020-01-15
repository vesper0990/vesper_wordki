import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { GetWordsAction } from '../../store/actions';

@Component({
  templateUrl: './inserting.component.html',
  styleUrls: ['./inserting.component.scss']
})
export class InsertingComponent implements OnInit {

  constructor(private lessonStore: Store<LessonState>) { }

  ngOnInit() {
    this.lessonStore.dispatch(new GetWordsAction({ count: 2 }));
  }

}
