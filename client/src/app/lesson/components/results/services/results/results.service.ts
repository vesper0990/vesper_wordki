import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonState } from 'src/app/lesson/store/state';
import * as selectors from '../../../../store/selectors';

@Injectable()
export class ResultsService {
    constructor(private readonly store: Store<LessonState>) { }

    getWrong(): Observable<number> {
        return this.store.select(selectors.selectWrong);
    }

    getAccepted(): Observable<number> {
        return this.store.select(selectors.selectAccepted);
    }

    getCorrect(): Observable<number> {
        return this.store.select(selectors.selectCorrect);
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

    getRemainingCards(): Observable<number> {
        return this.store.select(selectors.selectCardsCount);
    }
}
