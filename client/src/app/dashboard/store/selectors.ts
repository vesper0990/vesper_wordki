import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashbordState } from "./state";

export const selectDashboardState = createFeatureSelector<DashbordState>('dashboardStore');

export const selectLastFailed = createSelector(selectDashboardState, (state: DashbordState) => state.lastFailed);
export const selectNextRepeat = createSelector(selectDashboardState, (state: DashbordState) => state.nextRepeat);
export const selectNewestCard = createSelector(selectDashboardState, (state: DashbordState) => state.newestCard);
export const selectLastRepeat = createSelector(selectDashboardState, (state: DashbordState) => state.lastRepeat);
export const selectCardToRepeat = createSelector(selectDashboardState, (state: DashbordState) => state.cardToRepeat);
export const selectGroupsCount = createSelector(selectDashboardState, (state: DashbordState) => state.groupsCount);
export const selectCardsCount = createSelector(selectDashboardState, (state: DashbordState) => state.cardsCount);