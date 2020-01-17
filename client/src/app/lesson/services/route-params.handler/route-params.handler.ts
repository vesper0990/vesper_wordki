import { Injectable } from '@angular/core';
import { LessonState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { Params } from '@angular/router';
import { SetLessonMode, GetWordsFromGroupAction, GetWordsAction } from '../../store/actions';
import { LessonModeType } from '../../models/lesson-mode';

@Injectable()
export class RouteParamsHandler {
    constructor(private lessonStore: Store<LessonState>) { }

    public handle(params: Params): void {
        const id = +params['id'];
        if (id) {
            this.lessonStore.dispatch(new SetLessonMode({ mode: LessonModeType.Group }));
            this.lessonStore.dispatch(new GetWordsFromGroupAction({ groupId: id }));
        } else {
            this.lessonStore.dispatch(new SetLessonMode({ mode: LessonModeType.Repeat }));
            this.lessonStore.dispatch(new GetWordsAction({ count: 2 }));
        }
    }
}
