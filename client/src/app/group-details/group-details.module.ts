import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDetailsComponent } from './group-details.component';
import { GroupsDetailsRoutingModule } from './group-details-routing.module';
import { WordRowComponent } from './components/word-row/word-row.component';
import {
  GroupDetailsHttp
} from './services/group-details-http/group-details-http.service';
import { GroupDetailsHttpMock } from './services/group-details-http/group-details-http.service.mock';
import { GroupDetailsHttpBase } from './services/group-details-http/group-details-http.service.base';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupDetailsEffects } from './store/effects';
import { reducer } from './store/reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShareModule } from '../share/share.module';
import { GroupDescriptionComponent } from './components/group-description/group-description.component';
import { CardsListService } from './services/cards-list/cards-list.service';

@NgModule({
  declarations: [
    GroupDetailsComponent,
    WordRowComponent,
    GroupDescriptionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupsDetailsRoutingModule,
    ShareModule,
    StoreModule.forFeature('groupDetailsStore', reducer),
    EffectsModule.forFeature([GroupDetailsEffects]),
  ],
  providers: [
    { provide: GroupDetailsHttpBase, useClass: environment.mockServer ? GroupDetailsHttpMock : GroupDetailsHttp },
    CardsListService
  ]
})
export class GroupDetailsModule { }
