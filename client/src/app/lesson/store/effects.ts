import { Injectable } from '@angular/core';
import { LessonActionTypes, RemoveWordAction, GetWordsAction, SetWordsAction, AnswerAction } from './actions';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { WordProviderBase } from '../services/word.provider/word.provider';
import { WordRepeat } from '../models/word-repeat';

@Injectable()
export class LessonEffects {

    @Effect()
    answerActionEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.Answer),
        map((action: AnswerAction) => {
            this.wordProvider.sendWord(action.payload.wordId, action.payload.isCorrect).subscribe(
                () => { },
                (error: any) => console.error(error)
            );
        }),
        switchMap(() => {
            return [
                new RemoveWordAction(),
                new GetWordsAction({ count: 1 })
            ];
        })
    );

    @Effect()
    getWordsEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.GetWords),
        mergeMap((action: GetWordsAction) => this.wordProvider.getNextWord(action.payload.count)),
        map((words: WordRepeat[]) => new SetWordsAction(words))
    );

    constructor(private actions$: Actions,
        private wordProvider: WordProviderBase) {
    }
}
