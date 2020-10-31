import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LessonResult } from "src/app/lesson/models/lesson-result";
import { Finish } from "src/app/lesson/store/actions";
import { selectLessonResult } from "src/app/lesson/store/selectors";
import { LessonState } from "src/app/lesson/store/state";

@Injectable()
export class SummaryService {
    constructor(private readonly store: Store<LessonState>,
        private readonly router: Router) { }

    getResults(): Observable<LessonResult> {
        return this.store.select(selectLessonResult);
    }

    finish(): void {
        this.router.navigate(['/dashboard']);
    }
}