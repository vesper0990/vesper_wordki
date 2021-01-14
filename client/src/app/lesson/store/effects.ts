import { Injectable } from '@angular/core';
import { LessonHttpBaseService } from "../services/lesson-http/lesson-http.service.base";
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LessonState } from './state';
import * as actions from './actions';
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
        ofType(actions.LessonActionEnum.CREATE_NEW_LESSON),
        switchMap(() => this.wordProvider.createLesson()),
        map(value => new actions.CreateNewLessonSuccess({ lessonId: value })),
        catchError(error => of(new actions.GetWordsFailed({ error: error })))
    );


    @Effect() getCards$ = this.actions$.pipe(
        ofType<actions.GetWords>(actions.LessonActionEnum.GET_WORDS),
        exhaustMap(() => this.wordProvider.getTodayWords()),
        map(value => shuffleArray(value)),
        map(value => new actions.GetWordsSuccess({ cards: value as any })),
        catchError(error => of(new actions.GetWordsFailed({ error: error })))
    );

    @Effect({
        dispatch: false,
    })
    answerCorrect$ = this.actions$.pipe(
        ofType<actions.UpdateCardCorrect>(actions.LessonActionEnum.UPDATE_CARD_CORRECT),
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
        ofType<actions.UpdateCardWrong>(actions.LessonActionEnum.UPDATE_CARD_WRONG),
        withLatestFrom(
            this.store$.select(selectCurrentCard),
            this.store$.select(selectLessonId),
        ),
        concatMap(([action, currentWord, lessonId]) => this.wordProvider.wrong(currentWord.id, lessonId, ''))
    );

    @Effect({
        dispatch: false,
    })
    answerAccepted$ = this.actions$.pipe(
        ofType<actions.UpdateCardAccepted>(actions.LessonActionEnum.UPDATE_CARD_ACCEPTED),
        withLatestFrom(
            this.store$.select(selectCurrentCard),
            this.store$.select(selectLessonId),
        ),
        concatMap(([action, currentWord, lessonId]) => this.wordProvider.accept(currentWord.id, lessonId, ''))
    );

    @Effect({
        dispatch: false,
    })
    finishLesson$ = this.actions$.pipe(
        ofType<actions.FinishLesson>(actions.LessonActionEnum.FINISH_LESSON),
        withLatestFrom(this.store$.select(selectLessonId)),
        concatMap(([action, lessonId]) => this.wordProvider.finish(lessonId, action.payload.totalTime))
    );

    @Effect()
    compare$ = this.actions$.pipe(
        ofType<actions.Compare>(actions.LessonActionEnum.COMPARE),
        withLatestFrom(this.store$.select(selectCurrentCard)),
        concatMap(([action, currentCard]) => action.payload.value === currentCard.answer.value
            ? [new actions.ComparisonCorrect(), new actions.CheckCard()]
            : [new actions.ComparisonWrong(), new actions.CheckCard()])
    );
}
