import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LessonStep } from 'src/app/lesson/models/lesson-state';
import { StoperService } from 'src/app/lesson/services/stoper/stoper2.service';
import * as actions from 'src/app/lesson/store/actions';
import { selectCurrentCard, selectLessonStep, } from 'src/app/lesson/store/selectors';
import { LessonState } from 'src/app/lesson/store/state';
import { CardRepeat } from 'src/app/share/models/card-details';

@Injectable()
export class FiszkaService {

    private lessonStepSub: Subscription;
    private lessonStep: LessonStep;

    constructor(private readonly store: Store<LessonState>,
        private readonly router: Router,
        private readonly stoper: StoperService) { }

    init(): void {
        this.lessonStepSub = this.store.select(selectLessonStep).pipe(
            tap(value => this.lessonStep = value)
        ).subscribe();
    }

    unsubsccribe(): void {
        this.lessonStepSub.unsubscribe();
    }

    getCurrentCard(): Observable<CardRepeat> {
        return this.store.select(selectCurrentCard);
    }

    getLessonStep(): Observable<LessonStep> {
        return this.store.select(selectLessonStep);
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

    check(): void {
        if (this.lessonStep !== LessonStep.QUESTION) {
            return;
        }
        this.store.dispatch(new actions.CheckCard());
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
