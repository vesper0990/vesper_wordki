import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { DatabaseRoutingModule } from './database-routing.module';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonModule } from '../common/common.module';
import { FormsModule } from '@angular/forms';
import { GroupsComponent } from './views/groups/groups.component';
import { GroupComponent } from './views/group/group.component';
import { AddWordsComponent } from './views/add-words/add-words.component';
import {
  GroupProviderBase,
  GroupProviderMock,
  GroupProvider,
  GroupSenderBase,
  GroupSenderMock,
  GroupSender,
  WordProviderBase,
  WordProvider
} from '../common/services';
import { ResultRowComponent } from './components/result-row/result-row.component';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { WordRowComponent } from './components/word-row/word-row.component';
import { GroupsStatsComponent } from './components/groups-stats/groups-stats.component';
import { WordsStatsComponent } from './components/words-stats/words-stats.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../common/services/token-interceptor/token-interceptor.service';
import { WordProviderMock } from '../common/services/data/word/provider-mock.service';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupComponent,
    AddWordsComponent,
    GroupRowComponent,
    WordRowComponent,
    ResultRowComponent,
    GroupsStatsComponent,
    WordsStatsComponent
  ],
  imports: [
    FormsModule,
    DatabaseRoutingModule,
    AngularCommonModule,
    CommonModule,
    RouterModule,
  ],
  providers: [
    { provide: GroupProviderBase, useClass: environment.mock ? GroupProviderMock : GroupProvider },
    { provide: GroupSenderBase, useClass: environment.mock ? GroupSenderMock : GroupSender },
    { provide: WordProviderBase, useClass: environment.mock ? WordProviderMock : WordProvider },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ]
})
export class DatabaseModule { }
