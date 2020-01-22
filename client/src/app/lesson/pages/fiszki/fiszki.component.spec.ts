import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiszkiComponent } from './fiszki.component';
import { FiszkaMockComponent, ControlButtonsMockComponent } from 'src/app/test/compontens.mock';
import { Store } from '@ngrx/store';
import { RouteParamsHandler } from '../../services/route-params.handler/route-params.handler';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonState } from '../../store/reducer';
import { ActivatedRouteMock } from 'src/app/test/services.mock';
import { isAnyWord } from '../../store/selectors';
import { of } from 'rxjs';

describe('RepeatComponent', () => {
  let component: FiszkiComponent;
  let fixture: ComponentFixture<FiszkiComponent>;
  let storeMock: jasmine.SpyObj<Store<LessonState>>;
  let routeParamsHandlerMock: jasmine.SpyObj<RouteParamsHandler>;
  let routerMock: jasmine.SpyObj<Router>;
  const routeMock = new ActivatedRouteMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiszkiComponent,
        FiszkaMockComponent,
        ControlButtonsMockComponent],
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
    fixture = TestBed.createComponent(FiszkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
