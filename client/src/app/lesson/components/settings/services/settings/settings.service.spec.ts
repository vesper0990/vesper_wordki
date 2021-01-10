import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectCurrentCard } from 'src/app/lesson/store/selectors';
import { CardRepeat } from 'src/app/share/models/card-details';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {

    let service: SettingsService;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SettingsService,
                provideMockStore()
            ]
        }).compileComponents();

        service = TestBed.inject(SettingsService);
        store = TestBed.inject(MockStore);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should getCurrentCard', () => {
        const card = { id: 1 } as CardRepeat;
        store.overrideSelector(selectCurrentCard, card);

        service.getCurrentCard().subscribe(value => expect(value).toBe(card));
    });

});
