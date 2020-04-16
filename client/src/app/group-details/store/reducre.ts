import {
    GroupDetailsActions,
    GroupDetailsTypes,
    SetGroupDetailsAction,
    UpdateWordSuccessAction,
    AddWordSuccessAction,
    SetWordsAction,
    RemoveWordSuccessAction,
    ChangeGroupVisibilitySuccessAction
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
    switch (action.type) {
        case GroupDetailsTypes.GetGroupDetails: return { ...state, isGroupDetailsLoading: true };
        case GroupDetailsTypes.SetGroupDetails: return handleSetGroupDetails(state, action);
        case GroupDetailsTypes.GetWords: return { ...state, isWordsLoading: true };
        case GroupDetailsTypes.SetWords: return handleSetWords(state, action);
        case GroupDetailsTypes.UpdateWordSuccess: return handleUpdateWordSuccess(state, action);
        case GroupDetailsTypes.AddWordSuccess: return handleAddWordSuccess(state, action);
        case GroupDetailsTypes.RemoveWordSuccess: return handleRemoveWordSuccess(state, action);
        case GroupDetailsTypes.ChangeGroupVisibilitySuccess: return handleChangeGroupVisibilitySuccess(state, action);
        default: return state;
    }
}

function handleSetGroupDetails(state: GroupDetailsState, action: SetGroupDetailsAction): GroupDetailsState {
    state.words.forEach((word: Word) => word.group = action.payload.groupDetails);
    return { ...state, groupDetails: action.payload.groupDetails, isGroupDetailsLoading: false };
}

function handleSetWords(state: GroupDetailsState, action: SetWordsAction): GroupDetailsState {
    if (state.groupDetails) {
        action.payload.words.forEach((word: Word) => word.group = state.groupDetails);
    }
    return { ...state, words: action.payload.words, isWordsLoading: false };
}

function handleUpdateWordSuccess(state: GroupDetailsState, action: UpdateWordSuccessAction): GroupDetailsState {
    const arr = [];
    const updatedWord = action.payload.editWord;
    state.words.forEach((item: Word) => {
        if (item.id === updatedWord.wordId) {
            const newItem = {
                ...item,
                language1: updatedWord.language1,
                language2: updatedWord.language2,
                example1: updatedWord.example1,
                example2: updatedWord.example2,
                isVisible: updatedWord.isVisible
            } as Word;
            arr.push(newItem);
        } else {
            arr.push(item);
        }
    });
    return { ...state, words: arr };
}

function handleAddWordSuccess(state: GroupDetailsState, action: AddWordSuccessAction): GroupDetailsState {
    const words = state.words;
    action.payload.word.group = state.groupDetails;
    words.push(action.payload.word);
    return { ...state, words: words };
}

function handleRemoveWordSuccess(state: GroupDetailsState, action: RemoveWordSuccessAction): GroupDetailsState {
    return { ...state, words: state.words.filter(word => word.id !== action.payload.wordId) };
}

function handleChangeGroupVisibilitySuccess(state: GroupDetailsState, action: ChangeGroupVisibilitySuccessAction): GroupDetailsState {
    const words: Word[] = [];
    state.words.forEach((word: Word) => {
        words.push({ ...word, isVisible: true } as Word);
    });
    return { ...state, words: words };
}
