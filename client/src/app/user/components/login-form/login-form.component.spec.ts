import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProviderBase } from '../../services/user.provider/user.provider';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { Router } from '@angular/router';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ LoginFormComponent ],
      providers: [
        { provide: UserProviderBase, useValue: jasmine.createSpyObj('userProvider', ['']) },
        { provide: UserService, useValue: jasmine.createSpyObj('userService', ['']) },
        { provide: Router, useValue: jasmine.createSpyObj('router', ['']) },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
