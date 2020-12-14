import { DialogMode } from 'src/app/share/components/edit-group-dialog/mode-dialog';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { CardDetails, GroupDetails } from 'src/app/share/models/card-details';

export interface GroupDetailsState {
    groupDetails: GroupDetails;
    isGroupDetailsLoading: boolean;
    words: CardDetails[];
    isWordsLoading: boolean;

    dialogVisibility: boolean;
    dialogMode: DialogMode;
    dialogCard: EditWord;
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
