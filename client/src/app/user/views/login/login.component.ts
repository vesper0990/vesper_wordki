import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/common/models/model';
import { UserProviderBase } from '../../services/provider-base.service';
import { UserService } from '@app/common/services/user/user.service';
import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { UserRequest } from '../../model/UserRequest';
import { UserDTO } from '../../model/UserDTO';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private userProvider: UserProviderBase,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
  }

  public onEnterClick(): void {
    this.login();
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const loginRequest: UserRequest = this.loginForm.value;
    this.userProvider.login(loginRequest).subscribe(
      () => {
        const getUser = <UserRequest>this.loginForm.value;
        this.userProvider.getUser(getUser).subscribe(
          (userDTO: UserDTO) => this.onLoginSuccess(userDTO),
          (error: any) => console.error(error)
        );
      },
      (error: any) => console.error(error)
    );
  }

  private onLoginSuccess(userDTO: UserDTO): void {
    const user = new User();
    user.id = userDTO.id;
    user.name = userDTO.name;
    user.token = userDTO.token.token;
    this.userService.setUser(user);
    this.router.navigate(['wordki/']);
  }
}

export function customValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const check = (control.value as string).length < 4;
    console.log('check');
    return check ? { 'cutom': { value: control.value } } : null;
  };
}
