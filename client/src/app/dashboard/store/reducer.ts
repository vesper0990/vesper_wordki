import { DashboardActionsEnum, DashboardActionsType } from "./actions";
import { DashbordState, initialState as initialDashboardState } from "./state";

export function dashboardReducer(state = initialDashboardState, action: DashboardActionsType): DashbordState {
    switch (action.type) {
        case DashboardActionsEnum.REQUEST_FAILED: return action.reduce(state);
        case DashboardActionsEnum.GET_LAST_FAILED: return action.reduce(state);
        case DashboardActionsEnum.GET_LAST_FAILED_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_NEXT_REPEAT: return action.reduce(state);
        case DashboardActionsEnum.GET_NEXT_REPEAT_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_NEWST_CARD: return action.reduce(state);
        case DashboardActionsEnum.GET_NEWST_CARD_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_TODAY_CARD_COUNT: return action.reduce(state);
        case DashboardActionsEnum.GET_TODAY_CARD_COUNT_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_LAST_LESSON: return action.reduce(state);
        case DashboardActionsEnum.GET_LAST_LESSON_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_GROUPS_COUNT: return action.reduce(state);
        case DashboardActionsEnum.GET_GROUPS_COUNT_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_CARDS_COUNT: return action.reduce(state);
        case DashboardActionsEnum.GET_CARDS_COUNT_SUCCESS: return action.reduce(state, action);
        default: return state;
    }
}