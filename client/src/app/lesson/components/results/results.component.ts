import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultsService } from './services/results/results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() withAccepted: boolean;

  remainingCardsCount$: Observable<number>;
  wrong$: Observable<number>;
  accepted$: Observable<number>;
  correct$: Observable<number>;
  total$: Observable<number>;

  constructor(private readonly service: ResultsService) { }

  ngOnInit(): void {
    this.wrong$ = this.service.getWrong();
    this.accepted$ = this.service.getAccepted();
    this.correct$ = this.service.getCorrect();
    this.total$ = this.service.getTotal();
    this.remainingCardsCount$ = this.service.getRemainingCards();
  }

}
