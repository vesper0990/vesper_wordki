import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
    GroupDetailsTypes,
    GetGroupDetailsAction,
    SetGroupDetailsAction,
    GetWordsAction, SetWordsAction,
    UpdateWordAction,
    UpdateWordSuccessAction,
    AddWordAction,
    RemoveWordAction,
    RemoveWordSuccessAction,
    AddGroupAction,
    ChangeGroupVisibilityAction,
    ChangeGroupVisibilitySuccessAction
} from './actions';
import { GroupDetailsProviderBase } from '../services/group-details.provider/group-details.provider';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GroupDetails } from '../models/group-details.model';
import { Word } from '../models/word.model';
import { Router } from '@angular/router';

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
        mergeMap((action: GetWordsAction) => this.groupDetailsProvider.getWords(action.payload.groupId)),
        map((words: Word[]) => new SetWordsAction({ words: words })),
        catchError(error => this.handleError(error))
    );

    @Effect() updateWordEffect = this.actions$.pipe(
        ofType(GroupDetailsTypes.UpdateWord),
        switchMap((action: UpdateWordAction) => this.groupDetailsProvider.updateWord(action.payload.editword).pipe(
            map(() => new UpdateWordSuccessAction({ editWord: action.payload.editword }))
        ))
    );

    @Effect() addWordEffect = this.actions$.pipe(
        ofType(GroupDetailsTypes.AddWord),
        switchMap((action: AddWordAction) => this.groupDetailsProvider.addWord(action.payload.editword).pipe(
            map(() => new GetWordsAction({ groupId: action.payload.editword.groupId }))
        ))
    );

    @Effect() removeWordEffect = this.actions$.pipe(
        ofType(GroupDetailsTypes.RemoveWord),
        switchMap((action: RemoveWordAction) => this.groupDetailsProvider.removeWord(action.payload.groupId, action.payload.wordId).pipe(
            map(() => new RemoveWordSuccessAction({ wordId: action.payload.wordId }))
        ))
    );


    @Effect({ dispatch: false })
    addGroupEffect = this.actions$.pipe(
        ofType(GroupDetailsTypes.AddGroup),
        switchMap((action: AddGroupAction) => this.groupDetailsProvider.addGroup(action.payload.group).pipe(
            map(() => {
                this.router.navigate(['/groups']);
            })
        ))
    );

    @Effect() changeGroupVisibilityEffect = this.actions$.pipe(
        ofType(GroupDetailsTypes.ChangeGroupVisibility),
        switchMap((action: ChangeGroupVisibilityAction) => this.groupDetailsProvider.changeGroupVisibility(action.payload.groupId).pipe(
            map(() => new ChangeGroupVisibilitySuccessAction(action.payload))
        ))
    );

    constructor(private actions$: Actions,
        private groupDetailsProvider: GroupDetailsProviderBase,
        private router: Router) {

    }

    private handleError(error: any): Observable<any> {
        console.log(error);
        throw error;
    }
}
