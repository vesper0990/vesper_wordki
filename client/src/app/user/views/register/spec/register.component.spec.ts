import { RegisterComponent } from '../register.component';
import { ComponentFixture, TestBed, fakeAsync, async } from '@angular/core/testing';
import { UserProviderMock } from '@app/user/services/provider-mock.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProviderBase } from '@app/user/services/provider-base.service';
import { UserService } from '@app/common/services';
import { of } from 'rxjs';
import { UserServiceMock, RouterMock } from 'src/app/util.mocks';
import { setTextByCss } from 'src/app/util.test';


describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    let userProvider: UserProviderMock;
    let userService: UserServiceMock;
    let routerMock: RouterMock;

    beforeEach(async(() => {
        userProvider = new UserProviderMock();
        userService = new UserServiceMock();
        routerMock = new RouterMock();
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
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
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        component.registerForm.patchValue({
            userName: 'username',
            password: 'password',
            passwordRepeat: 'password'
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call register api method after register click', () => {
        spyOn(userProvider, 'register').and.callThrough();
        fixture.detectChanges();
        component.register();
        expect(userProvider.register).toHaveBeenCalled();

    });

    it('should have correct groupForm', async(() => {
        fixture.whenStable().then(() => {
            setTextByCss<RegisterComponent>(fixture, '.user-text', 'userNameTest');
            setTextByCss<RegisterComponent>(fixture, '.password-text', 'passwordTest');

            expect(component.registerForm.get('userName').value).toEqual('userNameTest');
            expect(component.registerForm.get('password').value).toEqual('passwordTest');
        });
    }));

    it('should process after click enter', () => {
        spyOn(component, 'register').and.callThrough();
        const event = new KeyboardEvent('keyup', {
            'key': 'Enter'
        });

        fixture.debugElement.query(By.css('.user-text')).nativeElement.dispatchEvent(event);

        expect(component.register).toHaveBeenCalled();
    });

    it('should navigate after success login', fakeAsync(() => {
        spyOn(userProvider, 'getUser').and.returnValue(of({}));
        spyOn(routerMock, 'navigate').and.callThrough();

        component.register();
        fixture.detectChanges();

        expect(routerMock.navigate).toHaveBeenCalledWith(['/wordki/registerComplete']);
    }));
});
