import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { LessonRoutingModule } from './lesson-routing.module';
import { FormsModule } from '@angular/forms';
import { LessonSettingsComponent } from './views/lesson-settings/lesson-settings.component';
import { FiszkiComponent } from './views/fiszki/fiszki.component';
import { TypingComponent } from './views/typing/typing.component';
import { LessonResultComponent } from './views/lesson-result/lesson-result.component';
import { CommonModule } from '../common/common.module';
import { environment } from 'src/environments/environment';
import {
  ResultSenderBase,
  ResultSenderMock,
  ResultSender,
  WordSenderBase,
  WordSenderMock,
  WordSender
} from '../common/services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../common/services/token-interceptor/token-interceptor.service';

@NgModule({
  declarations: [
    LessonSettingsComponent,
    FiszkiComponent,
    TypingComponent,
    LessonResultComponent,
  ],
  imports: [
    LessonRoutingModule,
    AngularCommonModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    { provide: ResultSenderBase, useClass: environment.mock ? ResultSenderMock : ResultSender },
    { provide: WordSenderBase, useClass: environment.mock ? WordSenderMock : WordSender },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ]
})
export class LessonModule { }
