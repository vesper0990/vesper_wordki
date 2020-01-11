import { Injectable } from '@angular/core';
import { LessonActionTypes, RemoveWordAction, GetWordsAction, SetWordsAction } from './actions';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { WordProviderBase } from '../services/word.provider/word.provider';
import { LessonState } from './reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class LessonEffects {

    @Effect()
    answerActionEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.Answer),
        switchMap(() => {
            return [
                new RemoveWordAction(),
                new GetWordsAction({ count: 1 })
            ];
        })
    );

    @Effect({ dispatch: false })
    getWordsEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.GetWords),
        mergeMap(async (action: GetWordsAction) => {
            this.wordProvider.getNextWordAsync(action.payload.count)
                .then((x) => {
                    console.log(x);
                    this.lessonStore.dispatch(new SetWordsAction(x))
                }
                );
            // return this.wordProvider.getNextWord(action.payload.count)
            //     .pipe(
            //         map(x => new SetWordsAction(x)
            //         )
            //     );
        })
    );

    constructor(private actions$: Actions,
        private wordProvider: WordProviderBase,
        private lessonStore: Store<LessonState>) {
    }
}
