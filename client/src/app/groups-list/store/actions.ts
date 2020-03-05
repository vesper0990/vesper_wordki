import { Action } from '@ngrx/store';
import { Group } from '../models/group.model';

export enum GroupListTypes {
    GetGroupList = '[GROUP_LIST_STATE] GET_GROUP_LIST',

    SetGroupList = '[GROUP_LIST_STATE] SET_GROUP_LIST',
    UpdateGroupInList = '[GROUP_LIST_STATE] UPDATE_GROUP_IN_LIST',
    UpdateGroupInListSuccess = '[GROUP_LIST_STATE] UPDATE_GROUP_IN_LIST_SUCCESS',
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
    constructor(public payload: { group: Group }) { }
}

export class UpdateGroupInListSuccess implements Action {
    readonly type = GroupListTypes.UpdateGroupInListSuccess;
    constructor(public payload: { group: Group }) { }
}

export type GroupListActions = GetGroupListAction |
    SetGroupListAction |
    UpdateGroupInList |
    UpdateGroupInListSuccess;
