import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from '../login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import * as mocks from './login-form.component.mock.spec';
import { inputValueToInputElementByAttribute, selectNativeElement, selectNativeElementById } from 'src/app/test/utils.spec';
import { createProvider } from 'src/app/test/helpers.spec';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let service: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        LoginFormComponent,
      ],
      providers: [
        createProvider(LoginService)
      ]
    }).compileComponents();

    service = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    service.getForm.and.returnValue(mocks.getForm());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show userName tip', () => {
    service.getForm().get('userName').markAllAsTouched();
    fixture.detectChanges();

    const userNameContainer = selectNativeElementById(fixture, 'userName');
    expect(userNameContainer.innerHTML).toContain('Username cannot be empty');
  });

  it('should show password tip', () => {
    service.getForm().get('password').markAllAsTouched();
    fixture.detectChanges();

    const userNameContainer = selectNativeElementById(fixture, 'password');
    expect(userNameContainer.innerHTML).toContain('Password cannot be empty');
  });

  it('should bind to form', () => {
    inputValueToInputElementByAttribute(fixture, '[formControlName="password"]', 'test-password');
    inputValueToInputElementByAttribute(fixture, '[formControlName="userName"]', 'test-userName');
    fixture.detectChanges();

    expect(service.getForm().get('password').value).toBe('test-password');
    expect(service.getForm().get('userName').value).toBe('test-userName');
  });

  it('should call sendRequest after submit click', () => {
    inputValueToInputElementByAttribute(fixture, '[formControlName="password"]', 'test-password');
    inputValueToInputElementByAttribute(fixture, '[formControlName="userName"]', 'test-userName');
    fixture.detectChanges();

    selectNativeElement(fixture, 'button').click();

    expect(service.getForm).toHaveBeenCalledTimes(1);
  });
});
