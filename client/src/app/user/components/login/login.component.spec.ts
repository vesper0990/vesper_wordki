import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProviderBase } from '../../services/user.provider/user.provider';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { Router } from '@angular/router';
import * as util from '../../../test/utils';
import { of } from 'rxjs';

jasmine.getEnv().allowRespy(true);

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userProviderBaseMock: UserProviderBase;
  let userServiceMock: UserService;
  let routerMock: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: UserProviderBase,
          useValue: jasmine.createSpyObj('userProviderBase', ['login', 'authenticate'])
        },
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('userService', ['isLogin', 'refresh'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('router', ['navigate'])
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    userProviderBaseMock = fixture.debugElement.injector.get(UserProviderBase);
    userServiceMock = fixture.debugElement.injector.get(UserService);
    routerMock = fixture.debugElement.injector.get(Router);
    component = fixture.componentInstance;
  });

  describe(' when user is login ', () => {
    
    beforeEach(() => {
      spyOn(userServiceMock, 'isLogin').and.returnValue(true);
      fixture.detectChanges();
    });
    
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should navigate to dashboard if user is logged', () => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
  });

  describe(' when user is not login ', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should send request', () => {
      util.inputValueToInputElementById(fixture, 'userName', 'test');
      util.inputValueToInputElementById(fixture, 'password', 'test');
      spyOn(userProviderBaseMock, 'login').and.returnValue(of<any>({}));
      spyOn(userProviderBaseMock, 'authenticate').and.returnValue(of<any>('test'));

      fixture.detectChanges();
      util.clickButton(fixture);

      expect(userServiceMock.refresh).toHaveBeenCalledWith('test');
      expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);

    });

  });

});
