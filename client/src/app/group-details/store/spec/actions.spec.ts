import { GroupDetails } from 'src/app/share/models/card-details';
import { LanguageType } from 'src/app/share/models/language-type.mode';
import { GroupDetailsState } from '../state';
import * as actions from '../actions';
import { reducer } from '../reducer';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';

const mockInitState: GroupDetailsState = {
    groupDetails: createGroupDetails(),
    isGroupDetailsLoading: false,
    words: [],
    isWordsLoading: false,

    dialogVisibility: false,
    dialogMode: 'add',
    dialogCard: null
};

class HideDialogContext {
    action = new actions.HideDialog();
    result: GroupDetailsState = {
        groupDetails: createGroupDetails(),
        isGroupDetailsLoading: false,
        words: [],
        isWordsLoading: false,
        dialogVisibility: false,
        dialogMode: 'add',
        dialogCard: null
    };
}

class ShowDialogContext {
    action = new actions.ShowDialog({ mode: 'edit', card: new EditWord(1, 1, '', '', '', '', false) });
    result: GroupDetailsState = {
        groupDetails: createGroupDetails(),
        isGroupDetailsLoading: false,
        words: [],
        isWordsLoading: false,
        dialogVisibility: true,
        dialogMode: 'edit',
        dialogCard: new EditWord(1, 1, '', '', '', '', false)
    };
}

describe('GroupDeatils actions', () => {
    [
        new HideDialogContext(),
        new ShowDialogContext(),
    ].forEach((item, index) => {
        it('should return proper value ' + index, () => {
            expect(reducer(mockInitState, item.action)).toEqual(item.result);
        });
    });
});

function createGroupDetails(): GroupDetails {
    return new GroupDetails(1,
        'name',
        LanguageType.getLanguageType(1),
        LanguageType.getLanguageType(2),
        1,
        2,
        new Date(2020, 1, 15));
}
