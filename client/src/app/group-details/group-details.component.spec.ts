import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupDetailsComponent } from './group-details.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ActivatedRouteMock } from '../test/services.mock';
import { GroupDetailsProviderBase } from './services/group-details.provider/group-details.provider';
import { MockComponent } from 'ng-mocks';
import { WordRowComponent } from './components/word-row/word-row.component';
import { of } from 'rxjs';
import { GroupDetails } from './models/group-details.model';

describe('GroupDetailsComponent', () => {
  let component: GroupDetailsComponent;
  let fixture: ComponentFixture<GroupDetailsComponent>;
  let routerMock: Router;
  let groupDetailsProviderMock: GroupDetailsProviderBase;

  const activetedRouteMock = new ActivatedRouteMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupDetailsComponent,
        MockComponent(WordRowComponent)
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
    routerMock = TestBed.inject(Router);
    groupDetailsProviderMock = TestBed.inject(GroupDetailsProviderBase);
    spyOn(groupDetailsProviderMock, 'getGroupDetails').and.returnValue(of(<GroupDetails>{}));
    fixture = TestBed.createComponent(GroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download group details after init', () => {
    activetedRouteMock.paramsSubject.next(<Params>{ ['id']: 1 });
    expect(groupDetailsProviderMock.getGroupDetails).toHaveBeenCalledWith(1);
  });
});
