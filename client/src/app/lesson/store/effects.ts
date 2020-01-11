import { Injectable } from '@angular/core';
import { LessonActionTypes, RemoveWordAction, GetWordsAction, SetWordsAction } from './actions';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { concatMap, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { WordProviderBase } from '../services/word.provider/word.provider';
import { WordRepeat } from '../models/word-repeat';

@Injectable()
export class LessonEffects {

    @Effect()
    answerActionEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.Answer),
        concatMap(() => {
            const actions = [];

            return of(actions);
        })
    );

    @Effect()
    getWordsEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.GetWords),
        switchMap(async (action: GetWordsAction) => {
            const setWordAction = this.wordProvider.getNextWord(action.payload.count).pipe(map(x => new SetWordsAction(x)));
            return setWordAction;
        })
    );

    constructor(private actions$: Actions,
        private wordProvider: WordProviderBase) {
    }
}
