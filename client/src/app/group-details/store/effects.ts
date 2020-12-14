import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as actions from './actions';
import { GroupDetailsHttpBase } from '../services/group-details-http/group-details-http.service';
import { mergeMap, map, catchError, concatMap, exhaustMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { CardDetails, GroupDetails } from 'src/app/share/models/card-details';

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
        map((words: CardDetails[]) => new actions.GetWordsSuccess({ words: words })),
        catchError(error => this.handleError(error))
    );

    @Effect() updateWordEffect = this.actions$.pipe(
        ofType(actions.GroupDetailsTypes.UpdateWord),
        exhaustMap((action: actions.UpdateWord) => forkJoin([
            of(action.payload.editword),
            this.groupDetailsProvider.updateWord(action.payload.editword)
        ])),
        concatMap(data => [
            new actions.UpdateWordSuccess({editWord: data[0]}),
            new actions.HideDialog()
        ]),
        catchError(error => this.handleError(error))
    );

    @Effect() addWordEffect = this.actions$.pipe(
        ofType(actions.GroupDetailsTypes.AddWord),
        exhaustMap((action: actions.AddWord) => forkJoin([
            of(action.payload.editword.groupId),
            this.groupDetailsProvider.addWord(action.payload.editword)
        ])),
        concatMap(data => [
            new actions.GetWords({ groupId: data[0] }),
            new actions.HideDialog()
        ]),
        catchError(error => this.handleError(error))
    );

    @Effect() removeWordEffect = this.actions$.pipe(
        ofType(actions.GroupDetailsTypes.RemoveWord),
        exhaustMap((action: actions.RemoveWordAction) => forkJoin([
            of(action.payload.wordId),
            this.groupDetailsProvider.removeWord(action.payload.groupId, action.payload.wordId)
        ])),
        concatMap(data => [
            new actions.RemoveWordSuccess({ wordId: data[0] }),
            new actions.HideDialog()
        ]),
        catchError(error => this.handleError(error))
    );

    constructor(private actions$: Actions,
        private groupDetailsProvider: GroupDetailsHttpBase) {

    }

    private handleError(error: any): Observable<any> {
        console.log(error);
        throw error;
    }
}
