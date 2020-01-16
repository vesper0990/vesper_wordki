import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from './store/reducer';
import { FinishLessonAction } from './store/actions';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit, OnDestroy {

  constructor(private lessonStore: Store<LessonState>) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('test');
    this.lessonStore.dispatch(new FinishLessonAction());
  }

}
