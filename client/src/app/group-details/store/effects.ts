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
    AddWordSuccessAction
} from './actions';
import { GroupDetailsProviderBase } from '../services/group-details.provider/group-details.provider';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GroupDetails } from '../models/group-details.model';
import { Word } from '../models/word.model';

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
        switchMap((action: UpdateWordAction) => this.groupDetailsProvider.updateWord(action.payload.word, action.payload.groupId).pipe(
            map(() => new UpdateWordSuccessAction({ word: action.payload.word }))
        ))
    );

    @Effect() addWordEffect = this.actions$.pipe(
        ofType(GroupDetailsTypes.AddWord),
        switchMap((action: AddWordAction) => this.groupDetailsProvider.addWord(action.payload.word, action.payload.groupId).pipe(
            map(() => new AddWordSuccessAction({ word: action.payload.word }))
        ))
    );

    constructor(private actions$: Actions,
        private groupDetailsProvider: GroupDetailsProviderBase) {

    }

    private handleError(error: any): Observable<any> {
        console.log(error);
        throw error;
    }
}
