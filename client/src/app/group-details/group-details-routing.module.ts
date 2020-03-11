import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupDetailsComponent } from './group-details.component';
import { AddGroupComponent } from './pages/add-group/add-group.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddGroupComponent
  },
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
