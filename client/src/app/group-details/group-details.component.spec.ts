import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupDetailsComponent } from './group-details.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ActivatedRouteMock } from '../test/services.mock';
import { MockComponent } from 'ng-mocks';
import { WordRowComponent } from './components/word-row/word-row.component';
import { Store } from '@ngrx/store';
import { EditWordDialogComponent } from '../share/components/edit-word-dialog/edit-word-dialog.component';

describe('GroupDetailsComponent', () => {
  let component: GroupDetailsComponent;
  let fixture: ComponentFixture<GroupDetailsComponent>;
  let routerMock: Router;
  const activetedRouteMock = new ActivatedRouteMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupDetailsComponent,
        MockComponent(WordRowComponent),
        MockComponent(EditWordDialogComponent)
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activetedRouteMock },
        { provide: Router, useValue: jasmine.createSpyObj('router', ['navigate']) },
        { provide: Store, useValue: jasmine.createSpyObj('store', ['select', 'dispatch']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    routerMock = TestBed.inject(Router);
    fixture = TestBed.createComponent(GroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
