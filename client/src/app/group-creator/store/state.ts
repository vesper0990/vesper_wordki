import { LanguageType } from 'src/app/share/models/language-type.mode';
import { CardParsed } from '../model/card-parsed';
import { GroupDetails } from '../model/group-details';
import { RowItem } from '../model/row-item';

export interface GroupCreatorState {
    fileContent: string;
    rowElements: RowItem[];
    newCards: CardParsed[];
    groupDetails: GroupDetails;
}

export const groupCreatorInitState: GroupCreatorState = {
    fileContent: '',
    rowElements: [],
    newCards: [],
    groupDetails: new GroupDetails('', LanguageType.getLanguageType(0), LanguageType.getLanguageType(0))
};

