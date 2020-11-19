import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RepeatWord } from '../../models/repeat-word.model';
import * as action from '../../store/actions';
import * as selector from '../../store/selectors';
import { DashbordState } from '../../store/state';

@Injectable()
export class DashboardService {

    constructor(private readonly store: Store<DashbordState>,
        private readonly router: Router) { }

    init(): void {
        this.store.dispatch(new action.GetNextRepeat());
        this.store.dispatch(new action.GetNewstCard());
        this.store.dispatch(new action.GetLastFailed());
        this.store.dispatch(new action.GetTodayCardsCount());
        this.store.dispatch(new action.GetLastLessonDate());
        this.store.dispatch(new action.GetGroupsCount());
        this.store.dispatch(new action.GetCardsCount());
    }

    getLastFailed(): Observable<RepeatWord> {
        return this.store.select(selector.selectLastFailed);
    }

    getNextRepeat(): Observable<RepeatWord> {
        return this.store.select(selector.selectNextRepeat);
    }

    getNewestCard(): Observable<RepeatWord> {
        return this.store.select(selector.selectNewestCard);
    }

    getCardToRepeat(): Observable<number> {
        return this.store.select(selector.selectCardToRepeat);
    }

    getLastRepeat(): Observable<Date> {
        return this.store.select(selector.selectLastRepeat);
    }

    getGroupsCount(): Observable<number> {
        return this.store.select(selector.selectGroupsCount);
    }

    getCardsCount(): Observable<number> {
        return this.store.select(selector.selectCardsCount);
    }

    lesson() {
        this.router.navigate(['/lesson/fiszki']);
    }

    cards() {
        this.router.navigate(['/cards']);
    }

    groups() {
        this.router.navigate(['/groups']);
    }

    history() {
        this.router.navigate(['/history']);
    }
}
