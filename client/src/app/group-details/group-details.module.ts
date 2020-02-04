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
import { EditWordFormComponent } from './components/edit-word-form/edit-word-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GroupDetailsComponent,
    WordRowComponent,
    EditWordFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupsDetailsRoutingModule
  ],
  providers: [
    { provide: GroupDetailsProviderBase, useClass: environment.production ? GroupDetailsProvider : GroupDetailsProviderMock },
    GroupDetailsMapper
  ]
})
export class GroupDetailsModule { }
