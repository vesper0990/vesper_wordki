import { Injectable } from '@angular/core';
import { LessonHttpBaseService } from '../services/lesson-http/lesson-http.service.base';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LessonState } from './state';
import * as actions from './actions';
import { of } from 'rxjs';
import { exhaustMap, map, catchError, withLatestFrom, concatMap, switchMap } from 'rxjs/operators';
import { shuffleArray } from 'src/app/share/utils/shuffle-array';
import { selectCurrentCard, selectLessonId, selectLessonSettings } from './selectors';
import { Navigate, RequestFailed } from 'src/app/store/actions';
import { LessonSettingsContract } from '../models/lesson-settings.contract';

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
        catchError(error => of(new RequestFailed({ error: error })))
    );


    @Effect() getCards$ = this.actions$.pipe(
        ofType<actions.GetWords>(actions.LessonActionEnum.GET_WORDS),
        withLatestFrom(this.store$.select(selectLessonSettings)),
        map(([, lessonSettings]) => {
            return {
                source: lessonSettings.lessonSource.type,
                count: lessonSettings.lessonSize,
                languages: lessonSettings.lessonLanguages
            } as LessonSettingsContract;
        }),
        switchMap((contract) => this.wordProvider.getTodayWordsWithParams(contract)),
        map(value => shuffleArray(value)),
        map(value => new actions.GetWordsSuccess({ cards: value as any })),
        catchError(error => of(new RequestFailed({ error: error })))
    );

    @Effect() getCountCards$ = this.actions$.pipe(
        ofType<actions.GetCountCards>(actions.LessonActionEnum.GET_COUNT_CARDS),
        switchMap((action) => this.wordProvider.getCountCards(action.payload.count)),
        map(value => shuffleArray(value)),
        map(value => new actions.GetWordsSuccess({ cards: value as any })),
        catchError(error => of(new RequestFailed({ error: error })))
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
        concatMap(([action, currentWord, lessonId]) => this.wordProvider.correct(currentWord.id, lessonId, '')),
        catchError(error => of(new RequestFailed({ error: error })))
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
        concatMap(([action, currentWord, lessonId]) => this.wordProvider.wrong(currentWord.id, lessonId, '')),
        catchError(error => of(new RequestFailed({ error: error })))
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
        concatMap(([action, currentWord, lessonId]) => this.wordProvider.accept(currentWord.id, lessonId, '')),
        catchError(error => of(new RequestFailed({ error: error })))
    );

    @Effect({
        dispatch: false,
    })
    finishLesson$ = this.actions$.pipe(
        ofType<actions.FinishLesson>(actions.LessonActionEnum.FINISH_LESSON),
        withLatestFrom(this.store$.select(selectLessonId)),
        concatMap(([action, lessonId]) => this.wordProvider.finish(lessonId, action.payload.totalTime)),
        catchError(error => of(new RequestFailed({ error: error })))
    );

    @Effect()
    compare$ = this.actions$.pipe(
        ofType<actions.Compare>(actions.LessonActionEnum.COMPARE),
        withLatestFrom(this.store$.select(selectCurrentCard)),
        concatMap(([action, currentCard]) => action.payload.value === currentCard.answer.value
            ? [new actions.ComparisonCorrect(), new actions.CheckCard()]
            : [new actions.ComparisonWrong(), new actions.CheckCard()])
    );

    @Effect()
    submitSettings$ = this.actions$.pipe(
        ofType<actions.SubmitSettings>(actions.LessonActionEnum.SUBMIT_SETTINGS),
        concatMap(() =>
            [
                new actions.GetWords(),
                new actions.CreateNewLesson(),
                new Navigate({ command: ['lesson/fiszki'] })
            ]
        )
    );

    @Effect()
    getLessonOptions$ = this.actions$.pipe(
        ofType(actions.LessonActionEnum.GET_LESSON_OPTIONS),
        switchMap(() => this.wordProvider.getLessonOptions()),
        map(dto => new actions.GetLessonOptionsSuccess({ lessonOptions: dto })),
        catchError(error => of(new RequestFailed({ error: error })))
    );
}
