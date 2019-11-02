import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CommonModule } from '../common/common.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProviderBase } from './services/provider-base.service';
import { environment } from 'src/environments/environment';
import { UserProviderMock } from './services/provider-mock.service';
import { ProfileComponent } from './views/profile/profile.component';
import { RegisterCompleteComponent } from './views/register-complete/register-complete.component';
import { UserProvider } from './services/provider-api.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RegisterCompleteComponent,
  ],
  imports: [
    UserRoutingModule,
    AngularCommonModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: UserProviderBase, useClass: environment.mock ? UserProviderMock : UserProvider }
  ]
})
export class UserModule { }
