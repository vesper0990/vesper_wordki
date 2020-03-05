import { GroupListActions, GroupListTypes } from './actions';
import { Group } from '../models/group.model';

export interface GroupListState {
    groups: Group[];
}

const initialState: GroupListState = {
    groups: [],
};

export function reducer(state = initialState, action: GroupListActions) {
    switch (action.type) {
        case GroupListTypes.SetGroupList: return { ...state, groups: action.payload.groups };
        case GroupListTypes.UpdateGroupInListSuccess: return handleUpdateGroupInList(state, action.payload.group);
        default: return state;
    }
}

export function handleUpdateGroupInList(state: GroupListState, group: Group): GroupListState {
    const groups = [];
    state.groups.forEach((item: Group) => {
        groups.push(item.id === group.id ? group : item);
    });
    return { ...state, groups: groups };

}
