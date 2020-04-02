import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProviderBase } from '../../services/user.provider/user.provider';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { Router } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MockComponent } from 'ng-mocks';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        RegisterFormComponent,
        MockComponent(Toast)
      ],
      providers: [
        { provide: UserProviderBase, useValue: jasmine.createSpyObj('userProvider', ['']) },
        { provide: UserService, useValue: jasmine.createSpyObj('userService', ['']) },
        { provide: Router, useValue: jasmine.createSpyObj('router', ['']) },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
