import * as actions from './actions';
import { GroupDetailsState, initialState } from './state';


export function reducer(state = initialState, action: actions.GroupDetailsActions): GroupDetailsState {
    switch (action.type) {
        case actions.GroupDetailsTypes.GetGroupDetails: return actions.GetGroupDetails.reduce(state);
        case actions.GroupDetailsTypes.GetGroupDetailsSuccess: return actions.GetGroupDetailsSuccess.reduce(state, action);
        case actions.GroupDetailsTypes.GetWords: return actions.GetWords.reduce(state);
        case actions.GroupDetailsTypes.GetWordsSuccess: return actions.GetWordsSuccess.reduce(state, action);
        case actions.GroupDetailsTypes.UpdateWord: return actions.UpdateWord.reduce(state);
        case actions.GroupDetailsTypes.UpdateWordSuccess: return actions.UpdateWordSuccess.reduce(state, action);
        // case actions.GroupDetailsTypes.AddWordSuccess: return actions.AddWordSuccess.reduce(state, action);
        case actions.GroupDetailsTypes.RemoveWord: return actions.RemoveWordAction.reduce(state);
        case actions.GroupDetailsTypes.RemoveWordSuccess: return actions.RemoveWordSuccess.reduce(state, action);
        case actions.GroupDetailsTypes.SHOW_DIALOG: return actions.ShowDialog.reduce(state, action);
        case actions.GroupDetailsTypes.HIDE_DIALOG: return actions.HideDialog.reduce(state);
        default: return state;
    }
}
