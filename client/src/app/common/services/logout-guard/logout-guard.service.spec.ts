import { TestBed } from '@angular/core/testing';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { LogoutGuardService } from './logout-guard.service';
import { UserServiceMock, RouterMock } from 'src/app/util.mocks';

describe('LoginGuardService', () => {
  let userServiceMock: UserServiceMock;
  let routerMock: RouterMock;
  let logoutGuard: LogoutGuardService;
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
    logoutGuard = TestBed.get(LogoutGuardService);
  });

  it('should be created', () => {
    expect(logoutGuard).toBeTruthy();
  });

  it('should return false when user is login', () => {
    spyOn(userServiceMock, 'isLogged').and.returnValue(true);
    expect(logoutGuard.canActivate(null, null)).toBe(false);
  });

  it('should return true when user is logout', () => {
    spyOn(userServiceMock, 'isLogged').and.returnValue(false);
    expect(logoutGuard.canActivate(null, null)).toBe(true);
  });

  it('should redirect when user is login', () => {
    spyOn(userServiceMock, 'isLogged').and.returnValue(true);
    spyOn(routerMock, 'navigate').and.callThrough();

    logoutGuard.canActivate(null, null);

    expect(routerMock.navigate).toHaveBeenCalledWith(['wordki']);
  });
});
