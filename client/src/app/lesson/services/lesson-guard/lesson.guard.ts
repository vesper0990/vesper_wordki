import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LessonState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { canStartLesson } from '../../store/selectors';

@Injectable()
export class LessonGuardService implements CanActivate {

    constructor(private lessonStore: Store<LessonState>, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let canStart = false;
        this.lessonStore.select(canStartLesson).pipe(take(1)).subscribe(
            (value: boolean) => {
                canStart = value;
            }
        );
        return canStart ? true : this.router.parseUrl('/lesson/settings');
    }
}


