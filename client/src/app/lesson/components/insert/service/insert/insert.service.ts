import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LessonStep } from 'src/app/lesson/models/lesson-state';
import * as selectors from 'src/app/lesson/store/selectors';
import * as actions from 'src/app/lesson/store/actions';
import { LessonState } from 'src/app/lesson/store/state';
import { CardRepeat } from 'src/app/share/models/card-details';
import { TimerService } from 'src/app/lesson/services/timer/timer.service';

@Injectable()
export class InsertService {
    private lessonStepSub: Subscription;
    private lessonStep: LessonStep;

    constructor(private readonly store: Store<LessonState>,
        private readonly router: Router,
        private readonly stoper: TimerService) { }

    init(): void {
        this.lessonStepSub = this.store.select(selectors.selectLessonStep).pipe(
            tap(value => this.lessonStep = value)
        ).subscribe();
        this.stoper.init();
    }

    unsubsccribe(): void {
        this.lessonStepSub.unsubscribe();
        this.stoper.stop();
    }

    getCurrentCard(): Observable<CardRepeat> {
        return this.store.select(selectors.selectCurrentCard);
    }

    getLessonStep(): Observable<LessonStep> {
        return this.store.select(selectors.selectLessonStep);
    }

    getComparisonResult(): Observable<string> {
        return this.store.select(selectors.selectComparisonResult);
    }

    getRemainingCardsCount(): Observable<number> {
        return this.store.select(selectors.selectCardsCount);
    }

    getCorrect(): Observable<number> {
        return this.store.select(selectors.selectCorrect);
    }

    getAccepted(): Observable<number> {
        return this.store.select(selectors.selectAccepted);
    }

    getWrong(): Observable<number> {
        return this.store.select(selectors.selectWrong);
    }

    getTotal(): Observable<number> {
        return combineLatest([
            this.store.select(selectors.selectCorrect),
            this.store.select(selectors.selectWrong),
            this.store.select(selectors.selectAccepted)
        ]).pipe(
            map(([correct, wrong, accepted]) => correct + wrong + accepted)
        );
    }

    getTime(): Observable<number> {
        return this.stoper.time();
    }

    startLesson(): void {
        this.stoper.restart();
        this.store.dispatch(new actions.StartLesson());
    }

    finishLesson(): void {
        this.stoper.stop();
        const totalTime = this.stoper.getWholeTime();
        this.store.dispatch(new actions.FinishLesson({ totalTime: totalTime }));
        this.router.navigate(['/lesson/summary']);
    }

    correct(): void {
        if (this.lessonStep !== LessonStep.ANSWER) {
            return;
        }
        this.store.dispatch(new actions.UpdateCardCorrect());
        this.store.dispatch(new actions.AnswerCorrect());
    }

    wrong(): void {
        if (this.lessonStep !== LessonStep.ANSWER) {
            return;
        }
        this.store.dispatch(new actions.UpdateCardWrong());
        this.store.dispatch(new actions.AnswerWrong());
    }

    accept() {
        if (this.lessonStep !== LessonStep.ANSWER) {
            return;
        }
        this.store.dispatch(new actions.UpdateCardAccepted());
        this.store.dispatch(new actions.AnswerAccepted());
    }

    check(value: string): void {
        if (this.lessonStep !== LessonStep.QUESTION) {
            return;
        }
        this.store.dispatch(new actions.Compare({ value: value }));
    }

    loadWords(): void {
        this.store.dispatch(new actions.CreateNewLesson());
        this.store.dispatch(new actions.GetWords());
    }

    pause(): void {
        this.stoper.stop();
        this.store.dispatch(new actions.PauseLesson());
    }

    restart(): void {
        this.stoper.restart();
        this.store.dispatch(new actions.RestartLesson());
    }
}
