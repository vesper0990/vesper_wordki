import { GroupListActions, GroupListTypes, SetGroupListAction } from './actions';
import { Group } from '../models/group.model';

export interface GroupListState {
    groups: Group[];
    isLoading: boolean;
}

const initialState: GroupListState = {
    groups: [],
    isLoading: false
};

export function reducer(state = initialState, action: GroupListActions) {
    console.log('GroupListState', state, action);
    switch (action.type) {
        case GroupListTypes.GetGroupList: return { ...state, isLoading: true };
        case GroupListTypes.SetGroupList: return handleSetGroupList(state, action);
        case GroupListTypes.UpdateGroupInListSuccess: return handleUpdateGroupInList(state, action.payload.group);
        default: return state;
    }
}

function handleSetGroupList(state: GroupListState, action: SetGroupListAction): GroupListState {
    return { ...state, groups: action.payload.groups, isLoading: false };
}

function handleUpdateGroupInList(state: GroupListState, group: Group): GroupListState {
    const groups = [];
    state.groups.forEach((item: Group) => {
        groups.push(item.id === group.id ? group : item);
    });
    return { ...state, groups: groups };

}
