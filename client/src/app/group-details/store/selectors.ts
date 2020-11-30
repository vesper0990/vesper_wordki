import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupDetailsState } from './state';

export const getGroupListState = createFeatureSelector<GroupDetailsState>('groupDetailsStore');

export const selectGroupDetails = createSelector(getGroupListState, (state: GroupDetailsState) => state.groupDetails);
export const getIsGroupDetailsLoading = createSelector(getGroupListState, (state: GroupDetailsState) => state.isGroupDetailsLoading);
export const selectWords = createSelector(getGroupListState, (state: GroupDetailsState) => state.words);
export const selectIsCardsLoading = createSelector(getGroupListState, (state: GroupDetailsState) => state.isWordsLoading);

export const selectDialogVisibility = createSelector(getGroupListState, (state: GroupDetailsState) => state.dialogVisibility);
export const selectDialogMode = createSelector(getGroupListState, (state: GroupDetailsState) => state.dialogMode);
export const selectDialogCard = createSelector(getGroupListState, (state: GroupDetailsState) => state.dialogCard);

