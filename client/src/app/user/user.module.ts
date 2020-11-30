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
import { InputTextModule } from 'primeng/inputtext';
import { ShareModule } from '../share/share.module';
import { HttpErrorInterceptor } from '../share/services/http-error.interceptor';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';

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
    ShareModule,
    ReactiveFormsModule,
    UserRoutingModule,
    AuthorizationModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
  ],
  providers: [
    { provide: UserProviderBase, useClass: environment.mockServer ? UserProvider : UserProviderMock },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    MessageService,
    CookieService,
  ]
})
export class UserModule { }
