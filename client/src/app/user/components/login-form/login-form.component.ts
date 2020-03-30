import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProviderBase } from '../../services/user.provider/user.provider';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { Router } from '@angular/router';
import { LoginContract } from '../../services/user.provider/login.contract';
import { AuthenticateContract } from '../../services/user.provider/authenticate.contract';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  userName = this.fb.control('', [Validators.required]);
  password = this.fb.control('', [Validators.required]);

  loginForm: FormGroup = this.fb.group({
    userName: this.userName,
    password: this.password,
  });

  constructor(private fb: FormBuilder,
    private userProvider: UserProviderBase,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const loginContract = <LoginContract>{
      userName: this.userName.value,
      password: this.password.value
    };
    const authenticateContract = <AuthenticateContract>{
      userName: this.userName.value,
      password: this.password.value
    };
    forkJoin({
      login: this.userProvider.login(loginContract),
      authenticate: this.userProvider.authenticate(authenticateContract),
    }).subscribe((result: { login: any, authenticate: any }) => {
      this.userService.refresh(result.authenticate);
      this.router.navigate(['/dashboard']);
    });
  }

}
