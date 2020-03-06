import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { GroupDetailsTypes, GetGroupDetailsAction, SetGroupDetailsAction, GetWordsAction } from './actions';
import { GroupDetailsProviderBase } from '../services/group-details.provider/group-details.provider';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GroupDetails } from '../models/group-details.model';

@Injectable()
export class GroupDetailsEffects {

    @Effect() getGroupDetailsEffect = this.actions$.pipe(
        ofType(GroupDetailsTypes.GetGroupDetails),
        mergeMap((action: GetGroupDetailsAction) => this.groupDetailsProvider.getGroupDetails(action.payload.groupId)),
        map((groupDetails: GroupDetails) => new SetGroupDetailsAction({ groupDetails: groupDetails })),
        catchError(error => this.handleError(error))
    );

    @Effect() getWordsEffect = this.actions$.pipe(
        ofType(GroupDetailsTypes.GetWords),
        mergeMap((action: GetWordsAction) => this.groupDetailsProvider.getGroupDetails(action.payload.groupId)),
        map((groupDetails: GroupDetails) => new SetGroupDetailsAction({ groupDetails: groupDetails })),
        catchError(error => this.handleError(error))
    );

    constructor(private actions$: Actions,
        private groupDetailsProvider: GroupDetailsProviderBase) {

    }

    private handleError(error: any): Observable<any> {
        console.log(error);
        throw error;
    }
}
