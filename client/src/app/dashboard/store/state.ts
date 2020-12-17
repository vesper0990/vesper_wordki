import { ExtendedCardDetails } from 'src/app/share/models/card-details';

export interface DashbordState {
    lastFailed: ExtendedCardDetails;
    nextRepeat: ExtendedCardDetails;
    newestCard: ExtendedCardDetails;
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
