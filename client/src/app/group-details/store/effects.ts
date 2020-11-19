import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as actions from './actions';
import { GroupDetailsProviderBase } from '../services/group-details.provider/group-details.provider';
import { mergeMap, map, catchError, tap, concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GroupDetails } from '../models/group-details.model';
import { Word } from '../models/word.model';

@Injectable()
export class GroupDetailsEffects {

    @Effect() getGroupDetailsEffect = this.actions$.pipe(
        ofType(actions.GroupDetailsTypes.GetGroupDetails),
        mergeMap((action: actions.GetGroupDetails) => this.groupDetailsProvider.getGroupDetails(action.payload.groupId)),
        map((groupDetails: GroupDetails) => new actions.GetGroupDetailsSuccess({ groupDetails: groupDetails })),
        catchError(error => this.handleError(error))
    );

    @Effect() getWordsEffect = this.actions$.pipe(
        ofType(actions.GroupDetailsTypes.GetWords),
        mergeMap((action: actions.GetWords) => this.groupDetailsProvider.getWords(action.payload.groupId)),
        map((words: Word[]) => new actions.GetWordsSuccess({ words: words })),
        catchError(error => this.handleError(error))
    );

    @Effect() updateWordEffect = this.actions$.pipe(
        ofType(actions.GroupDetailsTypes.UpdateWord),
        tap((action: actions.UpdateWord) => this.groupDetailsProvider.updateWord(action.payload.editword)),
        concatMap((action: actions.UpdateWord) => [
            new actions.UpdateWordSuccess({editWord: action.payload.editword}),
            new actions.HideDialog()
        ]),
        catchError(error => this.handleError(error))
    );

    @Effect() addWordEffect = this.actions$.pipe(
        ofType(actions.GroupDetailsTypes.AddWord),
        tap((action: actions.AddWord) => this.groupDetailsProvider.addWord(action.payload.editword)),
        concatMap((action: actions.AddWord) => [
            new actions.GetWords({ groupId: action.payload.editword.groupId }),
            new actions.HideDialog()
        ]),
        catchError(error => this.handleError(error))
    );

    @Effect() removeWordEffect = this.actions$.pipe(
        ofType(actions.GroupDetailsTypes.RemoveWord),
        tap((action: actions.RemoveWordAction) => this.groupDetailsProvider.removeWord(action.payload.groupId, action.payload.wordId)),
        concatMap((action: actions.RemoveWordAction) => [
            new actions.RemoveWordSuccess({ wordId: action.payload.wordId }),
            new actions.HideDialog()
        ]),
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
