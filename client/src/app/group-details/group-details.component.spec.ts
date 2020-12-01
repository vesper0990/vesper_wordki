import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupDetailsComponent } from './group-details.component';
import { MockComponent } from 'ng-mocks';
import { WordRowComponent } from './components/word-row/word-row.component';
import { EditWordDialogComponent } from '../share/components/edit-word-dialog/edit-word-dialog.component';
import { CardsListService } from './services/words-list/words-list.service';
import { createProvider } from '../test/helpers.spec';
import { selectAllDebugElements, selectDebugElement, selectNativeElementById } from '../test/utils';
import { of } from 'rxjs';
import { Word } from './models/word.model';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

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
        service.getCards.and.returnValue(of([{} as Word, {} as Word]));

        fixture.detectChanges();
      });

      it('should display rows', () => {
        const rows = selectAllDebugElements(fixture, 'app-word-row');

        expect(rows.length).toBe(2);
      });

      it('should edit card', () => {
        const expectedValue = { language1: 'test' } as Word;
        const cardRow = selectDebugElement(fixture, 'app-word-row');

        cardRow.componentInstance.editWord.emit(expectedValue);
        expect(service.openDialogToEdit).toHaveBeenCalledWith(expectedValue);
      });

    });
  });
});

