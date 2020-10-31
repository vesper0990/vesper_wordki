import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupListState } from './state';

export const getGroupListState = createFeatureSelector<GroupListState>('groupListStore');

export const getGroupsList = createSelector(getGroupListState, (state: GroupListState) => state.groups);
export const getIsLoading = createSelector(getGroupListState, (state: GroupListState) => state.isLoading);
