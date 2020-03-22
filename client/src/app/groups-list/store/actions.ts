import { Action } from '@ngrx/store';
import { Group } from '../models/group.model';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';

export enum GroupListTypes {
    GetGroupList = '[GROUP_LIST_STATE] GET_GROUP_LIST',

    SetGroupList = '[GROUP_LIST_STATE] SET_GROUP_LIST',
    UpdateGroupInList = '[GROUP_LIST_STATE] UPDATE_GROUP_IN_LIST',
    UpdateGroupInListSuccess = '[GROUP_LIST_STATE] UPDATE_GROUP_IN_LIST_SUCCESS',

    RemoveGroup = '[GROUP_LIST_STATE] REMOVE_GROUP',
    RemoveGroupSuccess = '[GROUP_LIST_STATE] REMOVE_GROUP_SUCCESS'
}

export class GetGroupListAction implements Action {
    readonly type = GroupListTypes.GetGroupList;
}

export class SetGroupListAction implements Action {
    readonly type = GroupListTypes.SetGroupList;
    constructor(public payload: { groups: Group[] }) { }
}

export class UpdateGroupInList implements Action {
    readonly type = GroupListTypes.UpdateGroupInList;
    constructor(public payload: { group: EditGroup }) { }
}

export class UpdateGroupInListSuccess implements Action {
    readonly type = GroupListTypes.UpdateGroupInListSuccess;
    constructor(public payload: { group: EditGroup }) { }
}

export class RemoveGroupAction implements Action {
    readonly type = GroupListTypes.RemoveGroup;
    constructor(public payload: { groupId: number }) { }
}

export class RemoveGroupSuccessAction implements Action {
    readonly type = GroupListTypes.RemoveGroupSuccess;
    constructor(public payload: { groupId: number }) { }
}

export type GroupListActions = GetGroupListAction |
    SetGroupListAction |
    UpdateGroupInList |
    UpdateGroupInListSuccess |
    RemoveGroupAction |
    RemoveGroupSuccessAction;
