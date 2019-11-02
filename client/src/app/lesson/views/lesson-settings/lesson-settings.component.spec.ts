import { LessonSettingsComponent } from './lesson-settings.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterMock, CookiesServiceMock, MockComponent, LessonSettingsServiceMock } from 'src/app/util.mocks';
import { Router, Route } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { LessonSettingsService } from '@app/common/services/lesson-settings.service';
import { Group, LanguageEnum, LessonTypeEnum } from '@app/common/models/model';
import { LessonTypeProvider, LanguagesProvider } from '@app/common/services';

describe('LessonSettingsComponent', () => {
    let fixture: ComponentFixture<LessonSettingsComponent>;
    let component: LessonSettingsComponent;
    let routerMock: RouterMock;
    let cookiesMock: CookiesServiceMock;
    let lessonSettingsServiceMock: LessonSettingsServiceMock;

    beforeEach(async(() => {
        routerMock = new RouterMock();
        cookiesMock = new CookiesServiceMock();
        lessonSettingsServiceMock = new LessonSettingsServiceMock();
        lessonSettingsServiceMock.settings.group = <Group>{ language1: LanguageEnum.English, language2: LanguageEnum.Polish };
        TestBed.configureTestingModule({
            declarations: [
                LessonSettingsComponent,
                DropdownBaseMockComponent,
                DropdownItemLanguageMockComponent,
                MockComponent
            ],
            imports: [
                FormsModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [
                { provide: Router, useValue: routerMock },
                { provide: CookieService, useValue: cookiesMock },
                { provide: LessonSettingsService, useValue: lessonSettingsServiceMock }
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LessonSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate out if group is null', () => {
        spyOn(routerMock, 'navigate').and.callThrough();
        lessonSettingsServiceMock.settings.group = null;

        component.ngOnInit();

        expect(routerMock.navigate).toHaveBeenCalledWith(['../wordki/database/groups']);
    });

    it('should prepare languages', () => {
        lessonSettingsServiceMock.settings.group = <Group>{ language1: LanguageEnum.English, language2: LanguageEnum.Polish };

        component.ngOnInit();

        expect(component.languages.length).toBe(2);
        expect(component.languages[0].languageEnum).toBe(LanguageEnum.English);
        expect(component.languages[1].languageEnum).toBe(LanguageEnum.Polish);
    });

    it('should get values from cookies', () => {
        spyOn(cookiesMock, 'check').and.returnValues(true, true, true);
        spyOn(cookiesMock, 'get').and.returnValues('true', '1', '0');

        component.ngOnInit();

        expect(component.allWords).toBeTruthy();
        expect(component.selectedLanguage.languageEnum).toBe(LanguageEnum.English, 'languageEnum wrong');
        // expect(component.selectedLessonType.lessonTypeEnum).toBe(LessonTypeEnum.Fiszki, 'lessonTypeEnum wrong');
    });


    [
        { option: LessonTypeEnum.Fiszki, url: ['/wordki/lesson/fiszki'] },
        { option: LessonTypeEnum.Typing, url: ['/wordki/lesson/typing'] }
    ].forEach(item => it('should navigate to lesson', () => {
        component.selectedLanguage = LanguagesProvider.languages[0];
        component.selectedLessonType = LessonTypeProvider.lessonTypes[0];
        component.selectedLessonType.lessonTypeEnum = item.option;
        spyOn(routerMock, 'navigate').and.callThrough();

        component.startLesson();

        expect(routerMock.navigate).toHaveBeenCalledWith(item.url);
    }));
});

@Component({
    selector: 'app-dropdown-base-b',
    template: ''
})
class DropdownBaseMockComponent {
    @Input() items: any;
    @Input() selectedItem: any;
}

@Component({
    selector: 'app-dropdown-item-language',
    template: ''
})
class DropdownItemLanguageMockComponent {
    @Input() language: any;
}

const routes: Route[] = [
    { path: 'group/:id', component: MockComponent }
];
