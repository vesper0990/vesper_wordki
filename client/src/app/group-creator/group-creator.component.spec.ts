import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents } from 'ng-mocks';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { ParsedCardComponent } from './components/parsed-card/parsed-card.component';
import { RowSelectorComponent } from './components/row-selector/row-selector.component';
import { GroupCreatorComponent } from './group-creator.component';
import { selectCanGenerate, selectCanSave, selectNewGroupModel, selectParseModel } from './store/selectors';
import { groupCreatorMockState } from './store/spec/store.mock';

describe('GroupCreatorComponent', () => {
  let component: GroupCreatorComponent;
  let fixture: ComponentFixture<GroupCreatorComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCreatorComponent,
        MockComponents(RowSelectorComponent, ParsedCardComponent, GroupDetailsComponent)
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectCanGenerate, true);
    store.overrideSelector(selectCanSave, true);

    fixture = TestBed.createComponent(GroupCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
