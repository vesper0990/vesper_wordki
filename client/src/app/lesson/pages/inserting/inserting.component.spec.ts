import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InsertingComponent } from './inserting.component';
import { Store } from '@ngrx/store';
import { RouteParamsHandler } from '../../services/route-params.handler/route-params.handler';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonState } from '../../store/reducer';
import { ActivatedRouteMock } from 'src/app/test/services.mock';
import { of } from 'rxjs';
import { isAnyWord } from '../../store/selectors';
import { MockComponent } from 'ng-mocks';
import { InsertComponent } from '../../components/insert/insert.component';
import { ControlButtonsComponent } from '../../components/control-buttons/control-buttons.component';

describe('InsertingComponent', () => {
  let component: InsertingComponent;
  let fixture: ComponentFixture<InsertingComponent>;
  let storeMock: jasmine.SpyObj<Store<LessonState>>;
  let routeParamsHandlerMock: jasmine.SpyObj<RouteParamsHandler>;
  let routerMock: jasmine.SpyObj<Router>;
  const routeMock = new ActivatedRouteMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsertingComponent,
        MockComponent(InsertComponent),
        MockComponent(ControlButtonsComponent)],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('store', ['select', 'dispatch'])
        },
        {
          provide: RouteParamsHandler,
          useValue: jasmine.createSpyObj('routeParamsHandler', [''])
        },
        {
          provide: ActivatedRoute,
          useValue: routeMock
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('router', [''])
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    storeMock = TestBed.get(Store);
    storeMock.select.withArgs(isAnyWord).and.returnValue(of({}));
    routeParamsHandlerMock = TestBed.get(RouteParamsHandler);
    routerMock = TestBed.get(Router);
    fixture = TestBed.createComponent(InsertingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
