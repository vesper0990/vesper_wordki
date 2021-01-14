import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './share/components/error/error.component';
import { LoginGuardService } from './authorization/services/auth-guard/login-guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [LoginGuardService]
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups-list/groups.module').then(m => m.GroupsModule),
    canActivate: [LoginGuardService]
  },
  {
    path: 'creator',
    loadChildren: () => import('./group-creator/group-creator.module').then(m => m.GroupCreatorModule),
    canActivate: [LoginGuardService]
  },
  {
    path: 'details',
    loadChildren: () => import('./group-details/group-details.module').then(m => m.GroupDetailsModule),
    canActivate: [LoginGuardService]
  },
  {
    path: 'lesson',
    loadChildren: () => import('./lesson/lesson.module').then(m => m.LessonModule),
    canActivate: [LoginGuardService]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'error',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
