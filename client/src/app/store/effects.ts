import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ErrorService } from '../share/components/error/services/error/error-service';
import { Navigate, RequestFailed, RootTypes } from './actions';

@Injectable()
export class RootEffects {

    constructor(private readonly actions$: Actions,
        private readonly errorService: ErrorService,
        private readonly router: Router) { }

    @Effect({ dispatch: false })
    public requestFailed$ = this.actions$.pipe(
        ofType<RequestFailed>(RootTypes.RequestFailed),
        tap(error => this.errorService.setError(error.payload.error, error.payload))
    );

    @Effect({ dispatch: false })
    public navigate$ = this.actions$.pipe(
        ofType<Navigate>(RootTypes.Navigate),
        tap(action => this.router.navigate(action.payload.command))
    );
}
