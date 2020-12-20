import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LessonStep } from "src/app/lesson/models/lesson-state";
import { LessonCardDto } from "src/app/lesson/models/word-repeat.dto";
import { StoperService } from "src/app/lesson/services/stoper/stoper.service";
import { selectLessonStep, selectCurrentCard, selectComparisonResult } from "src/app/lesson/store/selectors";
import * as actions from 'src/app/lesson/store/actions';
import { LessonState } from "src/app/lesson/store/state";

@Injectable()
export class InsertService {
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

    getCurrentCard(): Observable<LessonCardDto> {
        return this.store.select(selectCurrentCard);
    }

    getLessonStep(): Observable<LessonStep> {
        return this.store.select(selectLessonStep);
    }

    getComparisonResult(): Observable<string> {
        return this.store.select(selectComparisonResult);
    }

    startLesson(): void {
        this.stoper.start();
        this.store.dispatch(new actions.StartLesson());
    }

    finishLesson(): void {
        this.stoper.stop();
        const totalTime = this.stoper.getTime();
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
        this.stoper.start();
        this.store.dispatch(new actions.RestartLesson());
    }

}