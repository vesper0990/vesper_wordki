import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupRowComponent } from './components/group-row/group-row.component';

@NgModule({
  declarations: [GroupsComponent, GroupRowComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
