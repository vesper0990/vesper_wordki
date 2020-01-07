import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './share/components/error/error.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'groups',
    loadChildren: './groups-list/groups.module#GroupsModule'
  },
  {
    path: 'details',
    loadChildren: './group-details/group-details.module#GroupDetailsModule'
  },
  {
    path: 'lesson',
    loadChildren: './lesson/lesson.module#LessonModule'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule'
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
