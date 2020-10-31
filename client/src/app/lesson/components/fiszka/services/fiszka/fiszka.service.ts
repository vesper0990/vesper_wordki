import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, fromEvent, merge, Observable, Subscription } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { LessonStep } from "src/app/lesson/models/lesson-state";
import { WordRepeat } from "src/app/lesson/models/word-repeat";
import { StoperService } from "src/app/lesson/services/stoper/stoper.service";
import { AnswerCorrect, AnswerWrong, CheckCard, FinishLesson, GetWords, PauseLesson, RestartLesson, StartLesson, UpdateCardCorrect, UpdateCardWrong } from "src/app/lesson/store/actions";
import { selectCurrentCard, selectLessonStep, } from "src/app/lesson/store/selectors";
import { LessonState } from "src/app/lesson/store/state";

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

    getCurrentCard(): Observable<WordRepeat> {
        return this.store.select(selectCurrentCard);
    }

    getLessonStep(): Observable<LessonStep> {
        return this.store.select(selectLessonStep);
    }

    startLesson(): void {
        this.stoper.start();
        this.store.dispatch(new StartLesson());
    }

    finishLesson(): void {
        this.stoper.stop();
        const totalTime = this.stoper.getTime();
        this.store.dispatch(new FinishLesson({ totalTime: totalTime }));
        this.router.navigate(['/lesson/summary']);
    }

    correct(): void {
        if (this.lessonStep != LessonStep.ANSWARE) {
            return;
        }
        this.store.dispatch(new UpdateCardCorrect());
        this.store.dispatch(new AnswerCorrect());
    }

    wrong(): void {
        if (this.lessonStep != LessonStep.ANSWARE) {
            return;
        }
        this.store.dispatch(new UpdateCardWrong());
        this.store.dispatch(new AnswerWrong());
    }

    check(): void {
        if (this.lessonStep != LessonStep.QUESTION) {
            return;
        }
        this.store.dispatch(new CheckCard());
    }

    loadWords(): void {
        this.store.dispatch(new GetWords());
    }

    pause(): void {
        this.stoper.stop();
        this.store.dispatch(new PauseLesson());
    }

    restart(): void {
        this.stoper.start();
        this.store.dispatch(new RestartLesson());
    }
}
