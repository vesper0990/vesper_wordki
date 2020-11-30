import { RepeatWord } from '../models/repeat-word.model';

export interface DashbordState {
    lastFailed: RepeatWord;
    nextRepeat: RepeatWord;
    newestCard: RepeatWord;
    cardToRepeat: number;
    lastRepeat: Date;
    groupsCount: number;
    cardsCount: number;
}

export const initialState: DashbordState = {
    lastFailed: null,
    nextRepeat: null,
    newestCard: null,
    cardToRepeat: null,
    lastRepeat: null,
    groupsCount: null,
    cardsCount: null,
};
