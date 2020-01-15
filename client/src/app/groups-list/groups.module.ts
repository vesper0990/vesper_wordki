import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { GroupProviderBase, GroupProvider, GroupProviderMock } from './services/group.provider/group.provider';
import { environment } from 'src/environments/environment';
import { GroupMapper } from './services/group.mapper/group.mapper';

@NgModule({
  declarations: [GroupsComponent, GroupRowComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule
  ],
  providers: [
    { provide: GroupProviderBase, useClass: environment.production ? GroupProvider : GroupProviderMock },
    GroupMapper
  ]
})
export class GroupsModule { }