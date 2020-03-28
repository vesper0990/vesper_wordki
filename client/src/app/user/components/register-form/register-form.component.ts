import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { UserProvider, UserProviderBase } from '../../services/user.provider/user.provider';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { RegisterContract } from '../../services/user.provider/register.contract';
import { AuthenticateContract } from '../../services/user.provider/authenticate.contract';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
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
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const registerContract = <RegisterContract>this.registerForm.value;
    const authenticateContract = <AuthenticateContract>this.registerForm.value;
    forkJoin({
      login: this.userProvider.register(registerContract),
      authenticate: this.userProvider.authenticate(authenticateContract),
    }).subscribe((result: { login: any, authenticate: any }) => {
      this.userService.refresh(result.authenticate);
      this.router.navigate(['/dashboard']);
    },
      error => {
        console.log('login error', error);
      });
  }

}

export function notSameValidator(comparableControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isSame = comparableControl.value === control.value;
    return isSame ? null : { 'notSame': { value: control.value } };
  };
}
