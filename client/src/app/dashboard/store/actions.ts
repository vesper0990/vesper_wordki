import { Action } from '@ngrx/store';
import { ExtendedCardDetails } from 'src/app/share/models/card-details';
import { DashbordState } from './state';

export enum DashboardActionsEnum {
    REQUEST_FAILED = '[DASHBOARD] REQUEST_FAILED',

    GET_LAST_FAILED = '[DASHBOARD] GET_LAST_FAILED',
    GET_LAST_FAILED_SUCCESS = '[DASHBOARD] GET_LAST_FAILED_SUCCESS',

    GET_NEXT_REPEAT = '[DASHBOARD] GET_NEXT_REPEAT',
    GET_NEXT_REPEAT_SUCCESS = '[DASHBOARD] GET_NEXT_REPEAT_SUCCESS',

    GET_NEWST_CARD = '[DASHBOARD] GET_NEWST_CARD',
    GET_NEWST_CARD_SUCCESS = '[DASHBOARD] GET_NEWST_CARD_SUCCESS',

    GET_TODAY_CARD_COUNT = '[DASHBOARD] GET_TODAY_CARD_COUNT',
    GET_TODAY_CARD_COUNT_SUCCESS = '[DASHBOARD] GET_TODAY_CARD_COUNT_SUCCESS',

    GET_LAST_LESSON = '[DASHBOARD] GET_LAST_LESSON',
    GET_LAST_LESSON_SUCCESS = '[DASHBOARD] GET_LAST_LESSON_SUCCESS',

    GET_GROUPS_COUNT = '[DASHBOARD] GET_GROUPS_COUNT',
    GET_GROUPS_COUNT_SUCCESS = '[DASHBOARD] GET_GROUPS_COUNT_SUCCESS',

    GET_CARDS_COUNT = '[DASHBOARD] GET_CARDS_COUNT',
    GET_CARDS_COUNT_SUCCESS = '[DASHBOARD] GET_CARDS_COUNT_SUCCESS',
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
    constructor(public payload: { card: ExtendedCardDetails }) { }

    public reduce(state: DashbordState, action: GetLastFailedSuccess): DashbordState {
        return {
            ...state,
            lastFailed: action.payload.card,
        };
    }
}

export class RequestFailed implements Action {
    readonly type = DashboardActionsEnum.REQUEST_FAILED;
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
    constructor(public payload: { card: ExtendedCardDetails }) { }

    public reduce(state: DashbordState, action: GetNextRepeatSuccess): DashbordState {
        return {
            ...state,
            nextRepeat: action.payload.card,
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
    constructor(public payload: { card: ExtendedCardDetails }) { }

    public reduce(state: DashbordState, action: GetNewstCardSuccess): DashbordState {
        return {
            ...state,
            newestCard: action.payload.card,
        };
    }
}

export class GetTodayCardsCount implements Action {
    readonly type = DashboardActionsEnum.GET_TODAY_CARD_COUNT;
    constructor() { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
            newestCard: null
        };
    }
}

export class GetTodayCardsCountSuccess implements Action {
    readonly type = DashboardActionsEnum.GET_TODAY_CARD_COUNT_SUCCESS;
    constructor(public payload: { cardToRepeat: number }) { }

    public reduce(state: DashbordState, action: GetTodayCardsCountSuccess): DashbordState {
        return {
            ...state,
            cardToRepeat: action.payload.cardToRepeat
        };
    }
}

export class GetLastLessonDate implements Action {
    readonly type = DashboardActionsEnum.GET_LAST_LESSON;
    constructor() { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
            lastRepeat: null
        };
    }
}

export class GetLastLessonDateSuccess implements Action {
    readonly type = DashboardActionsEnum.GET_LAST_LESSON_SUCCESS;
    constructor(public payload: { lastLesson: Date }) { }

    public reduce(state: DashbordState, action: GetLastLessonDateSuccess): DashbordState {
        return {
            ...state,
            lastRepeat: action.payload.lastLesson
        };
    }
}

export class GetGroupsCount implements Action {
    readonly type = DashboardActionsEnum.GET_GROUPS_COUNT;
    constructor() { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
            groupsCount: null
        };
    }
}

export class GetGroupsCountSuccess implements Action {
    readonly type = DashboardActionsEnum.GET_GROUPS_COUNT_SUCCESS;
    constructor(public payload: { groupsCount: number }) { }

    public reduce(state: DashbordState, action: GetGroupsCountSuccess): DashbordState {
        return {
            ...state,
            groupsCount: action.payload.groupsCount
        };
    }
}

export class GetCardsCount implements Action {
    readonly type = DashboardActionsEnum.GET_CARDS_COUNT;
    constructor() { }

    public reduce(state: DashbordState): DashbordState {
        return {
            ...state,
            cardsCount: null
        };
    }
}

export class GetCardsCountSuccess implements Action {
    readonly type = DashboardActionsEnum.GET_CARDS_COUNT_SUCCESS;
    constructor(public payload: { cardsCount: number }) { }

    public reduce(state: DashbordState, action: GetCardsCountSuccess): DashbordState {
        return {
            ...state,
            cardsCount: action.payload.cardsCount
        };
    }
}

export type DashboardActionsType =
    RequestFailed |
    GetLastFailed |
    GetLastFailedSuccess |
    GetNextRepeat |
    GetNextRepeatSuccess |
    GetNewstCard |
    GetNewstCardSuccess |
    GetTodayCardsCount |
    GetTodayCardsCountSuccess |
    GetLastLessonDate |
    GetLastLessonDateSuccess |
    GetGroupsCount |
    GetGroupsCountSuccess |
    GetCardsCount |
    GetCardsCountSuccess;
