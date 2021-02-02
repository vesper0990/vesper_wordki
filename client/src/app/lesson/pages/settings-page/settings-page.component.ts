import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetLessonOptions } from '../../store/actions';
import { LessonState } from '../../store/state';

@Component({
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  constructor(private readonly router: Router,
    private readonly store: Store<LessonState>) { }

  ngOnInit(): void {
    this.store.dispatch(new GetLessonOptions());
  }
}
