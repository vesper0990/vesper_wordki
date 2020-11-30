import * as actions from './actions';
import { GroupListState, initialState } from './state';

export function reducer(state = initialState, action: actions.GroupListActions): GroupListState {
    switch (action.type) {
        case actions.GroupListTypes.GET_GROUPS: return actions.GetGroups.reduce(state);
        case actions.GroupListTypes.GET_GROUPS_SUCCESS: return actions.GetGroupsSuccess.reduce(state, action);
        case actions.GroupListTypes.UPDATE_GROUP_SUCCESS: return actions.UpdateGroupSuccess.reduce(state, action);
        case actions.GroupListTypes.ADD_GROUP_SUCCESS: return actions.AddGroupSuccess.reduce(state, action);
        case actions.GroupListTypes.REMOVE_GROUP_SUCCESS: return actions.RemoveGroupSuccess.reduce(state, action);
        case actions.GroupListTypes.SHOW_DIALOG: return actions.ShowDialog.reduce(state, action);
        case actions.GroupListTypes.HIDE_DIALOG: return actions.HideDialog.reduce(state);
        default: return state;
    }
}
