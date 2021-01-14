import { GroupDetails } from 'src/app/share/models/card-details';
import { LanguageType } from 'src/app/share/models/language-type.mode';
import * as selectors from '../selectors';
import { GroupDetailsState } from '../state';

const mockInitState: GroupDetailsState = {
    groupDetails:
        new GroupDetails(1,
            'name',
            LanguageType.getLanguageType(1),
            LanguageType.getLanguageType(2),
            1,
            2,
            new Date(2020, 1, 15)),
    isGroupDetailsLoading: false,
    words: [],
    isWordsLoading: false,

    dialogVisibility: false,
    dialogMode: 'add',
    dialogCard: null
};

describe('GroupDetails Selectors', () => {

    [
        { selector: selectors.getIsGroupDetailsLoading, result: false },
        { selector: selectors.selectDialogCard, result: null },
        { selector: selectors.selectDialogMode, result: 'add' },
        { selector: selectors.selectDialogVisibility, result: false },
        {
            selector: selectors.selectGroupDetails, result: new GroupDetails(1,
                'name',
                LanguageType.getLanguageType(1),
                LanguageType.getLanguageType(2),
                1,
                2,
                new Date(2020, 1, 15))
        },
        { selector: selectors.selectIsCardsLoading, result: false },
        { selector: selectors.selectWords, result: [] },
    ].forEach((item, index) => {
        it('should return proper value :: ' + index, () => {
            const result = item.selector.projector(mockInitState);
            expect(result).toEqual(item.result);
        });
    });
});
