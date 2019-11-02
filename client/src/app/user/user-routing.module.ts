import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LoginGuardService } from '../common/services/login-guard/login-guard.service';
import { LogoutGuardService } from '../common/services/logout-guard/logout-guard.service';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LogoutGuardService],
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LogoutGuardService],
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [LoginGuardService],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class UserRoutingModule { }
