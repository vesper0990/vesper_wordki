import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonRoutingModule } from './lesson-routing.module';
import { FiszkaComponent } from './components/fiszka/fiszka.component';
import {
  LessonHttpService
} from './services/lesson-http/lesson-http.service';
import { LessonHttpBaseService } from './services/lesson-http/lesson-http.service.base';
import { LessonHttpMockService } from './services/lesson-http/lesson-http.service.mock';
import { environment } from 'src/environments/environment';
import { StoreModule, Store } from '@ngrx/store';
import { reducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { LessonEffects } from './store/effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { StoperComponent } from './components/stoper/stoper.component';
import { WordComparerService } from './services/word-comparer/word-comparer.service';
import { UserModule } from '../user/user.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { CheckboxModule } from 'primeng/checkbox';
import { SummaryGuardService } from './services/summary-guard/summage-guard';
import { SummaryComponent } from './components/summary/summary.component';
import { FiszkaSideComponent } from './components/fiszka-side/fiszka-side.component';
import { FiszkaService } from './components/fiszka/services/fiszka/fiszka.service';
import { SummaryService } from './components/summary/services/summary/summary.service';
import { InsertService } from './components/insert/service/insert/insert.service';
import { InsertComponent } from './components/insert/insert.component';
import { TimerService } from './services/timer/timer.service';
import { StoperService } from './components/stoper/services/stoper/stoper.service';
import { ResultsComponent } from './components/results/results.component';
import { ResultsService } from './components/results/services/results/results.service';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsService } from './components/settings/services/settings/settings.service';
import { ControllerComponent } from './components/controller/controller.component';

@NgModule({
  declarations: [
    FiszkaComponent,
    InsertComponent,
    StoperComponent,
    SummaryComponent,
    FiszkaSideComponent,
    ResultsComponent,
    SettingsComponent,
    ControllerComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LessonRoutingModule,
    HttpClientModule,
    ShareModule,
    UserModule,
    AuthorizationModule,
    CheckboxModule,
    StoreModule.forFeature('lessonState', reducer),
    EffectsModule.forFeature([LessonEffects]),
  ],
  providers: [
    Store,
    { provide: LessonHttpBaseService, useClass: environment.mockServer ? LessonHttpMockService : LessonHttpService },
    WordComparerService,
    SummaryGuardService,
    FiszkaService,
    SummaryService,
    InsertService,
    TimerService,
    StoperService,
    ResultsService,
    SettingsService
  ]
})
export class LessonModule {
}
