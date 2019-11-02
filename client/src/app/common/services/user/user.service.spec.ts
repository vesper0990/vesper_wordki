import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/User';
import { CookiesServiceMock } from 'src/app/util.mocks';

let userService: UserService;
let cookiesMock: CookiesServiceMock;

describe('UserService when cookie exists', () => {
    const cookie = '{"id":"1", "name":"test", "password":"test", "token":"test", "expires":1}';
    beforeEach(() => {
        cookiesMock = new CookiesServiceMock();
        spyOn(cookiesMock, 'check').withArgs('user').and.returnValue(true);
        spyOn(cookiesMock, 'get').withArgs('user').and.returnValue(cookie);
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: CookieService,
                    useValue: cookiesMock
                }
            ]
        });
        userService = TestBed.get(UserService);
    });

    it('should be created', () => {
        expect(userService).toBeTruthy();
    });

    it('should create user when exists in cookies', () => {
        expect(userService.user.name).toBe('test');
    });

    it('should be logged', () => {
        expect(userService.isLogged()).toBe(true);
    });

    it('should can logout', () => {
        spyOn(cookiesMock, 'delete').withArgs('user').and.callThrough();

        userService.logout();

        expect(userService.user).toBeNull();
        expect(userService.isLogged()).toBe(false);
        expect(cookiesMock.delete).toHaveBeenCalledTimes(1);
    });

    it('should can login', () => {
        const user = <User>{ id: '2', name: 'aaa', password: 'aaa', token: 'aaa', expires: 2 };
        spyOn(cookiesMock, 'set').and.callThrough();

        userService.setUser(user);

        expect(userService.user).toBe(user);
        expect(userService.isLogged()).toBe(true);
        expect(cookiesMock.set).toHaveBeenCalledWith('user', '{"id":"2","name":"aaa","password":"aaa","token":"aaa","expires":2}');
    });
});


describe('UserService when cookie not exists', () => {
    beforeEach(() => {
        cookiesMock = new CookiesServiceMock();
        spyOn(cookiesMock, 'check').withArgs('user').and.returnValue(false);
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: CookieService,
                    useValue: cookiesMock
                }
            ]
        });
        userService = TestBed.get(UserService);
    });

    it('should be created', () => {
        expect(userService).toBeTruthy();
    });

    it('should be logout', () => {
        expect(userService.isLogged()).toBe(false);
    });

    it('should can logout', () => {
        spyOn(cookiesMock, 'delete').withArgs('user').and.callThrough();

        userService.logout();

        expect(userService.user).toBeNull();
        expect(userService.isLogged()).toBe(false);
        expect(cookiesMock.delete).toHaveBeenCalledTimes(1);
    });

    it('should can login', () => {
        const user = <User>{ id: '2', name: 'aaa', password: 'aaa', token: 'aaa', expires: 2 };
        spyOn(cookiesMock, 'set').and.callThrough();

        userService.setUser(user);

        expect(userService.user).toBe(user);
        expect(userService.isLogged()).toBe(true);
        expect(cookiesMock.set).toHaveBeenCalledWith('user', '{"id":"2","name":"aaa","password":"aaa","token":"aaa","expires":2}');
    });
});
