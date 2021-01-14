import { Action } from '@ngrx/store';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { GroupDetailsState } from './state';
import { DialogMode } from 'src/app/share/components/edit-group-dialog/mode-dialog';
import { CardDetails, GroupDetails, SideDetails } from 'src/app/share/models/card-details';

export enum GroupDetailsTypes {
    SHOW_DIALOG = '[GROUP_LIST_STATE] SHOW_DIALOG',
    HIDE_DIALOG = '[GROUP_LIST_STATE] HIDE_DIALOG',

    GetGroupDetails = '[GROUP_DETAILS_STATE] GET_GROUP_DETAILS',
    GetGroupDetailsSuccess = '[GROUP_DETAILS_STATE] GET_GROUP_DETAILS_SUCCESS',

    GetWords = '[GROUP_DETAILS_STATE] GET_WORDS',
    GetWordsSuccess = '[GROUP_DETAILS_STATE] GET_WORDS_SUCCESS',

    UpdateWord = '[GROUP_DETAILS_STATE] UPDATE_WORD',
    UpdateWordSuccess = '[GROUP_DETAILS_STATE] UPDATE_WORD_SUCCESS',

    AddWord = '[GROUP_DETAILS_STATE] ADD_WORD',
    AddWordSuccess = '[GROUP_DETAILS_STATE] ADD_WORD_SUCCESS',

    RemoveWord = '[GROUP_DETAILS_STATE] REMOVE_WORD',
    RemoveWordSuccess = '[GROUP_DETAILS_STATE] REMOVE_WORD_SUCCESS',

    AddGroup = '[GROUP_DETAILS_STATE] ADD_GROUP',

    ChangeGroupVisibility = '[GROUP_DETAILS_STATE] CHANGE_GROUP_VISIBILITY',
    ChangeGroupVisibilitySuccess = '[GROUP_DETAILS_STATE] CHANGE_GROUP_VISIBILITY_SUCCESS'
}

export class GetGroupDetails implements Action {
    readonly type = GroupDetailsTypes.GetGroupDetails;
    constructor(public payload: { groupId: number }) { }

    static reduce(state: GroupDetailsState): GroupDetailsState {
        return {
            ...state
        };
    }
}

export class GetGroupDetailsSuccess implements Action {
    readonly type = GroupDetailsTypes.GetGroupDetailsSuccess;
    constructor(public payload: { groupDetails: GroupDetails }) { }
    static reduce(state: GroupDetailsState, action: GetGroupDetailsSuccess): GroupDetailsState {
        return {
            ...state,
            groupDetails: action.payload.groupDetails
        };
    }
}

export class GetWords implements Action {
    readonly type = GroupDetailsTypes.GetWords;
    constructor(public payload: { groupId: number }) { }

    static reduce(state: GroupDetailsState): GroupDetailsState {
        return {
            ...state,
            isWordsLoading: true,
        };
    }
}

export class GetWordsSuccess implements Action {
    readonly type = GroupDetailsTypes.GetWordsSuccess;
    constructor(public payload: { words: CardDetails[] }) { }
    static reduce(state: GroupDetailsState, action: GetWordsSuccess): GroupDetailsState {
        return {
            ...state,
            words: action.payload.words,
            isWordsLoading: false
        };
    }
}

export class UpdateWord implements Action {
    readonly type = GroupDetailsTypes.UpdateWord;
    constructor(public payload: { editword: EditWord }) { }
    static reduce(state: GroupDetailsState): GroupDetailsState {
        return {
            ...state
        };
    }
}

export class UpdateWordSuccess implements Action {
    readonly type = GroupDetailsTypes.UpdateWordSuccess;
    constructor(public payload: { editWord: EditWord }) { }

    static reduce(state: GroupDetailsState, action: UpdateWordSuccess): GroupDetailsState {
        const arr = [];
        const updatedWord = action.payload.editWord;
        state.words.forEach((item: CardDetails) => {
            if (item.id === updatedWord.id) {
                const newItem = new CardDetails(updatedWord.id,
                    new SideDetails(
                        updatedWord.language1,
                        updatedWord.example1,
                        item.front.drawer,
                        item.front.language,
                        item.front.repeatsCount,
                        item.front.isVisible,
                        item.front.nextRepeat
                    ),
                    new SideDetails(
                        updatedWord.language2,
                        updatedWord.example2,
                        item.back.drawer,
                        item.back.language,
                        item.back.repeatsCount,
                        item.back.isVisible,
                        item.back.nextRepeat
                    ));
                arr.push(newItem);
            } else {
                arr.push(item);
            }
        });
        return { ...state, words: arr };
    }
}

export class AddWord implements Action {
    readonly type = GroupDetailsTypes.AddWord;
    constructor(public payload: { editword: EditWord }) { }
    static reduce(state: GroupDetailsState): GroupDetailsState {
        return {
            ...state
        };
    }
}

// export class AddWordSuccess implements Action {
//     readonly type = GroupDetailsTypes.AddWordSuccess;
//     constructor(public payload: { word: any }) { }

//     static reduce(state: GroupDetailsState, action: AddWordSuccess): GroupDetailsState {
//         const words = state.words;
//         action.payload.word.group = state.groupDetails;
//         words.push(action.payload.word);
//         return { ...state, words: words };
//     }
// }

export class RemoveWordAction implements Action {
    readonly type = GroupDetailsTypes.RemoveWord;
    constructor(public payload: { groupId: number, wordId: number }) { }
    static reduce(state: GroupDetailsState): GroupDetailsState {
        return {
            ...state
        };
    }
}

export class RemoveWordSuccess implements Action {
    readonly type = GroupDetailsTypes.RemoveWordSuccess;
    constructor(public payload: { wordId: number }) { }

    static reduce(state: GroupDetailsState, action: RemoveWordSuccess): GroupDetailsState {
        return { ...state, words: state.words.filter(word => word.id !== action.payload.wordId) };
    }
}

export class ShowDialog implements Action {
    readonly type = GroupDetailsTypes.SHOW_DIALOG;
    constructor(public payload: { mode: DialogMode, card: EditWord }) { }
    static reduce(state: GroupDetailsState, action: ShowDialog): GroupDetailsState {
        return {
            ...state,
            dialogMode: action.payload.mode,
            dialogCard: action.payload.card,
            dialogVisibility: true
        };
    }
}

export class HideDialog implements Action {
    readonly type = GroupDetailsTypes.HIDE_DIALOG;
    constructor() { }
    static reduce(state: GroupDetailsState): GroupDetailsState {
        return {
            ...state,
            dialogCard: null,
            dialogVisibility: false
        };
    }
}


export type GroupDetailsActions = GetGroupDetails |
    GetGroupDetailsSuccess |
    GetWords |
    GetWordsSuccess |
    UpdateWord |
    UpdateWordSuccess |
    AddWord |
    RemoveWordAction |
    RemoveWordSuccess |
    ShowDialog |
    HideDialog;
