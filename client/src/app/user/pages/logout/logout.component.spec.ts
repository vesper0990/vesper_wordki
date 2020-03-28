import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { Router } from '@angular/router';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      providers: [
        { provide: UserService, useValue: jasmine.createSpyObj('userService', ['logout']) },
        { provide: Router, useValue: jasmine.createSpyObj('router', ['navigate']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
