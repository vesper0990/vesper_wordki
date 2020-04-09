import { Injectable } from '@angular/core';
import { LessonActionTypes, RemoveWordAction, GetWordsAction, SetWordsAction, AnswerAction, GetWordsFromGroupAction } from './actions';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { switchMap, map, mergeMap, withLatestFrom, concatMap, catchError, switchMapTo, filter } from 'rxjs/operators';
import { WordProviderBase } from '../services/word.provider/word.provider';
import { WordRepeat } from '../models/word-repeat';
import { LessonState } from './reducer';
import { Store } from '@ngrx/store';
import { of, from, Observable, empty } from 'rxjs';
import { getLessonMode, getLessonState } from './selectors';
import { LessonModeType } from '../models/lesson-mode';
import { LessonSettings } from '../models/lesson-settings';
import { Router } from '@angular/router';

@Injectable()
export class LessonEffects {

    @Effect({
        dispatch: false
    })
    setLessonSettingsEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.SetLessonSettings),
        map((lessonSettings: LessonSettings) => {
            this.router.navigate(['/lesson/fiszki']);
        })
    );

    @Effect() answerActionEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.Answer),
        map((action: AnswerAction) => action.payload),
        concatMap(action =>
            of(action).pipe(withLatestFrom(this.lessonStore.select(getLessonState))),
        ),
        switchMap(([payload, lessonState]) => {
            return this.wordProvider.sendWord(payload.wordId, payload.result).pipe(map(() => {
                if (lessonState.lessonMode === LessonModeType.Repeat && lessonState.words.length < 5) {
                    return new GetWordsAction({ count: 9 - lessonState.words.length, offset: lessonState.words.length - 1 });
                }
            }));
        }),
        filter(action => !!action),
        catchError(data => {
            return null;
        })
    );

    @Effect() getWordsEffect$ = this.actions$.pipe(
        ofType(LessonActionTypes.GetWords),
        map((action: GetWordsAction) => action.payload),
        concatMap(action =>
            of(action).pipe(withLatestFrom(this.lessonStore.select(getLessonState))),
        ),
        switchMap(([payload, lessonState]) =>
            this.wordProvider.getWordForLesson(
                payload.count,
                payload.offset,
                lessonState.lessonSettings.questionLanguage.type,
                lessonState.lessonSettings.answerLanguage.type).pipe(
                    map((words: WordRepeat[]) => {
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
        private lessonStore: Store<LessonState>,
        private router: Router) {
    }
}
