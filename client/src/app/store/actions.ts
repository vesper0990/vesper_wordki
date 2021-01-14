import { Action } from '@ngrx/store';

export enum RootTypes {
    RequestFailed = '[ROOT] REQUEST_FAILED',
}

export class RequestFailed implements Action {
    public readonly type = RootTypes.RequestFailed;

    constructor(public payload: { error: any }) { }
}

export type RootActions = RequestFailed;
