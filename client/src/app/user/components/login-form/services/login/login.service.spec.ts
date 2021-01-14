import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { getAllMethods } from 'src/app/test/helpers.spec';
import { UserProvider } from 'src/app/user/services/user.provider/user.provider';
import { UserProviderBase } from 'src/app/user/services/user.provider/user.provider.base';
import { LoginService } from './login.service';

describe('LoginService', () => {

    let service: LoginService;
    let userHttp: jasmine.SpyObj<UserProviderBase>;
    let router: Router;
    let userService: jasmine.SpyObj<UserService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ReactiveFormsModule,
            ],
            providers: [
                LoginService,
                { provide: UserService, useValue: jasmine.createSpyObj(['refresh']) },
                { provide: UserProviderBase, useValue: jasmine.createSpyObj(getAllMethods(UserProvider)) },
            ]
        });


        service = TestBed.inject(LoginService);

        userHttp = TestBed.inject(UserProviderBase) as jasmine.SpyObj<UserProviderBase>;

        router = TestBed.inject(Router);

        userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    });

    describe('with any startpoint', () => {
        beforeEach(() => {
            TestBed.compileComponents();
        });

        it('should created', () => {
            expect(service).toBeTruthy();
        });

        it('should return proper form', () => {
            const form = service.getForm();
            expect(form.get('userName')).toBeTruthy();
            expect(form.get('password')).toBeTruthy();
        });

        it('should not send request if form is invalid', () => {
            const form = service.getForm();
            form.markAllAsTouched();

            service.sendLoginRequest();

            expect(userHttp.login).toHaveBeenCalledTimes(0);
        });

        it('should retrun errors', () => {
            service.getErrors().subscribe(value => expect(value).toBeTruthy());
        });
    });


    describe('with token', () => {

        const testToken = 'test-token';

        beforeEach(() => {
            userHttp.login.and.returnValue(of(testToken));
            TestBed.compileComponents();
        });

        it('should send request if form is valid', () => {
            const patchedValued = {
                userName: 'testUserName',
                password: 'testPassword'
            };

            const routerSpy = spyOn(router, 'navigate').and.stub();

            const form = service.getForm();
            form.patchValue(patchedValued);
            form.markAllAsTouched();

            service.sendLoginRequest();

            expect(userService.refresh).toHaveBeenCalledWith(testToken);
            expect(userHttp.login).toHaveBeenCalledWith(patchedValued);
            expect(routerSpy.calls.first().args[0]).toContain('/dashboard');
        });

        it('should add error when error appear after request', () => {
            const form = service.getForm();
            const patchedValued = {
                userName: 'testUserName',
                password: 'testPassword',
            };
            form.patchValue(patchedValued);
            form.markAllAsTouched();

            userHttp.login.and.returnValue(throwError(new Error('test')));
            service.sendLoginRequest();

            service.getErrors().subscribe(value => expect(value.length).toBe(1));

        });

    });
});
