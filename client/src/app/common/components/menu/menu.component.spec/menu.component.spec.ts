import { MenuComponent } from '../menu.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from '@app/common/services/user/user.service';
import { By } from '@angular/platform-browser';
import { User } from '@app/common/models/model';
import { RouterMock, UserServiceMock } from 'src/app/util.mocks';
import { getElementByTagAndInnerText } from 'src/app/util.test';

describe('MenuComponent when url is empty and user is not logged', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let routerMock: RouterMock;
    let userServiceMock: UserServiceMock;

    beforeEach(async(() => {
        routerMock = new RouterMock();
        routerMock.url = '';
        userServiceMock = new UserServiceMock();
        spyOn(userServiceMock, 'isLogged').and.returnValue(false);

        TestBed.configureTestingModule({
            declarations: [MenuComponent],
            imports: [
            ],
            providers: [
                {
                    provide: Router, useValue: routerMock
                },
                {
                    provide: UserService, useValue: userServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be not visible', () => {
        expect(component.isVisible).toBe(false);
    });

    it('should be became visible if url was changed', () => {
        routerMock.url = 'wordki';
        routerMock.eventsSubject.next(<Event>{});

        fixture.whenStable();
        expect(component.isVisible).toBe(true);
    });

    it('should have 0 "a" elements', () => {
        const elements = fixture.debugElement.queryAll(By.css('a'));
        expect(elements.length).toBe(0);
    });
});

describe('MenuComponent when url is wordki and user is not logged', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let routerMock: RouterMock;
    let userServiceMock: UserServiceMock;

    beforeEach(async(() => {
        routerMock = new RouterMock();
        routerMock.url = 'wordki';
        userServiceMock = new UserServiceMock();
        spyOn(userServiceMock, 'isLogged').and.returnValue(false);

        TestBed.configureTestingModule({
            declarations: [MenuComponent],
            imports: [
            ],
            providers: [
                {
                    provide: Router, useValue: routerMock
                },
                {
                    provide: UserService, useValue: userServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be not visible', () => {
        expect(component.isVisible).toBe(true);
    });

    it('should be became visible if url was changed', () => {
        routerMock.url = '';
        routerMock.eventsSubject.next(<Event>{});

        fixture.whenStable();
        expect(component.isVisible).toBe(false);
    });

    it('should have 2 "a" elements', () => {
        const elements = fixture.debugElement.queryAll(By.css('a'));
        expect(elements.length).toBe(2);
    });
});

describe('MenuComponent when url is wordki and user is logged', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let routerMock: RouterMock;
    let userServiceMock: UserServiceMock;

    beforeEach(async(() => {
        routerMock = new RouterMock();
        routerMock.url = 'wordki';
        userServiceMock = new UserServiceMock();
        spyOn(userServiceMock, 'isLogged').and.returnValue(true);
        userServiceMock.user = <User>{ name: 'test' };

        TestBed.configureTestingModule({
            declarations: [MenuComponent],
            imports: [
            ],
            providers: [
                {
                    provide: Router, useValue: routerMock
                },
                {
                    provide: UserService, useValue: userServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be not visible', () => {
        expect(component.isVisible).toBe(true);
    });

    it('should be became visible if url was changed', () => {
        routerMock.url = '';
        routerMock.eventsSubject.next(<Event>{});

        fixture.whenStable();
        expect(component.isVisible).toBe(false);
    });

    it('should have 4 "a" elements', () => {
        const elements = fixture.debugElement.queryAll(By.css('a'));
        expect(elements.length).toBe(4);
    });

    it('should logout when click in Wyloguj', () => {
        spyOn(userServiceMock, 'logout').and.callThrough();
        spyOn(routerMock, 'navigate').and.callThrough();
        const element = getElementByTagAndInnerText(fixture, 'a', 'Wyloguj');

        element.nativeElement.click();
        fixture.whenStable();

        expect(userServiceMock.logout).toHaveBeenCalledTimes(1);
        expect(routerMock.navigate).toHaveBeenCalledWith(['wordki']);
    });
});

