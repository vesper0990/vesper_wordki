import { GroupDetailsActions, GroupDetailsTypes } from './actions';
import { GroupDetails } from '../models/group-details.model';
import { Word } from '../models/word.model';

export interface GroupDetailsState {
    groupDetails: GroupDetails;
    words: Word[];
}

const initialState: GroupDetailsState = {
    groupDetails: null,
    words: [],
};

export function reducer(state = initialState, action: GroupDetailsActions): GroupDetailsState {
    switch (action.type) {
        case GroupDetailsTypes.SetWords: return { ...state, words: action.payload.words };
        case GroupDetailsTypes.SetGroupDetails: return { ...state, groupDetails: action.payload.groupDetails };
        default: return state;
    }
}
