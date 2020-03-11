import { Action } from '@ngrx/store';
import { GroupDetails } from '../models/group-details.model';
import { Word } from '../models/word.model';
import { Actions } from '@ngrx/effects';

export enum GroupDetailsTypes {
    GetGroupDetails = '[GROUP_DETAILS_STATE] GET_GROUP_DETAILS',
    SetGroupDetails = '[GROUP_DETAILS_STATE] SET_GROUP_DETAILS',

    GetWords = '[GROUP_DETAILS_STATE] GET_WORDS',
    SetWords = '[GROUP_DETAILS_STATE] SET_WORDS',

    UpdateWord = '[GROUP_DETAILS_STATE] UPDATE_WORD',
    UpdateWordSuccess = '[GROUP_DETAILS_STATE] UPDATE_WORD_SUCCESS',

    AddWord = '[GROUP_DETAILS_STATE] ADD_WORD',
    AddWordSuccess = '[GROUP_DETAILS_STATE] ADD_WORD_SUCCESS',

    RemoveWord = '[GROUP_DETAILS_STATE] REMOVE_WORD',
    RemoveWordSuccess = '[GROUP_DETAILS_STATE] REMOVE_WORD_SUCCESS',
}

export class GetGroupDetailsAction implements Action {
    readonly type = GroupDetailsTypes.GetGroupDetails;
    constructor(public payload: { groupId: number }) { }
}

export class SetGroupDetailsAction implements Action {
    readonly type = GroupDetailsTypes.SetGroupDetails;
    constructor(public payload: { groupDetails: GroupDetails }) { }
}

export class GetWordsAction implements Action {
    readonly type = GroupDetailsTypes.GetWords;
    constructor(public payload: { groupId: number }) { }
}

export class SetWordsAction implements Action {
    readonly type = GroupDetailsTypes.SetWords;
    constructor(public payload: { words: Word[] }) { }
}

export class UpdateWordAction implements Action {
    readonly type = GroupDetailsTypes.UpdateWord;
    constructor(public payload: { word: Word, groupId: number }) { }
}

export class UpdateWordSuccessAction implements Action {
    readonly type = GroupDetailsTypes.UpdateWordSuccess;
    constructor(public payload: { word: Word }) { }
}

export class AddWordAction implements Action {
    readonly type = GroupDetailsTypes.AddWord;
    constructor(public payload: { word: Word, groupId: number }) { }
}

export class AddWordSuccessAction implements Action {
    readonly type = GroupDetailsTypes.AddWordSuccess;
    constructor(public payload: { word: Word }) { }
}

export class RemoveWordAction implements Action {
    readonly type = GroupDetailsTypes.RemoveWord;
    constructor(public payload: { word: Word }) { }
}

export class RemoveWordSuccessAction implements Action {
    readonly type = GroupDetailsTypes.RemoveWordSuccess;
    constructor(public payload: { word: Word }) { }
}

export type GroupDetailsActions = GetGroupDetailsAction |
    SetGroupDetailsAction |
    GetWordsAction |
    SetWordsAction |
    UpdateWordAction |
    UpdateWordSuccessAction |
    AddWordAction |
    AddWordSuccessAction |
    RemoveWordAction |
    RemoveWordSuccessAction;
