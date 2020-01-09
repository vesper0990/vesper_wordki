import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepeatComponent } from './components/repeat/repeat.component';
import { GroupComponent } from './components/group/group.component';

const routes: Routes = [
  {
    path: 'repeat',
    component: RepeatComponent
  },
  {
    path: 'group/:id',
    component: GroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
