import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { ButtonComponent } from 'src/app/share/components/button/button.component';
import { createProvider } from 'src/app/test/helpers.spec';
import { inputValueToInputElementByAttribute, selectNativeElement, selectNativeElementById } from 'src/app/test/utils';
import { RegisterFormComponent } from './register-form.component';
import { notSameValidator, RegisterService } from './services/register/register.service';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let service: jasmine.SpyObj<RegisterService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        RegisterFormComponent,
        MockComponent(ButtonComponent)
      ],
      providers: [
        createProvider(RegisterService) 
      ]
    }).compileComponents();

    service = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    service.getForm.and.returnValue(getForm());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
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

  it('should show passwordConfirmation tip', () => {
    service.getForm().patchValue({ passwordConfirmation: 'test' });
    service.getForm().get('passwordConfirmation').markAllAsTouched();
    fixture.detectChanges();

    const userNameContainer = selectNativeElementById(fixture, 'passwordConfirmation');
    expect(userNameContainer.innerHTML).toContain('Passwords are not the same');
  });

  it('should bind to form', () => {
    inputValueToInputElementByAttribute(fixture, '[formControlName="password"]', 'test-password');
    inputValueToInputElementByAttribute(fixture, '[formControlName="passwordConfirmation"]', 'test-passwordConfirmation');
    inputValueToInputElementByAttribute(fixture, '[formControlName="userName"]', 'test-userName');
    fixture.detectChanges();

    expect(service.getForm().get('password').value).toBe('test-password');
    expect(service.getForm().get('passwordConfirmation').value).toBe('test-passwordConfirmation');
    expect(service.getForm().get('userName').value).toBe('test-userName');
  });

  it('should call sendRequest after submit click', () => {
    inputValueToInputElementByAttribute(fixture, '[formControlName="password"]', 'test-password');
    inputValueToInputElementByAttribute(fixture, '[formControlName="passwordConfirmation"]', 'test-password');
    inputValueToInputElementByAttribute(fixture, '[formControlName="userName"]', 'test-userName');
    fixture.detectChanges();

    selectNativeElement(fixture, 'button').click();

    expect(service.sendRegisterRequest).toHaveBeenCalledTimes(1);
  });
});

function getForm(): FormGroup {
  const password = new FormControl('', Validators.required);
  return new FormGroup({
    userName: new FormControl('', Validators.required),
    password: password,
    passwordConfirmation: new FormControl('', [Validators.required, notSameValidator('password')]),
  });
}
