import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupCreatorComponent } from './group-creator.component';

const routes: Routes = [
  {
    path: '',
    component: GroupCreatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsCreatorRoutingModule { }
