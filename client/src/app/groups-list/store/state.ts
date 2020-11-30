import { DialogMode } from 'src/app/share/components/edit-group-dialog/mode-dialog';
import { Group } from '../models/group.model';

export interface GroupListState {
    groups: Group[];
    isLoading: boolean;

    dialogVisibility: boolean;
    dialogMode: DialogMode;
    dialogGroup: Group;
}

export const initialState: GroupListState = {
    groups: [],
    isLoading: false,
    dialogVisibility: false,
    dialogMode: 'add',
    dialogGroup: null
};
