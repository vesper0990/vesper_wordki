import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './share/components/error/error.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups-list/groups.module').then(m => m.GroupsModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./group-details/group-details.module').then(m => m.GroupDetailsModule)
  },
  {
    path: 'lesson',
    loadChildren: () => import('./lesson/lesson.module').then(m => m.LessonModule)
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
