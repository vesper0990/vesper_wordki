import { Action } from "@ngrx/store";

export enum UserActionTypes {
    Test = '[User] Test'
}

export class TestAction implements Action {
    readonly type = UserActionTypes.Test;
}

export type UserActions = TestAction;