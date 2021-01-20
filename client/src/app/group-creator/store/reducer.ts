import * as actions from './actions';
import { groupCreatorInitState, GroupCreatorState } from './state';

export function groupCreatorReducer(state = groupCreatorInitState, action: actions.GroupCreatorType): GroupCreatorState {
    switch (action.type) {
        case actions.GroupCreatorActions.SetFileContent: return actions.SetFileContent.reduce(state, action);
        case actions.GroupCreatorActions.SetGroupDetails: return actions.SetGroupDetails.reduce(state, action);

        case actions.GroupCreatorActions.AddRowElemenet: return actions.AddRowElement.reduce(state, action);
        case actions.GroupCreatorActions.RemoveRowElemenet: return actions.RemoveRowElemenet.reduce(state, action);

        case actions.GroupCreatorActions.ParseNewCardsComplate: return actions.ParseNewCardsComplate.reduce(state, action);

        default: return state;
    }
}
