import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { LoginGuardService } from '../common/services/login-guard/login-guard.service';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
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
export class DashboardRoutingModule { }
