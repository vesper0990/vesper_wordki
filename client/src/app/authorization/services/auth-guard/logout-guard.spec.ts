import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createProvider } from 'src/app/test/helpers.spec';
import { UserService } from '../user.service/user.service';
import { LogoutGuardService } from './logout-guard';

describe('LogoutGuard', () => {
    let service: LogoutGuardService;
    let userService: jasmine.SpyObj<UserService>;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            providers: [
                LogoutGuardService,
                createProvider(UserService)
            ]
        }).compileComponents();
        router = TestBed.inject(Router);
        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
        service = TestBed.inject(LogoutGuardService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should canActivate', () => {
        userService.isLogin.and.returnValue(false);
        const result = service.canActivate({} as any, {} as any);
        expect(result).toBeTrue();
    });

    it('should not canActivate', () => {
        spyOn(router, 'parseUrl');
        userService.isLogin.and.returnValue(true);
        service.canActivate({} as any, {} as any);
        expect(router.parseUrl).toHaveBeenCalledTimes(1);
    });
});
