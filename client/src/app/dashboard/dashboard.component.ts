import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { RepeatWord } from './models/repeat-word.model';
import { DashboardService } from './services/dashboard/dashboard.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  lastFailed$: Observable<RepeatWord>;
  nextRepeat$: Observable<RepeatWord>;
  newestCard$: Observable<RepeatWord>;

  cardToRepeat$: Observable<number>;
  isCardToRepeatReady$: Observable<boolean>;

  lastRepeat$: Observable<Date>;

  groupsCount$: Observable<number>;
  isGroupsCountReady$: Observable<boolean>;

  cardsCount$: Observable<number>;
  isCardsCountReady$: Observable<boolean>;

  constructor(private readonly service: DashboardService,
    private readonly titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Wordki - Dashboard');
    this.service.init();
    this.lastFailed$ = this.service.getLastFailed();
    this.newestCard$ = this.service.getNewestCard();
    this.nextRepeat$ = this.service.getNextRepeat();
    this.cardToRepeat$ = this.service.getCardToRepeat();

    this.lastRepeat$ = this.service.getLastRepeat();
    this.isCardToRepeatReady$ = this.service.getLastRepeat().pipe(
      map(value => value !== null)
    );

    this.groupsCount$ = this.service.getGroupsCount();
    this.isGroupsCountReady$ = this.service.getGroupsCount().pipe(
      map(value => value !== null)
    );

    this.cardsCount$ = this.service.getCardsCount();
    this.isCardsCountReady$ = this.service.getCardsCount().pipe(
      map(value => value !== null)
    );
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
