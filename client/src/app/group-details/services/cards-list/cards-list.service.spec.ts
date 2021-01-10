import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CardsListService } from './cards-list.service';
import { selectDialogCard, selectDialogMode, selectDialogVisibility, selectGroupDetails, selectIsCardsLoading, selectWords } from '../../store/selectors';
import { createCardDetails } from 'src/app/test/builders.spec';
import { GroupDetails } from 'src/app/share/models/card-details';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { AddWord, GetGroupDetails, GetWords, HideDialog, RemoveWordAction, ShowDialog, UpdateWord } from '../../store/actions';

describe('CardsListService', () => {

    let service: CardsListService;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CardsListService,
                provideMockStore()
            ]
        }).compileComponents();
        service = TestBed.inject(CardsListService);
        store = TestBed.inject(MockStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return cards from store', () => {
        const cards = [createCardDetails(), createCardDetails()];
        store.overrideSelector(selectWords, cards);

        service.getCards().subscribe(value => expect(value).toBe(cards));
    });

    it('should return isCardsLoading from store', () => {
        const result = false;
        store.overrideSelector(selectIsCardsLoading, result);

        service.isCardsLoading().subscribe(value => expect(value).toBe(result));
    });

    it('should return groupDetails from store', () => {
        const result = {} as GroupDetails;
        store.overrideSelector(selectGroupDetails, result);

        service.getGroupDetails().subscribe(value => expect(value).toBe(result));
    });

    it('should return dialogVsibility from store', () => {
        const result = true;
        store.overrideSelector(selectDialogVisibility, result);

        service.isDialogVisible().subscribe(value => expect(value).toBe(result));
    });

    it('should return dialogMode from store', () => {
        const result = 'edit';
        store.overrideSelector(selectDialogMode, result);

        service.getDialogMode().subscribe(value => expect(value).toBe(result));
    });

    it('should return dialogCard from store', () => {
        const result = { id: 1 } as EditWord;
        store.overrideSelector(selectDialogCard, result);

        service.getDialogCard().subscribe(value => expect(value).toBe(result));
    });

    it('should openDialogToAdd', () => {
        spyOn(store, 'dispatch');
        service.openDialogToAdd();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ShowDialog));
    });

    it('should openDialogToEdit', () => {
        const card = createCardDetails();
        spyOn(store, 'dispatch');
        service.openDialogToEdit(card);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(ShowDialog));
    });

    it('should cancelDialog', () => {
        spyOn(store, 'dispatch');
        service.dialogCancel();
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(HideDialog));
    });

    it('should saveDialog after add', () => {
        const card = { id: 0 } as EditWord;
        spyOn(store, 'dispatch');
        service.dialogSave(card);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(AddWord));
    });

    it('should saveDialog after edit', () => {
        const card = { id: 1 } as EditWord;
        spyOn(store, 'dispatch');
        service.dialogSave(card);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(UpdateWord));
    });

    it('should remove card', () => {
        spyOn(store, 'dispatch');
        service.dialogRemove(1);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(RemoveWordAction));
    });

    it('should handle routeParam', () => {
        spyOn(store, 'dispatch');
        service.handleRouteParam(1);
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(GetGroupDetails));
        expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(GetWords));
    });

});
