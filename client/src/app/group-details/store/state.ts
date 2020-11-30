import { DialogMode } from 'src/app/share/components/edit-group-dialog/mode-dialog';
import { GroupDetails } from '../models/group-details.model';
import { Word } from '../models/word.model';

export interface GroupDetailsState {
    groupDetails: GroupDetails;
    isGroupDetailsLoading: boolean;
    words: Word[];
    isWordsLoading: boolean;

    dialogVisibility: boolean;
    dialogMode: DialogMode;
    dialogCard: Word;
}

export const initialState: GroupDetailsState = {
    groupDetails: null,
    isGroupDetailsLoading: false,
    words: [],
    isWordsLoading: false,

    dialogVisibility: false,
    dialogMode: 'add',
    dialogCard: null
};
