import { Action } from '@ngrx/store';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { LanguageType } from 'src/app/share/models/language-type.mode';
import { GroupListState } from './state';
import { DialogMode } from 'src/app/share/components/edit-group-dialog/mode-dialog';
import { Group } from 'src/app/share/models/card-details';

export enum GroupListTypes {
    SHOW_DIALOG = '[GROUP_LIST_STATE] SHOW_DIALOG',
    HIDE_DIALOG = '[GROUP_LIST_STATE] HIDE_DIALOG',

    GET_GROUPS = '[GROUP_LIST_STATE] GET_GROUPS',
    GET_GROUPS_SUCCESS = '[GROUP_LIST_STATE] GET_GROUPS_SUCCESS',

    UPDATE_GROUP = '[GROUP_LIST_STATE] UPDATE_GROUP',
    UPDATE_GROUP_SUCCESS = '[GROUP_LIST_STATE] UPDATE_GROUP_SUCCESS',

    ADD_GROUP = '[GROUP_LIST_STATE] ADD_GROUP',
    ADD_GROUP_SUCCESS = '[GROUP_LIST_STATE] ADD_GROUP_SUCCESS',

    REMOVE_GROUP = '[GROUP_LIST_STATE] REMOVE_GROUP',
    REMOVE_GROUP_SUCCESS = '[GROUP_LIST_STATE] REMOVE_GROUP_SUCCESS',
}

export class GetGroups implements Action {
    readonly type = GroupListTypes.GET_GROUPS;

    static reduce(state: GroupListState): GroupListState {
        return {
            ...state,
            isLoading: true,
        };
    }
}

export class GetGroupsSuccess implements Action {
    readonly type = GroupListTypes.GET_GROUPS_SUCCESS;
    constructor(public payload: { groups: Group[] }) { }

    static reduce(state: GroupListState, action: GetGroupsSuccess): GroupListState {
        return {
            ...state,
            groups: action.payload.groups,
            isLoading: false
        };
    }
}

export class UpdateGroup implements Action {
    readonly type = GroupListTypes.UPDATE_GROUP;
    constructor(public payload: { group: EditGroup }) { }

    static reduce(state: GroupListState): GroupListState {
        return {
            ...state
        };
    }
}

export class UpdateGroupSuccess implements Action {
    readonly type = GroupListTypes.UPDATE_GROUP_SUCCESS;
    constructor(public payload: { group: EditGroup }) { }
    static reduce(state: GroupListState, action: UpdateGroupSuccess): GroupListState {
        const groups = [];
        state.groups.forEach((item: Group) => {
            groups.push(item.id === action.payload.group.id
                ? new Group(
                    action.payload.group.id, action.payload.group.name,
                    action.payload.group.languageFront, action.payload.group.languageBack,
                    item.cardsCount, item.repeatsCount)
                : item);
        });
        return { ...state, groups: groups };
    }
}

export class AddGroup implements Action {
    readonly type = GroupListTypes.ADD_GROUP;
    constructor(public payload: { group: EditGroup }) { }

    static reduce(state: GroupListState): GroupListState {
        return {
            ...state
        };
    }
}

export class AddGroupSuccess implements Action {
    readonly type = GroupListTypes.ADD_GROUP_SUCCESS;
    constructor(public payload: { group: EditGroup, groupId: number }) { }
    static reduce(state: GroupListState, action: AddGroupSuccess): GroupListState {
        const newGroup = new Group(
            action.payload.groupId,
            action.payload.group.name,
            action.payload.group.languageFront,
            action.payload.group.languageBack,
            0, 0);
        const groups = [];
        state.groups.forEach((item: Group) => {
            groups.push(item);
        });
        groups.push(newGroup);
        return { ...state, groups: groups };
    }
}

export class RemoveGroup implements Action {
    readonly type = GroupListTypes.REMOVE_GROUP;
    constructor(public payload: { groupId: number }) { }
    static reduce(state: GroupListState, action: RemoveGroup) {
        return {
            ...state,
        };
    }
}

export class RemoveGroupSuccess implements Action {
    readonly type = GroupListTypes.REMOVE_GROUP_SUCCESS;
    constructor(public payload: { groupId: number }) { }
    static reduce(state: GroupListState, action: RemoveGroupSuccess) {
        return {
            ...state,
            groups: state.groups.filter(item => item.id !== action.payload.groupId)
        };
    }
}

export class ShowDialog implements Action {
    readonly type = GroupListTypes.SHOW_DIALOG;
    constructor(public payload: { mode: DialogMode, group?: Group }) { }
    static reduce(state: GroupListState, action: ShowDialog): GroupListState {
        return {
            ...state,
            dialogMode: action.payload.mode,
            dialogGroup: action.payload.group,
            dialogVisibility: true
        };
    }
}

export class HideDialog implements Action {
    readonly type = GroupListTypes.HIDE_DIALOG;
    constructor() { }
    static reduce(state: GroupListState): GroupListState {
        return {
            ...state,
            dialogGroup: null,
            dialogVisibility: false
        };
    }
}

export type GroupListActions = GetGroups |
    GetGroupsSuccess |
    UpdateGroup |
    UpdateGroupSuccess |
    AddGroup |
    AddGroupSuccess |
    RemoveGroup |
    RemoveGroupSuccess |
    ShowDialog |
    HideDialog
    ;
