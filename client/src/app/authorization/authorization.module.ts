import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGuardService } from './services/auth-guard/login-guard';
import { LogoutGuardService } from './services/auth-guard/logout-guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LoginGuardService,
    LogoutGuardService
  ]
})
export class AuthorizationModule { }
