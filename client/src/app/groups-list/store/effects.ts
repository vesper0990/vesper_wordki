import { Actions, Effect, ofType } from '@ngrx/effects';
import { GroupProviderBase } from '../services/group.provider/group.provider';
import { GroupListTypes, SetGroupListAction, UpdateGroupInList, UpdateGroupInListSuccess } from './actions';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Group } from '../models/group.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupListEffects {

    @Effect() getGroupListEffect = this.actions$.pipe(
        ofType(GroupListTypes.GetGroupList),
        mergeMap(() => this.groupProvider.getGroups()),
        map((groups: Group[]) => new SetGroupListAction({ groups: groups })),
        catchError(error => this.handleError(error))
    );

    @Effect() updateGroupInListEffect = this.actions$.pipe(
        ofType(GroupListTypes.UpdateGroupInList),
        switchMap((action: UpdateGroupInList) =>
            this.groupProvider.updateGroup(action.payload.group).pipe(
                map(() => new UpdateGroupInListSuccess({ group: action.payload.group }))
            ))
    );

    constructor(private actions$: Actions,
        private groupProvider: GroupProviderBase) { }

    private handleError(error: any): Observable<any> {
        console.log(error);
        throw error;
    }
}
