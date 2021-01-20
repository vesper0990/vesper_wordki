import { Actions, Effect, ofType } from '@ngrx/effects';
import { GroupsListHttpServiceBase } from '../services/groups-list-http/groups-list-http.service.base';
import * as actions from './actions';
import { map, catchError, exhaustMap, concatMap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Group } from 'src/app/share/models/card-details';
import { RequestFailed } from 'src/app/store/actions';

@Injectable()
export class GroupListEffects {

    constructor(private readonly actions$: Actions,
        private readonly groupProvider: GroupsListHttpServiceBase) { }

    @Effect()
    getGroupListEffect = this.actions$.pipe(
        ofType<actions.GetGroups>(actions.GroupListTypes.GET_GROUPS),
        exhaustMap(() => this.groupProvider.getGroups()),
        map((groups: Group[]) => new actions.GetGroupsSuccess({ groups: groups })),
        catchError(error => of(new RequestFailed({ error: error })))
    );

    @Effect()
    updateGroupInListEffect = this.actions$.pipe(
        ofType<actions.UpdateGroup>(actions.GroupListTypes.UPDATE_GROUP),
        switchMap((action: actions.UpdateGroup) =>
            this.groupProvider.updateGroup(action.payload.group).pipe(
                map(() => action.payload.group)
            )
        ),
        concatMap(group => [
            new actions.UpdateGroupSuccess({ group: group }),
            new actions.HideDialog()
        ]),
        catchError(error => of(new RequestFailed({ error: error })))
    );

    @Effect()
    addGroupToListEffect = this.actions$.pipe(
        ofType<actions.AddGroup>(actions.GroupListTypes.ADD_GROUP),
        exhaustMap((action: actions.AddGroup) => forkJoin([
            of(action.payload.group),
            this.groupProvider.addGroup(action.payload.group)
        ])),
        concatMap(data => [
            new actions.AddGroupSuccess({ group: data[0], groupId: data[1] }),
            new actions.HideDialog()
        ]),
        catchError(error => of(new RequestFailed({ error: error })))
    );

    @Effect()
    removeGroupEffect = this.actions$.pipe(
        ofType<actions.RemoveGroup>(actions.GroupListTypes.REMOVE_GROUP),
        switchMap(action =>
            this.groupProvider.removeGroup(action.payload.groupId).pipe(
                map(() => action.payload.groupId)
            )
        ),
        concatMap(groupId => [
            new actions.RemoveGroupSuccess({ groupId: groupId }),
            new actions.HideDialog()
        ]),
        catchError(error => of(new RequestFailed({ error: error })))
    );
}
