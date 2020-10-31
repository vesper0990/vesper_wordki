import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { RepeatWord } from "../../models/repeat-word.model";
import { GetDashboardInfo, GetLastFailed, GetNewstCard, GetNextRepeat } from "../../store/actions";
import { selectCardsCount, selectCardToRepeat, selectGroupsCount, selectLastFailed, selectLastRepeat, selectNewestCard, selectNextRepeat } from "../../store/selectors";
import { DashbordState } from "../../store/state";

@Injectable()
export class DashboardService {

    constructor(private readonly store: Store<DashbordState>,
        private readonly router: Router) { }

    init(): void {
        this.store.dispatch(new GetNextRepeat());
        this.store.dispatch(new GetNewstCard());
        this.store.dispatch(new GetLastFailed());
        this.store.dispatch(new GetDashboardInfo());
    }

    getLastFailed(): Observable<RepeatWord> {
        return this.store.select(selectLastFailed);
    }

    getNextRepeat(): Observable<RepeatWord> {
        return this.store.select(selectNextRepeat);
    }

    getNewestCard(): Observable<RepeatWord> {
        return this.store.select(selectNewestCard);
    }

    getCardToRepeat(): Observable<number> {
        return this.store.select(selectCardToRepeat);
    }

    getLastRepeat(): Observable<number> {
        return this.store.select(selectLastRepeat);
    }

    getGroupsCount(): Observable<number> {
        return this.store.select(selectGroupsCount);
    }

    getCardsCount(): Observable<number> {
        return this.store.select(selectCardsCount);
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