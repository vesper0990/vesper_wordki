import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ErrorService } from '../share/components/error/services/error/error-service';
import { RequestFailed, RootTypes } from './actions';

@Injectable()
export class RootEffects {

    constructor(private readonly actions$: Actions,
        private readonly errorService: ErrorService) { }

    @Effect({ dispatch: false })
    public requestFailed$ = this.actions$.pipe(
        ofType<RequestFailed>(RootTypes.RequestFailed),
        tap(error => this.errorService.setError(error.payload.error, error.payload))
    );
}
