import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetailsComponent } from './group-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteMock } from '../test/services.mock';
import { GroupDetailsProviderBase } from './services/group-details.provider/group-details.provider';
import { WordRowMockComponent } from '../test/compontens.mock';

describe('GroupDetailsComponent', () => {
  let component: GroupDetailsComponent;
  let fixture: ComponentFixture<GroupDetailsComponent>;
  let routerMock: jasmine.SpyObj<Router>;
  let groupDetailsProviderMock: jasmine.SpyObj<GroupDetailsProviderBase>;

  const activetedRouteMock = new ActivatedRouteMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupDetailsComponent,
        WordRowMockComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activetedRouteMock
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('router', ['navigate'])
        },
        {
          provide: GroupDetailsProviderBase,
          useValue: jasmine.createSpyObj('groupDetailsProvdier', ['getGroupDetails'])
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    routerMock = TestBed.get(Router);
    groupDetailsProviderMock = TestBed.get(GroupDetailsProviderBase);
    fixture = TestBed.createComponent(GroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
