import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from './dashboard.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import { ExtendedCardDetails } from 'src/app/share/models/card-details';

describe('DashboardService', () => {

    let service: DashboardService;
    let router: Router;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            providers: [
                DashboardService,
                provideMockStore()
            ]
        }).compileComponents();

        service = TestBed.inject(DashboardService);
        router = TestBed.inject(Router);
        store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should navigate to history', () => {
        const spy = spyOn(router, 'navigate').and.stub();

        service.history();

        expect(spy.calls.first().args[0]).toContain('/history');
    });

    it('should navigate to groups', () => {
        const spy = spyOn(router, 'navigate').and.stub();

        service.groups();

        expect(spy.calls.first().args[0]).toContain('/groups');
    });

    it('should navigate to cards', () => {
        const spy = spyOn(router, 'navigate').and.stub();

        service.cards();

        expect(spy.calls.first().args[0]).toContain('/cards');
    });

    it('should navigate to lesson', () => {
        const spy = spyOn(router, 'navigate').and.stub();

        service.lesson();

        expect(spy.calls.first().args[0]).toContain('/lesson/fiszki');
    });

    it('should initialize store', () => {
        spyOn(store, 'dispatch').and.callThrough();

        service.init();

        // expect(store.dispatch).toHaveBeenCalledWith(new actions.GetNextRepeat());
        // expect(store.dispatch).toHaveBeenCalledWith(new actions.GetNewstCard());
        // expect(store.dispatch).toHaveBeenCalledWith(new actions.GetLastFailed());
        expect(store.dispatch).toHaveBeenCalledWith(new actions.GetTodayCardsCount());
        expect(store.dispatch).toHaveBeenCalledWith(new actions.GetLastLessonDate());
        expect(store.dispatch).toHaveBeenCalledWith(new actions.GetGroupsCount());
        expect(store.dispatch).toHaveBeenCalledWith(new actions.GetCardsCount());
    });

    it('should return last failed from store', () => {
        store.overrideSelector(selectors.selectLastFailed, lastFailed);

        service.getLastFailed().subscribe(value => expect(value).toEqual(lastFailed)).unsubscribe();
    });

    it('should return next repeat from store', () => {
        store.overrideSelector(selectors.selectNextRepeat, nextRepeat);

        service.getNextRepeat().subscribe(value => expect(value).toEqual(nextRepeat)).unsubscribe();
    });

    it('should return newest card from store', () => {
        store.overrideSelector(selectors.selectNewestCard, newestCard);

        service.getNewestCard().subscribe(value => expect(value).toEqual(newestCard)).unsubscribe();
    });

    it('should return card to repeat from store', () => {
        const expectedValue = 1;
        store.overrideSelector(selectors.selectCardToRepeat, expectedValue);

        service.getCardToRepeat().subscribe(value => expect(value).toEqual(expectedValue)).unsubscribe();
    });

    it('should return last repeat from store', () => {
        const expectedValue = new Date(2020, 1, 1);
        store.overrideSelector(selectors.selectLastRepeat, expectedValue);

        service.getLastRepeat().subscribe(value => expect(value).toEqual(expectedValue)).unsubscribe();
    });

    it('should return groups count from store', () => {
        const expectedValue = 1;
        store.overrideSelector(selectors.selectGroupsCount, expectedValue);

        service.getGroupsCount().subscribe(value => expect(value).toEqual(expectedValue)).unsubscribe();
    });

    it('should return words count from store', () => {
        const expectedValue = 1;
        store.overrideSelector(selectors.selectCardsCount, expectedValue);

        service.getCardsCount().subscribe(value => expect(value).toEqual(expectedValue)).unsubscribe();
    });

});


const lastFailed = { groupName: 'test' } as ExtendedCardDetails;

const nextRepeat = { groupName: 'test' } as ExtendedCardDetails;

const newestCard = { groupName: 'test' } as ExtendedCardDetails;
