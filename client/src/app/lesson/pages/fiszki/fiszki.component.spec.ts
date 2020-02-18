import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FiszkiComponent } from './fiszki.component';
import { Store } from '@ngrx/store';
import { RouteParamsHandler } from '../../services/route-params.handler/route-params.handler';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LessonState } from '../../store/reducer';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { ControlButtonsComponent } from '../../components/control-buttons/control-buttons.component';
import { FiszkaComponent } from '../../components/fiszka/fiszka.component';
import { Mock } from 'ts-mockery';

describe('FiszkiComponent', () => {
  let component: FiszkiComponent;
  let fixture: ComponentFixture<FiszkiComponent>;
  const storeMock = Mock.extend(Mock.all<Store<LessonState>>()).with({ select: (isAnyWord) => of(false) });
  const routeParamsHandlerMock = Mock.all<RouteParamsHandler>();
  const routerMock = Mock.all<Router>();
  const routeMock = Mock.extend(Mock.all<ActivatedRoute>()).with({ params: of(<Params>{ ['id']: 1 }) });

  beforeEach(async(() => {
    Mock.configure('jasmine');
    TestBed.configureTestingModule({
      declarations: [FiszkiComponent,
        MockComponent(FiszkaComponent),
        MockComponent(ControlButtonsComponent)],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: RouteParamsHandler, useValue: routeParamsHandlerMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
      ]
    })
      .compileComponents();
  }));

  // it('should create', () => {
  //   fixture = TestBed.createComponent(FiszkiComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });

  // it('should redirect if no words', () => {
  //   Mock.extend(storeMock).with({ select: () => of(false) });
  //   fixture = TestBed.createComponent(FiszkiComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   expect(routerMock.navigate).toHaveBeenCalledWith(['dashboard']);
  // });

  // it('should routeParamsHandler call', () => {
  //   fixture = TestBed.createComponent(FiszkiComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   expect(routeParamsHandlerMock.handle).toHaveBeenCalledWith(<Params>{ ['id']: 1 });
  // });

});
