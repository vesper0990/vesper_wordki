import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LessonResult } from '../../models/lesson-result';
import { SummaryService } from './services/summary/summary.service';

@Component({
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {

  result$: Observable<LessonResult>;

  constructor(private readonly service: SummaryService) { }

  ngOnInit(): void {
    this.result$ = this.service.getResults();
  }

  finish(): void {
    this.service.finish();
  }
}
