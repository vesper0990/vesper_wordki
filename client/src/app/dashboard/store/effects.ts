import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { DashboardHttpServiceBase } from '../services/dashbaord-http/dashboard-http.service';
import * as actions from './actions';
import { DashbordState } from './state';

@Injectable()
export class DashboardEffects {

    constructor(private readonly store: Store<DashbordState>,
        private readonly actions$: Actions,
        private readonly dataProvider: DashboardHttpServiceBase) { }

    @Effect()
    public getLastFailed$ = this.actions$.pipe(
        ofType<actions.GetLastFailed>(actions.DashboardActionsEnum.GET_LAST_FAILED),
        exhaustMap(() => this.dataProvider.getLastFailed()),
        map(value => new actions.GetLastFailedSuccess({ card: value })),
        catchError(error => of(new actions.RequestFailed({ error: error })))
    );

    @Effect()
    public getNextRepeat$ = this.actions$.pipe(
        ofType(actions.DashboardActionsEnum.GET_NEXT_REPEAT),
        exhaustMap(() => this.dataProvider.getNextRepeatWord()),
        map(value => new actions.GetNextRepeatSuccess({ card: value })),
        catchError(error => of(new actions.RequestFailed({ error: error })))
    );

    @Effect()
    public getNewestCard$ = this.actions$.pipe(
        ofType(actions.DashboardActionsEnum.GET_NEWST_CARD),
        exhaustMap(() => this.dataProvider.getLastWords(1)),
        map(value => new actions.GetNewstCardSuccess({ card: value })),
        catchError(error => of(new actions.RequestFailed({ error: error })))
    );

    @Effect()
    public getTodayCard$ = this.actions$.pipe(
        ofType(actions.DashboardActionsEnum.GET_TODAY_CARD_COUNT),
        exhaustMap(() => this.dataProvider.getTodayRepeatCount()),
        map(value => new actions.GetTodayCardsCountSuccess({ cardToRepeat: value })),
        catchError(error => of(new actions.RequestFailed({ error: error })))
    );

    @Effect()
    public getLastLesson$ = this.actions$.pipe(
        ofType(actions.DashboardActionsEnum.GET_LAST_LESSON),
        exhaustMap(() => this.dataProvider.getLastLesson()),
        map(value => new actions.GetLastLessonDateSuccess({ lastLesson: value })),
        catchError(error => of(new actions.RequestFailed({ error: error })))
    );

    @Effect()
    public getGroupsCount$ = this.actions$.pipe(
        ofType(actions.DashboardActionsEnum.GET_GROUPS_COUNT),
        exhaustMap(() => this.dataProvider.getGroupsCount()),
        map(value => new actions.GetGroupsCountSuccess({ groupsCount: value })),
        catchError(error => of(new actions.RequestFailed({ error: error })))
    );

    @Effect()
    public getCardsCount$ = this.actions$.pipe(
        ofType(actions.DashboardActionsEnum.GET_CARDS_COUNT),
        exhaustMap(() => this.dataProvider.getWordsCount()),
        map(value => new actions.GetCardsCountSuccess({ cardsCount: value })),
        catchError(error => of(new actions.RequestFailed({ error: error })))
    );
}
