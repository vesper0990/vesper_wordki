import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupDetailsState } from './reducre';

export const getGroupListState = createFeatureSelector<GroupDetailsState>('groupDetailsStore');

export const getGroupDetails = createSelector(getGroupListState, (state: GroupDetailsState) => state.groupDetails);
export const getIsGroupDetailsLoading = createSelector(getGroupListState, (state: GroupDetailsState) => state.isGroupDetailsLoading);
export const getWords = createSelector(getGroupListState, (state: GroupDetailsState) => state.words);
export const getIsWordsLoading = createSelector(getGroupListState, (state: GroupDetailsState) => state.isWordsLoading);

