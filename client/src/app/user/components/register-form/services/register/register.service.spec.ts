import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { createProvider, getAllMethods } from 'src/app/test/helpers.spec';
import { UserProvider } from 'src/app/user/services/user.provider/user.provider';
import { UserProviderBase } from 'src/app/user/services/user.provider/user.provider.base';
import { RegisterService } from './register.service';

describe('RegisterService', () => {

    let service: RegisterService;
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
                RegisterService,
                createProvider(UserService),
                { provide: UserProviderBase, useValue: jasmine.createSpyObj(getAllMethods(UserProvider)) },
            ]
        });


        service = TestBed.inject(RegisterService);

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
            expect(form.get('passwordConfirmation')).toBeTruthy();
        });

        it('should not send request if form is invalid', () => {
            const form = service.getForm();
            form.markAllAsTouched();

            service.sendRegisterRequest();

            expect(userHttp.register).toHaveBeenCalledTimes(0);
        });

        it('should retrun errors', () => {
            service.getErrors().subscribe(value => expect(value).toBeTruthy());
        });


    });


    describe('with token', () => {

        const testToken = 'test-token';

        beforeEach(() => {
            userHttp.register.and.returnValue(of({}));
            userHttp.login.and.returnValue(of(testToken));
            TestBed.compileComponents();
        });

        it('should send request if form is valid', () => {
            const patchedValued = {
                userName: 'testUserName',
                password: 'testPassword',
                passwordConfirmation: 'testPassword'
            };

            const routerSpy = spyOn(router, 'navigate').and.stub();

            const form = service.getForm();
            form.patchValue(patchedValued);
            form.markAllAsTouched();

            service.sendRegisterRequest();

            expect(userService.refresh).toHaveBeenCalledWith(testToken);
            expect(userHttp.register).toHaveBeenCalledWith(patchedValued);
            expect(routerSpy.calls.first().args[0]).toContain('/dashboard');
        });

        it('should add error when error appear after request', () => {
            const form = service.getForm();
            const patchedValued = {
                userName: 'testUserName',
                password: 'testPassword',
                passwordConfirmation: 'testPassword'
            };
            form.patchValue(patchedValued);
            form.markAllAsTouched();

            userHttp.register.and.returnValue(throwError(new Error('test')));
            service.sendRegisterRequest();

            service.getErrors().subscribe(value => expect(value.length).toBe(1));

        });

        it('should navigate to error when login failed', () => {
            const form = service.getForm();
            const patchedValued = {
                userName: 'testUserName',
                password: 'testPassword',
                passwordConfirmation: 'testPassword'
            };
            form.patchValue(patchedValued);
            form.markAllAsTouched();
            const routerSpy = spyOn(router, 'navigate').and.stub();

            userHttp.login.and.returnValue(throwError(new Error('test')));
            service.sendRegisterRequest();

            expect(routerSpy.calls.first().args[0]).toContain('/error');

        });

    });
});
