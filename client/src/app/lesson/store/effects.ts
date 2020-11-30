import { Injectable } from '@angular/core';
import { LessonHttpBaseService } from '../services/lesson-http/lesson-http.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LessonState } from './state';
import * as acitons from './actions';
import { of } from 'rxjs';
import { exhaustMap, map, catchError, withLatestFrom, concatMap, switchMap } from 'rxjs/operators';
import { shuffleArray } from 'src/app/share/utils/shuffle-array';
import { selectCurrentCard, selectLessonId } from './selectors';

@Injectable()
export class LessonEffects {

    constructor(private readonly actions$: Actions,
        private readonly store$: Store<LessonState>,
        private readonly wordProvider: LessonHttpBaseService) {
    }

    @Effect() createLesson$ = this.actions$.pipe(
        ofType(acitons.LessonActionEnum.CREATE_NEW_LESSON),
        switchMap(() => this.wordProvider.createLesson()),
        map(value => new acitons.CreateNewLessonSuccess({ lessonId: value })),
        catchError(error => of(new acitons.GetWordsFailed({ error: error })))
    );


    @Effect() getCards$ = this.actions$.pipe(
        ofType<acitons.GetWords>(acitons.LessonActionEnum.GET_WORDS),
        exhaustMap(() => this.wordProvider.getTodayWords()),
        map(value => shuffleArray(value)),
        map(value => new acitons.GetWordsSuccess({ cards: value as any })),
        catchError(error => of(new acitons.GetWordsFailed({ error: error })))
    );

    @Effect({
        dispatch: false,
    })
    answerCorrect$ = this.actions$.pipe(
        ofType<acitons.UpdateCardCorrect>(acitons.LessonActionEnum.UPDATE_CARD_CORRECT),
        withLatestFrom(
            this.store$.select(selectCurrentCard),
            this.store$.select(selectLessonId),
        ),
        concatMap(([action, currentWord, lessonId]) => this.wordProvider.correct(currentWord.id, lessonId, ''))
    );

    @Effect({
        dispatch: false,
    })
    answerWrong$ = this.actions$.pipe(
        ofType<acitons.UpdateCardWrong>(acitons.LessonActionEnum.UPDATE_CARD_WRONG),
        withLatestFrom(
            this.store$.select(selectCurrentCard),
            this.store$.select(selectLessonId),
        ),
        concatMap(([action, currentWord, lessonId]) => this.wordProvider.wrong(currentWord.id, lessonId, ''))
    );

    @Effect({
        dispatch: false,
    })
    finishLesson$ = this.actions$.pipe(
        ofType(acitons.LessonActionEnum.FINISH_LESSON),
        withLatestFrom(this.store$.select(selectLessonId)),
        concatMap(([action, lessonId]) => this.wordProvider.finish(lessonId))
    );
}
