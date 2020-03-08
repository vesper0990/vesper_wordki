import {
    GroupDetailsActions,
    GroupDetailsTypes,
    SetGroupDetailsAction,
    UpdateWordSuccessAction,
    AddWordSuccessAction
} from './actions';
import { GroupDetails } from '../models/group-details.model';
import { Word } from '../models/word.model';

export interface GroupDetailsState {
    groupDetails: GroupDetails;
    isGroupDetailsLoading: boolean;
    words: Word[];
    isWordsLoading: boolean;
}

const initialState: GroupDetailsState = {
    groupDetails: null,
    isGroupDetailsLoading: false,
    words: [],
    isWordsLoading: false
};

export function reducer(state = initialState, action: GroupDetailsActions): GroupDetailsState {
    console.log('GroupDetailsStore', state, action);
    switch (action.type) {
        case GroupDetailsTypes.GetGroupDetails: return { ...state, isGroupDetailsLoading: true };
        case GroupDetailsTypes.SetGroupDetails: return handleSetGroupDetails(state, action);
        case GroupDetailsTypes.GetWords: return { ...state, isWordsLoading: true };
        case GroupDetailsTypes.SetWords: return { ...state, words: action.payload.words, isWordsLoading: false };
        case GroupDetailsTypes.UpdateWordSuccess: return handleUpdateWordSuccess(state, action);
        case GroupDetailsTypes.AddWordSuccess: return handleAddWordSuccess(state, action);
        default: return state;
    }
}

function handleSetGroupDetails(state: GroupDetailsState, action: SetGroupDetailsAction): GroupDetailsState {
    return { ...state, groupDetails: action.payload.groupDetails, isGroupDetailsLoading: false };
}

function handleUpdateWordSuccess(state: GroupDetailsState, action: UpdateWordSuccessAction): GroupDetailsState {
    const arr = [];
    state.words.forEach((item: Word) => arr.push(item.id === action.payload.word.id ? action.payload.word : item));
    return { ...state, words: arr };
}

function handleAddWordSuccess(state: GroupDetailsState, action: AddWordSuccessAction): GroupDetailsState {
    const words = state.words;
    words.push(action.payload.word);
    return { ...state, words: words };
}
