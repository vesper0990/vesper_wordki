import { GroupListState } from './reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getGroupListState = createFeatureSelector<GroupListState>('groupListStore');

export const getGroupsList = createSelector(getGroupListState, (state: GroupListState) => state.groups);
