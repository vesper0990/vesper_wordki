import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service/user.service';
import { Router } from '@angular/router';
import { UserProviderBase } from '../../services/user.provider/user.provider';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    forkJoin([
      this.userProvider.login(value.userName, value.password),
      this.userProvider.authenticate(value.userName, value.password)
    ]).subscribe(results => {
      this.userService.refresh(results[1].token);
      this.router.navigate(['/dashboard']);
    },
      error => {
        console.log('login error', error);
      });
  }
}
