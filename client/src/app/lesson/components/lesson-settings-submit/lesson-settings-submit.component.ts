import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SubmitSettings } from '../../store/actions';
import { selectSettingsSubmitDisabled } from '../../store/selectors';
import { LessonState } from '../../store/state';

@Component({
  selector: 'app-lesson-settings-submit',
  templateUrl: './lesson-settings-submit.component.html',
  styleUrls: ['./lesson-settings-submit.component.scss']
})
export class LessonSettingsSubmitComponent implements OnInit {

  submitDisabled$: Observable<boolean>;

  constructor(private readonly store: Store<LessonState>) { }

  ngOnInit(): void {
    this.submitDisabled$ = this.store.select(selectSettingsSubmitDisabled);
  }

  startLesson(): void {
    this.store.dispatch(new SubmitSettings());
  }
}
