import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { UserProvider, UserProviderBase } from '../../services/user.provider/user.provider';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { RegisterContract } from '../../services/user.provider/register.contract';
import { AuthenticateContract } from '../../services/user.provider/authenticate.contract';
import { ApiException, ErrorCodes } from 'src/app/share/models/error-codes.model';
import { MessageService, Message } from 'primeng/api';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss', '../../styles-users.scss'],
  providers: [MessageService]
})
export class RegisterFormComponent implements OnInit {

  userName = this.fb.control('', Validators.required);
  password = this.fb.control('', Validators.required);
  passwordConfirmation = this.fb.control('', [Validators.required, notSameValidator(this.password)]);

  registerForm = this.fb.group({
    userName: this.userName,
    password: this.password,
    passwordConfirmation: this.passwordConfirmation
  });

  constructor(private fb: FormBuilder,
    private userProvider: UserProviderBase,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.registerForm.disable();
    const registerContract = <RegisterContract>this.registerForm.value;
    const authenticateContract = <AuthenticateContract>this.registerForm.value;

    this.userProvider.register(registerContract).subscribe(() => {
      this.userProvider.authenticate(authenticateContract).subscribe(authenticate => {
        this.userService.refresh(authenticate);
        this.router.navigate(['/dashboard']);
      }, (error: ApiException) => this.handleError(error));
    },
      (error: ApiException) => this.handleError(error));
  }

  private handleError(error: ApiException): void {
    this.registerForm.enable();
    switch (error.code) {
      case ErrorCodes.EmptyParameter:
      case ErrorCodes.EmptyRequest:
        this.messageService
          .add(<Message>{
            closable: true,
            severity: 'error',
            summary: 'Rejestracja nie powiodła się',
            detail: 'Błąd aplikacji'
          });
        break;
      case ErrorCodes.UserAlreadyExists:
        this.messageService
          .add(<Message>{
            closable: true,
            severity: 'error',
            summary: 'Rejestracja nie powiodło się',
            detail: 'Nazwa użytkownika jest już zajęta'
          });
        break;
      default:
        this.router.navigate(['/error']);
        break;
    }
  }
}

export function notSameValidator(comparableControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isSame = comparableControl.value === control.value;
    return isSame ? null : { 'notSame': { value: control.value } };
  };
}
