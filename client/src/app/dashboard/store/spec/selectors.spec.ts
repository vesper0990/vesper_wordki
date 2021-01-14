import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { dashboardReducer } from '../reducer';
import { DashbordState } from '../state';
import * as selectors from '../selectors';
import { DashboardActionsType } from '../actions';
import { createExtendedCardDetails } from 'src/app/test/builders.spec';

const mockInitialState: DashbordState = {
    lastFailed: createExtendedCardDetails(),
    nextRepeat: createExtendedCardDetails(),
    newestCard: createExtendedCardDetails(),
    cardToRepeat: 2,
    lastRepeat: new Date(2020, 1, 15),
    groupsCount: 2,
    cardsCount: 2,
};

function testReducer(state: DashbordState, action: DashboardActionsType): DashbordState {
    return dashboardReducer(mockInitialState, action);
}


describe('Dashboard selectors', () => {
    let store: Store<DashbordState>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                StoreModule.forFeature('dashboardStore', testReducer),
            ]
        });

        store = TestBed.inject(Store);
    });

    it('should create', () => {
        expect(store).toBeTruthy();
    });

    [
        { selector: selectors.selectCardToRepeat, value: 2 },
        { selector: selectors.selectCardsCount, value: 2 },
        { selector: selectors.selectGroupsCount, value: 2 },
        { selector: selectors.selectLastFailed, value: createExtendedCardDetails() },
        { selector: selectors.selectLastRepeat, value: new Date(2020, 1, 15) },
        { selector: selectors.selectNewestCard, value: createExtendedCardDetails() },
        { selector: selectors.selectNextRepeat, value: createExtendedCardDetails() },

    ].forEach(item => {
        it('should return proper value', () => {
            store.select(item.selector as any).subscribe(value => expect(value).toEqual(item.value));
        });
    });

});
