import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createProvider, getAllMethods } from 'src/app/test/helpers.spec';
import { UserService } from '../user.service/user.service';
import { LoginGuardService } from './login-guard';

describe('LoginGuard', () => {
    let service: LoginGuardService;
    let userService: jasmine.SpyObj<UserService>;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                LoginGuardService,
                createProvider(UserService)
            ]
        }).compileComponents();
        router = TestBed.inject(Router);
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        service = TestBed.inject(LoginGuardService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should canActivate', () => {
        userService.isLogin.and.returnValue(true);
        const result = service.canActivate({} as any, {} as any);
        expect(result).toBeTrue();
    });

    it('should not canActivate', () => {
        spyOn(router, 'parseUrl');
        userService.isLogin.and.returnValue(false);
        service.canActivate({} as any, {} as any);
        expect(router.parseUrl).toHaveBeenCalledTimes(1);
    });
});
