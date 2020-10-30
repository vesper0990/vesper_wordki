import { InitialState } from "@ngrx/store/src/models";
import { DashboardActionsEnum, DashboardActionsType } from "./actions";
import { DashbordState, initialState as initialDashboardState } from "./state";

export function dashboardReducer(state = initialDashboardState, action: DashboardActionsType): DashbordState {
    switch (action.type) {
        case DashboardActionsEnum.GET_LAST_FAILED: return action.reduce(state);
        case DashboardActionsEnum.GET_LAST_FAILED_FAILED: return action.reduce(state);
        case DashboardActionsEnum.GET_LAST_FAILED_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_NEXT_REPEAT: return action.reduce(state);
        case DashboardActionsEnum.GET_NEXT_REPEAT_FAILED: return action.reduce(state);
        case DashboardActionsEnum.GET_NEXT_REPEAT_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_NEWST_CARD: return action.reduce(state);
        case DashboardActionsEnum.GET_NEWST_CARD_FAILED: return action.reduce(state);
        case DashboardActionsEnum.GET_NEWST_CARD_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_DASHBOARD_INFO: return action.reduce(state);
        case DashboardActionsEnum.GET_DASHBOARD_INFO_SUCCESS: return action.reduce(state, action);
        case DashboardActionsEnum.GET_DASHBOARD_INFO_FAILED: return action.reduce(state);
        default: return state;
    }
}