import { GroupListActions, GroupListTypes, GetGroupsSuccess, GetGroups, UpdateGroupSuccess, RemoveGroupSuccess } from './actions';
import { GroupListState, initialState } from './state';

export function reducer(state = initialState, action: GroupListActions): GroupListState {
    switch (action.type) {
        case GroupListTypes.GET_GROUPS: return GetGroups.reduce(state);
        case GroupListTypes.GET_GROUPS_SUCCESS: return GetGroupsSuccess.reduce(state, action);
        case GroupListTypes.UPDATE_GROUP_SUCCESS: return UpdateGroupSuccess.reduce(state, action);
        case GroupListTypes.REMOVE_GROUP_SUCCESS: return RemoveGroupSuccess.reduce(state, action);
        default: return state;
    }
}
