import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import { getAllMethods } from 'src/app/test/helpers.spec';

describe('UserService', () => {
  let service: UserService;
  let cookiesMock: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    cookiesMock = jasmine.createSpyObj(getAllMethods(CookieService));
    service = new UserService(cookiesMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return subscription', () => {
    service.subscribe().subscribe(value => expect(value).toBe(false));
  });

  it('should login from cookie', () => {
    const token = 'test-token';
    cookiesMock.check.and.returnValue(true);
    cookiesMock.get.and.returnValue(token);
    service.loginFromCookie();

    expect(service.getToken()).toBe(token);
    expect(service.isLogin()).toBe(true);
    service.subscribe().subscribe(value => expect(value).toBe(true));
  });

  it('should not login if cookie is empty', () => {
    cookiesMock.check.and.returnValue(false);
    service.loginFromCookie();

    expect(service.getToken()).toBe(undefined);
    expect(service.isLogin()).toBe(false);
    service.subscribe().subscribe(value => expect(value).toBe(false));
  });

  it('should logout', () => {
    cookiesMock.check.and.returnValue(true);
    service.logout();

    expect(cookiesMock.delete).toHaveBeenCalled();
    expect(service.getToken()).toBe(null);
    expect(service.isLogin()).toBe(false);
    service.subscribe().subscribe(value => expect(value).toBe(false));
  });

  it('should logout without cookies refresh', () => {
    cookiesMock.check.and.returnValue(false);
    service.logout();

    expect(cookiesMock.delete).toHaveBeenCalledTimes(0);
    expect(service.getToken()).toBe(null);
    expect(service.isLogin()).toBe(false);
    service.subscribe().subscribe(value => expect(value).toBe(false));
  });

  it('should refresh token', () => {
    const token = 'test-token';

    service.refresh(token);

    expect(cookiesMock.set).toHaveBeenCalled();
    expect(service.getToken()).toBe(token);
    expect(service.isLogin()).toBe(true);
    service.subscribe().subscribe(value => expect(value).toBe(true));
  });

  it('should not refresh token if empty', () => {
    const token = '';

    service.refresh(token);

    expect(cookiesMock.set).toHaveBeenCalledTimes(0);
    expect(service.getToken()).toBe(undefined);
    expect(service.isLogin()).toBe(false);
    service.subscribe().subscribe(value => expect(value).toBe(false));
  });
});
