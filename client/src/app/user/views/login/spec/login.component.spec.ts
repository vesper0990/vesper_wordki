import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from '../login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { UserProviderBase } from '@app/user/services/provider-base.service';
import { UserService } from '@app/common/services';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UserProviderMock } from '@app/user/services/provider-mock.service';
import { setTextByCss } from 'src/app/util.test';
import { UserServiceMock, RouterMock } from 'src/app/util.mocks';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let userProvider: UserProviderMock;
    let userService: UserServiceMock;
    let routerMock: RouterMock;

    beforeEach(async(() => {
        userProvider = new UserProviderMock();
        userService = new UserServiceMock();
        routerMock = new RouterMock();
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            providers: [
                {
                    provide: Router,
                    useValue: routerMock
                },
                {
                    provide: UserProviderBase,
                    useValue: userProvider,
                },
                {
                    provide: UserService,
                    useValue: userService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        component.loginForm.patchValue({
            userName: 'username',
            password: 'password'
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call login api method after login click', () => {
        spyOn(userProvider, 'getUser').and.callThrough();
        fixture.detectChanges();
        component.login();
        expect(userProvider.getUser).toHaveBeenCalled();

    });

    it('should have correct groupForm', async(() => {
        fixture.whenStable().then(() => {
            setTextByCss<LoginComponent>(fixture, '.user-text', 'userNameTest');
            setTextByCss<LoginComponent>(fixture, '.password-text', 'passwordTest');

            expect(component.loginForm.get('userName').value).toEqual('userNameTest');
            expect(component.loginForm.get('password').value).toEqual('passwordTest');
        });
    }));

    it('should process after click enter', () => {
        spyOn(component, 'login').and.callThrough();
        const event = new KeyboardEvent('keyup', {
            'key': 'Enter'
        });

        fixture.debugElement.query(By.css('.user-text')).nativeElement.dispatchEvent(event);

        expect(component.login).toHaveBeenCalled();
    });

    it('should set user after success login', fakeAsync(() => {
        spyOn(userProvider, 'getUser').and.returnValue(of({}));
        spyOn(userService, 'setUser').and.callThrough();

        component.login();
        fixture.detectChanges();

        expect(userService.setUser).toHaveBeenCalled();
    }));

    it('should navigate after success login', fakeAsync(() => {
        spyOn(userProvider, 'getUser').and.returnValue(of({}));
        spyOn(routerMock, 'navigate').and.callThrough();

        component.login();
        fixture.detectChanges();

        expect(routerMock.navigate).toHaveBeenCalledWith(['wordki/']);
    }));
});
