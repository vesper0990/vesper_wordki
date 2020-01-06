import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../authorization/services/user.service/user.service';
import { Router } from '@angular/router';
import { UserProviderBase } from '../../services/user.provider/user.provider';
import { forkJoin } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private userProvider: UserProviderBase,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      userName: '',
      password: ''
    });
  }

  ngOnInit() {
    if (this.userService.isLogin()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(value: { userName: string, password: string }): void {
    forkJoin({
      login: this.userProvider.login(value.userName, value.password),
      authenticate: this.userProvider.authenticate(value.userName, value.password),
    }).subscribe((result: { login: any, authenticate: any }) => {
      this.userService.refresh(result.authenticate);
      this.router.navigate(['/dashboard']);
    },
      error => {
        console.log('login error', error);
      });
  }
}
