import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LessonState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {  getLessonResult } from '../../store/selectors';
import { LessonResult } from '../../models/lesson-result';

@Injectable()
export class SummaryGuardService implements CanActivate {

    constructor(private lessonStore: Store<LessonState>, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isResultsSet = false;
        this.lessonStore.select(getLessonResult).pipe(take(1)).subscribe(
            (results: LessonResult) => {
                isResultsSet = results !== null;
            }
        );
        if (isResultsSet) {
            return true;
        } else {
            return this.router.parseUrl('/lesson/settings');
        }
    }
}


