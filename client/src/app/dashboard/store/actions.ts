import { Action } from "@ngrx/store";
import { DashbordState } from "./state";

export enum DashboardActionsEnum {
    GET_LAST_FAILED = '[DASHBOARD] GET_LAST_FAILED',
    GET_LAST_FAILED_SUCCESS = '[DASHBOARD] GET_LAST_FAILED_SUCCESS',
    GET_LAST_FAILED_FAILED = '[DASHBOARD] GET_LAST_FAILED_FAILED',

    GET_NEXT_REPEAT = '[DASHBOARD] GET_NEXT_REPEAT',
    GET_NEXT_REPEAT_SUCCESS = '[DASHBOARD] GET_NEXT_REPEAT_SUCCESS',
    GET_NEXT_REPEAT_FAILED = '[DASHBOARD] GET_NEXT_REPEAT_FAILED',

    GET_NEWST_CARD = '[DASHBOARD] GET_NEWST_CARD',
    GET_NEWST_CARD_SUCCESS = '[DASHBOARD] GET_NEWST_CARD_SUCCESS',
    GET_NEWST_CARD_FAILED = '[DASHBOARD] GET_NEWST_CARD_FAILED',


    GET_DASHBOARD_INFO = '[DASHBOARD] GET_DASHBOARD_INFO',
    GET_DASHBOARD_INFO_SUCCESS = '[DASHBOARD] GET_DASHBOARD_INFO_SUCCESS',
    GET_DASHBOARD_INFO_FAILED = '[DASHBOARD] GET_DASHBOARD_INFO_FAILED',
}

export class GetLastFailed implements Action {
    readonly type = DashboardActionsEnum.GET_LAST_FAILED;
    constructor() { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
            lastFailed: null
        };
    }
}

export class GetLastFailedSuccess implements Action {
    readonly type = DashboardActionsEnum.GET_LAST_FAILED_SUCCESS;
    constructor(public payload: { card: any }) { }

    public reduce(state: DashbordState, action: GetLastFailedSuccess): DashbordState {
        return {
            ...state,
            lastFailed: action.payload.card,
        };
    }
}

export class GetLastFailedFailed implements Action {
    readonly type = DashboardActionsEnum.GET_LAST_FAILED_FAILED;
    constructor(public payload: { error: string }) { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
        };
    }
}

export class GetNextRepeat implements Action {
    public readonly type = DashboardActionsEnum.GET_NEXT_REPEAT;
    constructor() { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
            nextRepeat: null,
        };
    }
}

export class GetNextRepeatSuccess implements Action {
    readonly type = DashboardActionsEnum.GET_NEXT_REPEAT_SUCCESS;
    constructor(public payload: { card: any }) { }

    public reduce(state: DashbordState, action: GetNextRepeatSuccess): DashbordState {
        return {
            ...state,
            nextRepeat: action.payload.card,
        };
    }
}

export class GetNextRepeatFailed implements Action {
    readonly type = DashboardActionsEnum.GET_NEXT_REPEAT_FAILED;
    constructor(public payload: { error: string }) { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
        };
    }
}

export class GetNewstCard implements Action {
    readonly type = DashboardActionsEnum.GET_NEWST_CARD;
    constructor() { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
            newestCard: null
        };
    }
}

export class GetNewstCardSuccess implements Action {
    readonly type = DashboardActionsEnum.GET_NEWST_CARD_SUCCESS;
    constructor(public payload: { card: any }) { }

    public reduce(state: DashbordState, action: GetNewstCardSuccess): DashbordState {
        return {
            ...state,
            newestCard: action.payload.card,
        };
    }
}

export class GetNewstCardFailed implements Action {
    readonly type = DashboardActionsEnum.GET_NEWST_CARD_FAILED;
    constructor(public payload: { error: string }) { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
        };
    }
}

export class GetDashboardInfo implements Action {
    readonly type = DashboardActionsEnum.GET_DASHBOARD_INFO;
    constructor() { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
        };
    }
}

export class GetDashboardInfoSuccess implements Action {
    readonly type = DashboardActionsEnum.GET_DASHBOARD_INFO_SUCCESS;
    constructor(public payload: { dto: any }) { }

    public reduce(state: DashbordState, action: GetDashboardInfoSuccess): DashbordState {
        return {
            ...state,
            cardToRepeat: action.payload.dto.cardToRepeat,
            lastRepeat: action.payload.dto.lastRepeat,
            groupsCount: action.payload.dto.groupsCount,
            cardsCount: action.payload.dto.cardsCount,
        };
    }
}

export class GetDashboardInfoFailed implements Action {
    readonly type = DashboardActionsEnum.GET_DASHBOARD_INFO_FAILED;
    constructor(public payload: { error: string }) { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
        };
    }
}

export type DashboardActionsType =
    GetLastFailed |
    GetLastFailedFailed |
    GetLastFailedSuccess |
    GetNextRepeat |
    GetNextRepeatFailed |
    GetNextRepeatSuccess |
    GetNewstCard |
    GetNewstCardSuccess |
    GetNewstCardFailed |
    GetDashboardInfo |
    GetDashboardInfoSuccess |
    GetDashboardInfoFailed;