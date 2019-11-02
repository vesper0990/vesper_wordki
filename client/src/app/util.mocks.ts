import { Observable, Subject } from 'rxjs';
import { User } from './common/models/User';
import { Component } from '@angular/core';
import { Params } from '@angular/router';
import { LessonSettings } from './common/models/model';

@Component({
    template: `<div></div>`
})
export class MockComponent {

}

export class RouterMock {
    eventsSubject: Subject<Event>;
    events: Observable<Event>;
    url = '';
    navigate() { }

    constructor() {
        this.eventsSubject = new Subject<Event>();
        this.events = this.eventsSubject.asObservable();
    }

}

export class UserServiceMock {
    user: User;
    isLogged() { }
    logout() { }
    setUser() { }
}

export class CookiesServiceMock {
    check() { }
    get() { }
    set() { }
    delete() { }
}

export class ActivatedRouteMock {
    subjectParams: Subject<Params>;
    params: Observable<Params>;

    constructor() {
        this.subjectParams = new Subject<Params>();
        this.params = this.subjectParams.asObservable();
    }
}

export class LessonSettingsServiceMock {
    public settings: LessonSettings;

    constructor() {
        this.settings = new LessonSettings();
    }
}
