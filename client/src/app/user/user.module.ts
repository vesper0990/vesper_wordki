import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from '../authorization/services/token.interceptor/token-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { UserProvider, UserProviderBase, UserProviderMock } from './services/user.provider/user.provider';
import { environment } from 'src/environments/environment';
import { UserRoutingModule } from './user-routing.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { RegisterComponent } from './pages/register/register.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoginComponent } from './pages/login/login.component';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../authorization/services/user.service/user.service';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    LogoutComponent,
    RegisterComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    AuthorizationModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [
    { provide: UserProviderBase, useClass: environment.production ? UserProvider : UserProviderMock },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    CookieService,
  ]
})
export class UserModule { }
