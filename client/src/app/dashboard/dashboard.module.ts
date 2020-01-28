import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NewestWordsComponent } from './components/newest-words/newest-words.component';
import { NextRepeatWordComponent } from './components/next-repeat-word/next-repeat-word.component';
import { LastFailedRepeatComponent } from './components/last-failed-repeat/last-failed-repeat.component';
import { ShareModule } from '../share/share.module';
import { DataProviderBase, DataProvider, DataProviderMock } from './services/data.provider/data.provider';
import { environment } from 'src/environments/environment';
import { LastWordMapper } from './services/last-word.mapper/last-word.mapper';

@NgModule({
  declarations: [
    DashboardComponent,
    NewestWordsComponent,
    NextRepeatWordComponent,
    LastFailedRepeatComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule
  ],
  providers: [
    LastWordMapper,
    { provide: DataProviderBase, useClass: environment.production ? DataProvider : DataProviderMock },
  ]
})
export class DashboardModule { }
