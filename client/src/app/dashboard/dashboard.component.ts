import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RepeatWord } from './models/repeat-word.model';
import { DashboardService } from './services/dashboard/dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  lastFailed$: Observable<RepeatWord>;
  nextRepeat$: Observable<RepeatWord>;
  newestCard$: Observable<RepeatWord>;
  cardToRepeat$: Observable<number>;
  lastRepeat$: Observable<Date>;
  groupsCount$: Observable<number>;
  cardsCount$: Observable<number>;

  constructor(private readonly service: DashboardService) { }

  ngOnInit(): void {
    this.service.init();
    this.lastFailed$ = this.service.getLastFailed();
    this.newestCard$ = this.service.getNewestCard();
    this.nextRepeat$ = this.service.getNextRepeat();
    this.cardToRepeat$ = this.service.getCardToRepeat();
    this.lastRepeat$ = this.service.getLastRepeat();
    this.groupsCount$ = this.service.getGroupsCount();
    this.cardsCount$ = this.service.getCardsCount();
  }

  startLesson(): void {
    this.service.lesson();
  }

  history(): void {
    this.service.history();
  }

  groups(): void {
    this.service.groups();
  }

  cards(): void {
    this.service.cards();
  }
}
