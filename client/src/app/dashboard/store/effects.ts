import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { DashboardHttpServiceBase } from "../services/dashbaord-http/dashboard-http.service";
import { DashboardActionsEnum, GetDashboardInfoFailed, GetDashboardInfoSuccess, GetLastFailed, GetLastFailedFailed, GetLastFailedSuccess, GetNewstCardFailed, GetNewstCardSuccess, GetNextRepeatFailed, GetNextRepeatSuccess } from "./actions";
import { DashbordState } from "./state";

@Injectable()
export class DashboardEffects {

    constructor(private readonly store: Store<DashbordState>,
        private readonly actions$: Actions,
        private readonly dataProvider: DashboardHttpServiceBase) { }

    @Effect()
    public getLastFailed$ = this.actions$.pipe(
        ofType<GetLastFailed>(DashboardActionsEnum.GET_LAST_FAILED),
        exhaustMap(() => this.dataProvider.getLastFailed()),
        map(value => new GetLastFailedSuccess({ card: value })),
        catchError(error => of(new GetLastFailedFailed({ error: error })))
    );

    @Effect()
    public getNextRepeat$ = this.actions$.pipe(
        ofType(DashboardActionsEnum.GET_NEXT_REPEAT),
        exhaustMap(() => this.dataProvider.getNextRepeatWord()),
        map(value => new GetNextRepeatSuccess({ card: value })),
        catchError(error => of(new GetNextRepeatFailed({ error: error })))
    );

    @Effect()
    public getNewestCard$ = this.actions$.pipe(
        ofType(DashboardActionsEnum.GET_NEWST_CARD),
        exhaustMap(() => this.dataProvider.getLastWords(1)),
        map(value => new GetNewstCardSuccess({ card: value[0] })),
        catchError(error => of(new GetNewstCardFailed({ error: error })))
    )

    @Effect()
    public getDashbaordInfo$ = this.actions$.pipe(
        ofType(DashboardActionsEnum.GET_DASHBOARD_INFO),
        exhaustMap(() => this.dataProvider.getInformation()),
        map(value => new GetDashboardInfoSuccess({ dto: value })),
        catchError(error => of(new GetDashboardInfoFailed({ error: error })))
    )
}