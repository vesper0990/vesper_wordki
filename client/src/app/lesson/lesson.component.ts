import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from './store/reducer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
