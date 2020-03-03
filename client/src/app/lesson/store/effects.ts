import { Injectable } from '@angular/core';
import { LessonActionTypes, RemoveWordAction, GetWordsAction, SetWordsAction, AnswerAction, GetWordsFromGroupAction } from './actions';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap, withLatestFrom, concatMap, catchError } from 'rxjs/operators';
import { WordProviderBase } from '../services/word.provider/word.provider';
import { WordRepeat } from '../models/word-repeat';
import { LessonState } from './reducer';
import { Store } from '@ngrx/store';
import { of, from } from 'rxjs';
import { getLessonMode } from './selectors';
import { LessonModeType } from '../models/lesson-mode';

@Injectable()
export class LessonEffects {

    @Effect() answerActionEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.Answer),
        map((action: AnswerAction) => action.payload),
        concatMap(action =>
            of(action).pipe(withLatestFrom(this.lessonStore.select(getLessonMode)))
        ),
        map(([payload, lessonMode]) => {
            this.wordProvider.sendWord(payload.wordId, payload.result).subscribe(
                () => { },
                (error: any) => console.error(error)
            );
            return lessonMode;
        }),
        switchMap((lessonMode: LessonModeType) => {
            if (lessonMode === LessonModeType.Repeat) {
                return [
                    new RemoveWordAction(),
                    new GetWordsAction({ count: 2 })
                ];
            } else if (lessonMode === LessonModeType.Group) {
                return [
                    new RemoveWordAction(),
                ];
            }
        })
    );

    @Effect() getWordsEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.GetWords),
        switchMap((action: GetWordsAction) => this.wordProvider.getNextWord(action.payload.count).pipe(
            map((words: WordRepeat[]) => {
                console.log('test');
                return new SetWordsAction(words);
            }),
            catchError(error => {
                throw (error);
            })
        )),
      catchError((error: Error) => {
          throw (error);
      })
    );

    @Effect() getWordsFromGroupEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.GetWordsFromGroup),
        mergeMap((action: GetWordsFromGroupAction) => this.wordProvider.getWordsFromGroup(action.payload.groupId)),
        map((words: WordRepeat[]) => new SetWordsAction(words))
    );

    constructor(private actions$: Actions,
        private wordProvider: WordProviderBase,
        private lessonStore: Store<LessonState>) {
    }
}
