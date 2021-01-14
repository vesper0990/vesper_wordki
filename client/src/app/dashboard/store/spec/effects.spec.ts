import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { createExtendedCardDetails } from 'src/app/test/builders.spec';
import { createProvider, getAllMethods } from 'src/app/test/helpers.spec';
import { DashboardHttpService } from '../../services/dashbaord-http/dashboard-http.service';
import { DashboardHttpServiceBase } from '../../services/dashbaord-http/dashboard-http.service.base';
import { DashboardEffects } from '../effects';
import { dashboardReducer } from '../reducer';
import { DashbordState } from '../state';
import * as actions from '../actions';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/share/components/error/services/error/error-service';
import { RequestFailed } from 'src/app/store/actions';

const mockInitialState: DashbordState = {
    lastFailed: createExtendedCardDetails(),
    nextRepeat: createExtendedCardDetails(),
    newestCard: createExtendedCardDetails(),
    cardToRepeat: 2,
    lastRepeat: new Date(2020, 1, 15),
    groupsCount: 2,
    cardsCount: 2,
};

function testReducer(state: DashbordState, action: actions.DashboardActionsType): DashbordState {
    return dashboardReducer(mockInitialState, action);
}

describe('Dashboard effects', () => {

    let store: Store<DashbordState>;
    let httpService: jasmine.SpyObj<DashboardHttpServiceBase>;
    let effects: DashboardEffects;
    let errorService: jasmine.SpyObj<ErrorService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forFeature('dashboardStore', testReducer),
                EffectsModule.forFeature([DashboardEffects]),
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
            ],
            providers: [
                { provide: DashboardHttpServiceBase, useValue: jasmine.createSpyObj(getAllMethods(DashboardHttpService)) },
                createProvider(ErrorService)
            ]
        });
        httpService = TestBed.inject(DashboardHttpServiceBase) as jasmine.SpyObj<DashboardHttpServiceBase>;
        store = TestBed.inject(Store);
        effects = TestBed.inject(DashboardEffects);
        errorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    });

    it('should create', () => {
        expect(store).toBeTruthy();
        expect(effects).toBeTruthy();
    });

    it('should handle GetLastFailed action if correct', () => {
        httpService.getLastFailed.and.returnValue(of(createExtendedCardDetails()));

        store.dispatch(new actions.GetLastFailed());

        effects.getLastFailed$.subscribe(
            value => expect(value).toEqual(new actions.GetLastFailedSuccess({ card: createExtendedCardDetails() })));
        expect(httpService.getLastFailed).toHaveBeenCalledTimes(1);
    });

    it('should handle GetLastFailed action if error', () => {
        httpService.getLastFailed.and.returnValue(throwError({}));

        store.dispatch(new actions.GetLastFailed());

        effects.getLastFailed$.subscribe(
            value => expect(value).toEqual(new RequestFailed({ error: {} as any })));
        expect(httpService.getLastFailed).toHaveBeenCalledTimes(1);
    });

    it('should handle GetCardsCount action if correct', () => {
        httpService.getWordsCount.and.returnValue(of(2));

        store.dispatch(new actions.GetCardsCount());

        effects.getCardsCount$.subscribe(
            value => expect(value).toEqual(new actions.GetCardsCountSuccess({ cardsCount: 2 })));
        expect(httpService.getWordsCount).toHaveBeenCalledTimes(1);
    });

    it('should handle GetCardsCount action if error', () => {
        httpService.getWordsCount.and.returnValue(throwError({}));

        store.dispatch(new actions.GetCardsCount());

        effects.getCardsCount$.subscribe(
            value => expect(value).toEqual(new RequestFailed({ error: {} as any })));
        expect(httpService.getWordsCount).toHaveBeenCalledTimes(1);
    });

    it('should handle GetGroupsCount action if correct', () => {
        httpService.getGroupsCount.and.returnValue(of(2));

        store.dispatch(new actions.GetGroupsCount());

        effects.getGroupsCount$.subscribe(
            value => expect(value).toEqual(new actions.GetGroupsCountSuccess({ groupsCount: 2 })));
        expect(httpService.getGroupsCount).toHaveBeenCalledTimes(1);
    });

    it('should handle GetGroupsCount action if error', () => {
        httpService.getGroupsCount.and.returnValue(throwError({}));

        store.dispatch(new actions.GetGroupsCount());

        effects.getGroupsCount$.subscribe(
            value => expect(value).toEqual(new RequestFailed({ error: {} as any })));
        expect(httpService.getGroupsCount).toHaveBeenCalledTimes(1);
    });

    it('should handle GetTodayCardsCount action if correct', () => {
        httpService.getTodayRepeatCount.and.returnValue(of(2));

        store.dispatch(new actions.GetTodayCardsCount());

        effects.getTodayCard$.subscribe(
            value => expect(value).toEqual(new actions.GetTodayCardsCountSuccess({ cardToRepeat: 2 })));
        expect(httpService.getTodayRepeatCount).toHaveBeenCalledTimes(1);
    });

    it('should handle GetTodayCardsCount action if error', () => {
        httpService.getTodayRepeatCount.and.returnValue(throwError({}));

        store.dispatch(new actions.GetTodayCardsCount());

        effects.getTodayCard$.subscribe(
            value => expect(value).toEqual(new RequestFailed({ error: {} as any })));
        expect(httpService.getTodayRepeatCount).toHaveBeenCalledTimes(1);
    });

    it('should handle GetLastLessonDate action if correct', () => {
        httpService.getLastLesson.and.returnValue(of(new Date(2020, 1, 15)));

        store.dispatch(new actions.GetLastLessonDate());

        effects.getLastLesson$.subscribe(
            value => expect(value).toEqual(new actions.GetLastLessonDateSuccess({ lastLesson: new Date(2020, 1, 15) })));
        expect(httpService.getLastLesson).toHaveBeenCalledTimes(1);
    });

    it('should handle GetLastLessonDate action if error', () => {
        httpService.getLastLesson.and.returnValue(throwError({}));

        store.dispatch(new actions.GetLastLessonDate());

        effects.getLastLesson$.subscribe(
            value => expect(value).toEqual(new RequestFailed({ error: {} as any })));
        expect(httpService.getLastLesson).toHaveBeenCalledTimes(1);
    });

    it('should handle GetNewstCard action if correct', () => {
        httpService.getLastWords.and.returnValue(of(createExtendedCardDetails()));

        store.dispatch(new actions.GetNewstCard());

        effects.getNewestCard$.subscribe(
            value => expect(value).toEqual(new actions.GetNewstCardSuccess({ card: createExtendedCardDetails() })));
        expect(httpService.getLastWords).toHaveBeenCalledTimes(1);
    });

    it('should handle GetNewstCard action if error', () => {
        httpService.getLastWords.and.returnValue(throwError({}));

        store.dispatch(new actions.GetNewstCard());

        effects.getNewestCard$.subscribe(
            value => expect(value).toEqual(new RequestFailed({ error: {} as any })));
        expect(httpService.getLastWords).toHaveBeenCalledTimes(1);
    });

    it('should handle GetNextRepeat action if correct', () => {
        httpService.getNextRepeatWord.and.returnValue(of(createExtendedCardDetails()));

        store.dispatch(new actions.GetNextRepeat());

        effects.getNextRepeat$.subscribe(
            value => expect(value).toEqual(new actions.GetNextRepeatSuccess({ card: createExtendedCardDetails() })));
        expect(httpService.getNextRepeatWord).toHaveBeenCalledTimes(1);
    });

    it('should handle GetNextRepeat action if error', () => {
        httpService.getNextRepeatWord.and.returnValue(throwError({}));

        store.dispatch(new actions.GetNextRepeat());

        effects.getNextRepeat$.subscribe(
            value => expect(value).toEqual(new RequestFailed({ error: {} as any })));
        expect(httpService.getNextRepeatWord).toHaveBeenCalledTimes(1);
    });
});
