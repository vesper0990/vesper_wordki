import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProviderBase } from '../../services/user.provider/user.provider';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { Router } from '@angular/router';
import { LoginContract } from '../../services/user.provider/login.contract';
import { AuthenticateContract } from '../../services/user.provider/authenticate.contract';
import { MessageService, Message } from 'primeng/api';
import { ApiException, ErrorCodes } from 'src/app/share/models/error-codes.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss', '../../styles-users.scss'],
  providers: [MessageService]
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
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginForm.disable();
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
      this.loginForm.enable();
      this.userService.refresh(result.authenticate);
      this.router.navigate(['/dashboard']);
    }, (error: any) => this.handleError(error));
  }

  private handleError(error: ApiException): void {
    this.loginForm.enable();
    switch (error.code) {
      case ErrorCodes.EmptyParameter:
      case ErrorCodes.EmptyRequest:
        this.messageService
          .add(<Message>{
            closable: true,
            severity: 'error',
            summary: 'Logowanie nie powiodło się',
            detail: 'Błąd aplikacji'
          });
        break;
      case ErrorCodes.UserNotFound:
        this.messageService
          .add(<Message>{
            closable: true,
            severity: 'error',
            summary: 'Logowanie nie powiodło się',
            detail: 'Nie znaleziono użytkownika'
          });
        break;
      default:
        this.router.navigate(['/error']);
        break;
    }
  }

}
