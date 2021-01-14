import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupDetailsComponent } from './group-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: GroupDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsDetailsRoutingModule { }
