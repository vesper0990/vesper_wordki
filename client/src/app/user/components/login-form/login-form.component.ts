import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../../styles-users.scss']
})
export class LoginFormComponent implements OnInit {

  capsOn = true;
  loginForm: FormGroup;
  errors$: Observable<string[]>;

  constructor(private serivce: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.serivce.getForm();
    this.errors$ = this.serivce.getErrors();
  }

  onSubmit(): void {
    this.serivce.sendLoginRequest();
  }
}
