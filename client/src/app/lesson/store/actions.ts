import { Action } from "@ngrx/store";

export enum LessonActionTypes {
    Test = '[Lesson] Test'
}

export class TestAction implements Action {
    readonly type = LessonActionTypes.Test;
}

export type LessonActions = TestAction;