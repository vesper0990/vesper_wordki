import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDetailsComponent } from './group-details.component';
import { GroupsDetailsRoutingModule } from './group-details-routing.module';
import { WordRowComponent } from './components/word-row/word-row.component';
import { GroupDetailsMapper } from './services/group-details.mapper/group-details.mapper';
import {
  GroupDetailsProviderBase,
  GroupDetailsProvider,
  GroupDetailsProviderMock
} from './services/group-details.provider/group-details.provider';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    GroupDetailsComponent,
    WordRowComponent
  ],
  imports: [
    CommonModule,
    GroupsDetailsRoutingModule
  ],
  providers: [
    { provide: GroupDetailsProviderBase, useClass: environment.production ? GroupDetailsProvider : GroupDetailsProviderMock },
    GroupDetailsMapper
  ]
})
export class GroupDetailsModule { }
