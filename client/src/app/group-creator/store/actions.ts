import { Action } from '@ngrx/store';
import { CardParsed } from '../model/card-parsed';
import { GroupDetails } from '../model/group-details';
import { RowItem } from '../model/row-item';
import { GroupCreatorState } from './state';

export enum GroupCreatorActions {
    SetFileContent = '[GROUP_CREATOR] SET_FILE_CONTENT',
    SetGroupDetails = '[GROUP_CREATOR] SET_GROUP_DETAILS',

    AddRowElemenet = '[GROUP_CREATOR] ADD_ROW_ELEMENT',
    RemoveRowElemenet = '[GROUP_CREATOR] REMOVE_ROW_ELEMENT',

    ParseNewCards = '[GROUP_CREATOR] PARSE_NEW_CARDS',
    ParseNewCardsComplate = '[GROUP_CREATOR] PARSE_NEW_CARDS_COMPLETE',

    SaveNewGroup = '[GROUP_CREATOR] SAVE_NEW_GROUP',
    SaveNewGroupSuccess = '[GROUP_CREATOR] SAVE_NEW_GROUP_SUCCESS'
}

export class SetFileContent implements Action {
    readonly type = GroupCreatorActions.SetFileContent;

    constructor(public payload: { fileContent: string }) { }

    static reduce(state: GroupCreatorState, action: SetFileContent): GroupCreatorState {
        return {
            ...state,
            fileContent: action.payload.fileContent
        };
    }
}

export class SetGroupDetails implements Action {
    readonly type = GroupCreatorActions.SetGroupDetails;

    constructor(public payload: { groupDetails: GroupDetails }) { }

    static reduce(state: GroupCreatorState, action: SetGroupDetails): GroupCreatorState {
        return {
            ...state,
            groupDetails: action.payload.groupDetails
        };
    }
}

export class AddRowElement implements Action {
    readonly type = GroupCreatorActions.AddRowElemenet;

    constructor(public payload: { item: RowItem }) { }

    static reduce(state: GroupCreatorState, action: AddRowElement): GroupCreatorState {
        return {
            ...state,
            rowElements: [...state.rowElements, action.payload.item]
        };
    }
}

export class RemoveRowElemenet implements Action {
    readonly type = GroupCreatorActions.RemoveRowElemenet;

    constructor(public payload: { index: number }) { }

    static reduce(state: GroupCreatorState, action: RemoveRowElemenet): GroupCreatorState {
        const items = [...state.rowElements];
        items.splice(action.payload.index, 1);
        return {
            ...state,
            rowElements: items
        };
    }
}

export class ParseNewCards implements Action {
    readonly type = GroupCreatorActions.ParseNewCards;

    constructor() { }
}

export class ParseNewCardsComplate implements Action {
    readonly type = GroupCreatorActions.ParseNewCardsComplate;

    constructor(public payload: { newCards: CardParsed[] }) { }

    static reduce(state: GroupCreatorState, action: ParseNewCardsComplate): GroupCreatorState {
        return {
            ...state,
            newCards: action.payload.newCards
        };
    }
}

export class SaveNewGroup implements Action {
    readonly type = GroupCreatorActions.SaveNewGroup;

    constructor() { }
}

export class SaveNewGroupSuccess implements Action {
    readonly type = GroupCreatorActions.SaveNewGroupSuccess;

    constructor(public payload: { groupId: number }) { }
}


export type GroupCreatorType = SetFileContent |
    SetGroupDetails |
    AddRowElement |
    RemoveRowElemenet |
    ParseNewCards |
    ParseNewCardsComplate |
    SaveNewGroup |
    SaveNewGroupSuccess;
