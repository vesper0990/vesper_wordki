import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectNewGroupModel, selectParsedCard, selectParseModel } from '../../store/selectors';
import { groupCreatorMockState } from '../../store/spec/store.mock';
import { ParsedCardComponent } from './parsed-card.component';

describe('ParsedCardComponent', () => {
  let component: ParsedCardComponent;
  let fixture: ComponentFixture<ParsedCardComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParsedCardComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectParsedCard, []);

    fixture = TestBed.createComponent(ParsedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
