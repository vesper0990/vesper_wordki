import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LessonStep } from 'src/app/lesson/models/lesson-state';
import { TimerService } from 'src/app/lesson/services/stoper/stoper2.service';
import { selectLessonStep } from 'src/app/lesson/store/selectors';
import { LessonState } from 'src/app/lesson/store/state';
import * as actions from '../../../../store/actions';

@Injectable()
export class StoperService {

    constructor(private readonly timer: TimerService,
        private readonly store: Store<LessonState>,
        private readonly router: Router) { }

    init(): void {
        this.timer.init();
    }

    finalize(): void {
        this.timer.stop();
    }

    getLessonStep(): Observable<LessonStep> {
        return this.store.select(selectLessonStep);
    }

    getTime(): Observable<number> {
        return this.timer.time();
    }

    start(): void {
        this.timer.restart();
        this.store.dispatch(new actions.StartLesson());
    }

    pause(): void {
        this.timer.stop();
        this.store.dispatch(new actions.PauseLesson());
    }

    resume(): void {
        this.timer.resume();
        this.store.dispatch(new actions.RestartLesson());
    }

    finish(): void {
        this.timer.stop();
        this.store.dispatch(new actions.FinishLesson({ totalTime: this.timer.getWholeTime() }));
        this.router.navigate(['/lesson/summary']);
    }

}
