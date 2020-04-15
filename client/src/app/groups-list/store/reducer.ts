import { GroupListActions, GroupListTypes, SetGroupListAction } from './actions';
import { Group } from '../models/group.model';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';

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
        case GroupListTypes.RemoveGroupSuccess: return handleRemoveGroupSuccess(state, action.payload.groupId);
        default: return state;
    }
}

function handleSetGroupList(state: GroupListState, action: SetGroupListAction): GroupListState {
    return { ...state, groups: action.payload.groups, isLoading: false };
}

function handleUpdateGroupInList(state: GroupListState, group: EditGroup): GroupListState {
    const groups = [];
    state.groups.forEach((item: Group) => {
        groups.push(item.id === group.id ? <Group>{
            ...item,
            name: group.name,
            language1: LanguageType.getLanguageType(group.language1 as any) ,
            language2: LanguageType.getLanguageType(group.language2 as any),
        } : item);
    });
    return { ...state, groups: groups };

}

function handleRemoveGroupSuccess(state: GroupListState, groupId: number) {
    return {
        ...state,
        groups: state.groups.filter((group: Group) => group.id !== groupId)
    };
}
