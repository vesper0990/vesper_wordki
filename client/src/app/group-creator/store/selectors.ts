import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupCreatorState } from './state';

export const selectGroupCreatorState = createFeatureSelector<GroupCreatorState>('groupCreatorState');

export const selectRowElements = createSelector(selectGroupCreatorState, (state: GroupCreatorState) => state.rowElements);
export const selectParseModel = createSelector(selectGroupCreatorState, (state: GroupCreatorState) => {
    return { fileContent: state.fileContent, rowElements: state.rowElements };
});
export const selectParsedCard = createSelector(selectGroupCreatorState, (state: GroupCreatorState) => state.newCards);
export const selectGroupDetails = createSelector(selectGroupCreatorState, (state: GroupCreatorState) => state.groupDetails);
export const selectNewGroupModel = createSelector(selectGroupCreatorState, (state: GroupCreatorState) => {
    return {};
});
export const selectCanGenerate = createSelector(selectGroupCreatorState, (state: GroupCreatorState) => {
    return state.fileContent !== '' &&
        state.rowElements.length > 1;
});
export const selectCanSave = createSelector(selectGroupCreatorState, (state: GroupCreatorState) => {
    return state.groupDetails.name.length > 0 &&
        state.newCards.length > 0;
});

