import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupDetailsComponent } from './group-details.component';
import { MockComponent } from 'ng-mocks';
import { WordRowComponent } from './components/word-row/word-row.component';
import { EditWordDialogComponent } from '../share/components/edit-word-dialog/edit-word-dialog.component';
import { CardsListService } from './services/cards-list/cards-list.service';
import { createProvider } from '../test/helpers.spec';
import { selectAllDebugElements, selectDebugElement, selectNativeElementById } from '../test/utils.spec';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { createCardDetails } from '../test/builders.spec';
import { EditWord } from '../share/components/edit-word-dialog/edit-word.model';

describe('GroupDetailsComponent', () => {
  let component: GroupDetailsComponent;
  let fixture: ComponentFixture<GroupDetailsComponent>;
  let service: jasmine.SpyObj<CardsListService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GroupDetailsComponent,
        MockComponent(WordRowComponent),
        MockComponent(EditWordDialogComponent)
      ],
      providers: [
        createProvider(CardsListService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(CardsListService) as jasmine.SpyObj<CardsListService>;
    fixture = TestBed.createComponent(GroupDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should save card', () => {
    const editCard = { id: 1 } as EditWord;
    component.onEditSave(editCard);

    expect(service.dialogSave).toHaveBeenCalledWith(editCard);
  });

  it('should remove card', () => {
    const id = 1;
    component.onEditRemove(id);

    expect(service.dialogRemove).toHaveBeenCalledWith(id);
  });

  it('should cancel dialog', () => {
    component.onEditCancel();

    expect(service.dialogCancel).toHaveBeenCalled();
  });

  describe('before loaded', () => {
    beforeEach(() => {
      service.isCardsLoading.and.returnValue(of(true));

      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display button to add card', () => {
      const button = selectDebugElement(fixture, 'button');
      expect(button).toBeTruthy();

      button.nativeElement.click();

      expect(service.openDialogToAdd).toHaveBeenCalledTimes(1);
    });

    it('should display loading in group area', () => {
      const container = selectNativeElementById(fixture, 'group-container');

      expect(container.innerHTML).toContain('Loading');
    });

    it('should displat loading in cards area', () => {
      const container = selectNativeElementById(fixture, 'cards-container');

      expect(container.innerHTML).toContain('Loading');
    });
  });

  describe('after loaded', () => {

    beforeEach(() => {
      service.isCardsLoading.and.returnValue(of(false));
    });

    describe('without any cards', () => {
      beforeEach(() => {
        service.getCards.and.returnValue(of([]));

        fixture.detectChanges();
      });

      it('should display information', () => {
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('Any cards has not been added to the group');
      });
    });

    describe('with cards', () => {

      beforeEach(() => {
        service.getCards.and.returnValue(of(cardsMock));

        fixture.detectChanges();
      });

      it('should display rows', () => {
        const rows = selectAllDebugElements(fixture, 'app-word-row');

        expect(rows.length).toBe(2);
      });

      it('should edit card', () => {
        const expectedValue = cardsMock[0];
        const cardRow = selectDebugElement(fixture, 'app-word-row');

        cardRow.nativeElement.click();
        expect(service.openDialogToEdit).toHaveBeenCalledWith(expectedValue);
      });

    });
  });
});

const cardsMock = [createCardDetails(), createCardDetails()];

