import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'groups',
    loadChildren: './groups/groups.module#GroupsModule'
  },
  {
    path: 'words',
    loadChildren: './words/words.module#WordsModule'
  },
  {
    path: 'lesson',
    loadChildren: './lesson/lesson.module#LessonModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
