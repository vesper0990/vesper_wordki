import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectNewGroupModel, selectParseModel, selectRowElements } from '../../store/selectors';
import { groupCreatorMockState } from '../../store/spec/store.mock';
import { RowSelectorComponent } from './row-selector.component';

describe('RowSelectorComponent', () => {
  let component: RowSelectorComponent;
  let fixture: ComponentFixture<RowSelectorComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RowSelectorComponent],
      providers: [
        provideMockStore()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectRowElements, []);

    fixture = TestBed.createComponent(RowSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
