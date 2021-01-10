import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAccepted, selectCardsCount, selectCorrect, selectWrong } from 'src/app/lesson/store/selectors';
import { ResultsService } from './results.service';

describe('ResultService', () => {

    let service: ResultsService;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ResultsService,
                provideMockStore()
            ]
        }).compileComponents();

        service = TestBed.inject(ResultsService);
        store = TestBed.inject(MockStore);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should getWrong', () => {
        const result = 1;
        store.overrideSelector(selectWrong, result);

        service.getWrong().subscribe(value => expect(value).toBe(result));
    });

    it('should getAccepted', () => {
        const result = 1;
        store.overrideSelector(selectAccepted, result);

        service.getAccepted().subscribe(value => expect(value).toBe(result));
    });

    it('should getCorrect', () => {
        const result = 1;
        store.overrideSelector(selectCorrect, result);

        service.getCorrect().subscribe(value => expect(value).toBe(result));
    });

    it('should getTotal', () => {
        store.overrideSelector(selectCorrect, 1);
        store.overrideSelector(selectAccepted, 1);
        store.overrideSelector(selectWrong, 1);

        service.getTotal().subscribe(value => expect(value).toBe(3));
    });

    it('should getRemainingCards', () => {
        const result = 10;
        store.overrideSelector(selectCardsCount, result);

        service.getRemainingCards().subscribe(value => expect(value).toBe(result));
    });
});
