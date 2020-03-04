import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './share/components/error/error.component';
import { AuthGuardService } from './authorization/services/auth-guard/auth-guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups-list/groups.module').then(m => m.GroupsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'details',
    loadChildren: () => import('./group-details/group-details.module').then(m => m.GroupDetailsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'lesson',
    loadChildren: () => import('./lesson/lesson.module').then(m => m.LessonModule),
    canActivate: [AuthGuardService]
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
