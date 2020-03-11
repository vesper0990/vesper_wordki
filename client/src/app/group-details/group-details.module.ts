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
import { GroupDetailsEffects } from './store/effects';
import { reducer } from './store/reducre';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WordMapper } from './services/word-mapper/word-mapper';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AddGroupComponent } from './pages/add-group/add-group.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    GroupDetailsComponent,
    WordRowComponent,
    EditWordFormComponent,
    AddGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupsDetailsRoutingModule,
    CheckboxModule,
    InputTextModule,
    ShareModule,
    StoreModule.forFeature('groupDetailsStore', reducer),
    EffectsModule.forFeature([GroupDetailsEffects]),
  ],
  providers: [
    { provide: GroupDetailsProviderBase, useClass: environment.production ? GroupDetailsProvider : GroupDetailsProviderMock },
    GroupDetailsMapper,
    WordMapper
  ]
})
export class GroupDetailsModule { }
