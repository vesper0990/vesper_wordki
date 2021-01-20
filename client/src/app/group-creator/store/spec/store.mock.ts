import { LanguageType } from 'src/app/share/models/language-type.mode';
import { GroupDetails } from '../../model/group-details';
import { GroupCreatorState } from '../state';

export const groupCreatorMockState: GroupCreatorState = {
    fileContent: 'test-test',
    rowElements: [],
    newCards: [],
    groupDetails: new GroupDetails('', LanguageType.getLanguageType(0), LanguageType.getLanguageType(0))
};
