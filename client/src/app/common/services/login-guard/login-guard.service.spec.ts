import { TestBed } from '@angular/core/testing';
import { LoginGuardService } from './login-guard.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { UserServiceMock, RouterMock } from 'src/app/util.mocks';

describe('LoginGuardService', () => {
  let userServiceMock: UserServiceMock;
  let routerMock: RouterMock;
  let loginGuard: LoginGuardService;
  beforeEach(() => {
    userServiceMock = new UserServiceMock();
    routerMock = new RouterMock();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    });
    loginGuard = TestBed.get(LoginGuardService);
  });

  it('should be created', () => {
    expect(loginGuard).toBeTruthy();
  });

  it('should return true when user is login', () => {
    spyOn(userServiceMock, 'isLogged').and.returnValue(true);
    expect(loginGuard.canActivate(null, null)).toBe(true);
  });

  it('should return false when user is logout', () => {
    spyOn(userServiceMock, 'isLogged').and.returnValue(false);
    expect(loginGuard.canActivate(null, null)).toBe(false);
  });

  it('should redirect when user is logout', () => {
    spyOn(userServiceMock, 'isLogged').and.returnValue(false);
    spyOn(routerMock, 'navigate').and.callThrough();

    loginGuard.canActivate(null, null);

    expect(routerMock.navigate).toHaveBeenCalledWith(['wordki/user/login']);
  });
});
