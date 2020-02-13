import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { RouteParamsHandler } from '../../services/route-params.handler/route-params.handler';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { isAnyWord } from '../../store/selectors';
import { FinishLessonAction, StartLessonAction } from '../../store/actions';

export class BaseComponent implements OnInit, OnDestroy {
    protected routeParamSub: Subscription;
    protected nextWordSub: Subscription;

    isRunning: boolean;

    constructor(protected lessonStore: Store<LessonState>,
        protected routeParamsHandler: RouteParamsHandler,
        protected route: ActivatedRoute,
        protected router: Router) {
    }

    ngOnInit(): void {
        this.routeParamSub = this.route.params.subscribe((params: Params) => this.routeParamsHandler.handle(params));
        this.nextWordSub = this.lessonStore.select(isAnyWord).subscribe((isAny: boolean) => this.handleIsAnyWord(isAny));
    }

    ngOnDestroy(): void {
        this.routeParamSub.unsubscribe();
        this.nextWordSub.unsubscribe();
    }

    finishLesson(): void {
        this.lessonStore.dispatch(new FinishLessonAction());
        this.router.navigate(['lesson/summary']);
    }

    startLesson(): void {
        this.lessonStore.dispatch(new StartLessonAction());
        this.isRunning = true;
    }

    protected handleIsAnyWord(isAny: boolean): void {
        if (!isAny) {
            this.router.navigate(['dashboard']);
        }
    }
}
