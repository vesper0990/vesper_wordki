import { Injectable } from '@angular/core';
import { LessonHttpBaseService } from '../services/lesson-http/lesson-http.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LessonState } from './state';
import { AnswerCorrect, AnswerWrong, GetWords, GetWordsFailed, GetWordsSuccess, LessonActionEnum, UpdateCardCorrect, UpdateCardWrong } from './actions';
import { of } from 'rxjs';
import { exhaustMap, map, catchError, withLatestFrom, concatMap } from 'rxjs/operators';
import { shuffleArray } from 'src/app/share/utils/shuffle-array';
import { selectCurrentCard } from './selectors';

@Injectable()
export class LessonEffects {

    constructor(private readonly actions$: Actions,
        private readonly store$: Store<LessonState>,
        private readonly wordProvider: LessonHttpBaseService,
        private readonly router: Router) {
    }

    @Effect()
    getCards$ = this.actions$.pipe(
        ofType<GetWords>(LessonActionEnum.GET_WORDS),
        exhaustMap(() => this.wordProvider.getTodayWords()),
        map(value => shuffleArray(value)),
        map(value => new GetWordsSuccess({ cards: value as any })),
        catchError(error => of(new GetWordsFailed({ error: error })))
    )

    @Effect({
        dispatch: false,
    })
    answerCorrect$ = this.actions$.pipe(
        ofType<UpdateCardCorrect>(LessonActionEnum.UPDATE_CARD_CORRECT),
        withLatestFrom(this.store$.select(selectCurrentCard)),
        concatMap(([action, currentWord]) => this.wordProvider.correct(currentWord.id))
    )

    @Effect({
        dispatch: false,
    })
    answerWrong$ = this.actions$.pipe(
        ofType<UpdateCardWrong>(LessonActionEnum.UPDATE_CARD_WRONG),
        withLatestFrom(this.store$.select(selectCurrentCard)),
        concatMap(([action, currentWord]) => this.wordProvider.wrong(currentWord.id))
    )
}
