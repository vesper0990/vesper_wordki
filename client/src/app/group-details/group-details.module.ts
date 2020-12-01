import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDetailsComponent } from './group-details.component';
import { GroupsDetailsRoutingModule } from './group-details-routing.module';
import { WordRowComponent } from './components/word-row/word-row.component';
import { GroupDetailsMapper } from './services/group-details.mapper/group-details.mapper';
import {
  GroupDetailsHttpBase,
  GroupDetailsHttp,
  GroupDetailsHttpMock
} from './services/group-details-http/group-details-http.service';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupDetailsEffects } from './store/effects';
import { reducer } from './store/reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WordMapper } from './services/word-mapper/word-mapper';
import { InputTextModule } from 'primeng/inputtext';
import { AddGroupComponent } from './pages/add-group/add-group.component';
import { ShareModule } from '../share/share.module';
import { GroupDescriptionComponent } from './components/group-description/group-description.component';
import { CardsListService } from './services/words-list/words-list.service';

@NgModule({
  declarations: [
    GroupDetailsComponent,
    WordRowComponent,
    AddGroupComponent,
    GroupDescriptionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupsDetailsRoutingModule,
    InputTextModule,
    ShareModule,
    StoreModule.forFeature('groupDetailsStore', reducer),
    EffectsModule.forFeature([GroupDetailsEffects]),
  ],
  providers: [
    { provide: GroupDetailsHttpBase, useClass: environment.mockServer ? GroupDetailsHttp : GroupDetailsHttpMock },
    GroupDetailsMapper,
    WordMapper,
    CardsListService
  ]
})
export class GroupDetailsModule { }
