import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { GroupsListHttpServiceBase, GroupsListHttpService, GroupsListHttpMockService } from './services/groups-list-http/groups-list-http.service';
import { environment } from 'src/environments/environment';
import { ShareModule } from '../share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GroupListEffects } from './store/effects';
import { reducer } from './store/reducer';
import { GroupsListService } from './services/groups-list/groups-list.service';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupRowComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    ShareModule,
    InputTextModule,
    CardModule,
    ProgressSpinnerModule,
    StoreModule.forFeature('groupListStore', reducer),
    EffectsModule.forFeature([GroupListEffects]),
  ],
  providers: [
    Store,
    { provide: GroupsListHttpServiceBase, useClass: environment.mockServer ? GroupsListHttpService : GroupsListHttpMockService },
    GroupsListService
  ]
})
export class GroupsModule { }
