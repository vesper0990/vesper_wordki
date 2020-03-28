import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './services/auth-guard/auth-guard';
import { LogoutGuardService } from './services/auth-guard/logout-guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuardService,
    LogoutGuardService
  ]
})
export class AuthorizationModule { }
