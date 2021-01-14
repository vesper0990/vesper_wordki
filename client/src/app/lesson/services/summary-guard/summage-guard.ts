import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { LessonState } from '../../store/state';
import { Observable } from 'rxjs';
import { selectLessonResult } from '../../store/selectors';

@Injectable()
export class SummaryGuardService implements CanActivate {

    constructor(private readonly store: Store<LessonState>,
        private readonly router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.store.select(selectLessonResult).pipe(
            map(value => {
                return value === null ? this.router.parseUrl('/dashboard') : true;
            })
        );
    }
}


