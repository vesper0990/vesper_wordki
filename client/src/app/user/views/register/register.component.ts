import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProviderBase } from '../../services/provider-base.service';
import { RegisterRequest } from '@app/common/models/model';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
    passwordRepeat: new FormControl('', Validators.required)
  });

  constructor(private userProvider: UserProviderBase,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  public onEnterClick(): void {
    this.register();
  }

  public register(): void {
    const registerRequest: RegisterRequest = this.registerForm.value;
    this.userProvider.register(registerRequest).subscribe(
      () => this.onRegisterSuccess(),
      (error: any) => console.error(error)
    );
  }

  private onRegisterSuccess(): void {
    this.router.navigate(['/wordki/registerComplete']);
  }
}

function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': 'value is only whitespace' };
  };
}
