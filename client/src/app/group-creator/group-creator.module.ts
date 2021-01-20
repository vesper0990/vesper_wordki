import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCreatorComponent } from './group-creator.component';
import { GroupParserService } from './services/group-parser/group-parser.service';
import { GroupsCreatorRoutingModule } from './group-creator-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ShareModule } from '../share/share.module';
import { RowElementComponent } from './components/row-element/row-element.component';
import { StoreModule } from '@ngrx/store';
import { groupCreatorReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { GroupCreatorEffects } from './store/effects';
import { RowSelectorComponent } from './components/row-selector/row-selector.component';
import { ParsedCardComponent } from './components/parsed-card/parsed-card.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { GroupCreatorHttpServiceBase } from './services/group-creator-http/group-creator-http.service.base';
import { environment } from 'src/environments/environment';
import { GroupCreatorHttpServiceMock } from './services/group-creator-http/group-creator-http.service.mock';
import { GroupCreatorHttpService } from './services/group-creator-http/group-creator-http.service';

@NgModule({
  declarations: [
    GroupCreatorComponent,
    RowElementComponent,
    RowSelectorComponent,
    ParsedCardComponent,
    GroupDetailsComponent
  ],
  imports: [
    CommonModule,
    GroupsCreatorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ShareModule,
    StoreModule.forFeature('groupCreatorState', groupCreatorReducer),
    EffectsModule.forFeature([GroupCreatorEffects]),
  ],
  providers: [
    GroupParserService,
    { provide: GroupCreatorHttpServiceBase, useClass: environment.mockServer ? GroupCreatorHttpServiceMock : GroupCreatorHttpService }
  ]
})
export class GroupCreatorModule { }
