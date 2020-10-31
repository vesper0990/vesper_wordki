import { Group } from "../models/group.model";

export interface GroupListState {
    groups: Group[];
    isLoading: boolean;
}

export const initialState: GroupListState = {
    groups: [],
    isLoading: false
};