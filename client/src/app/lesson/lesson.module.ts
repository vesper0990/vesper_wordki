import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonRoutingModule } from './lesson-routing.module';
import { FiszkiComponent } from './pages/fiszki/fiszki.component';
import { FiszkaComponent } from './components/fiszka/fiszka.component';
import { ControlButtonsComponent } from './components/control-buttons/control-buttons.component';
import {
  WordProviderBase,
  WordProvider,
  WordProviderMock
} from './services/word.provider/word.provider';
import { environment } from 'src/environments/environment';
import { StoreModule, Store } from '@ngrx/store';
import { reducer, LessonState } from './store/reducer';
import { InsertComponent } from './components/insert/insert.component';
import { EffectsModule } from '@ngrx/effects';
import { LessonEffects } from './store/effects';
import { HttpClientModule } from '@angular/common/http';
import { InsertingComponent } from './pages/inserting/inserting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteParamsHandler } from './services/route-params.handler/route-params.handler';
import { SummaryComponent } from './pages/summary/summary.component';
import { ShareModule } from '../share/share.module';
import { StoperComponent } from './components/stoper/stoper.component';
import { StoperService } from './services/stoper/stoper.service';
import { WordComparerService } from './services/word-comparer/word-comparer.service';
import { UserModule } from '../user/user.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { WordMapper } from './services/word-mapper/word-mapper';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SettingsComponent } from './pages/settings/settings.component';
import { LessonGuardService } from './services/lesson-guard/lesson.guard';
import { SummaryGuardService } from './services/summary-guard/summage-guard';

@NgModule({
  declarations: [
    FiszkiComponent,
    FiszkaComponent,
    ControlButtonsComponent,
    InsertComponent,
    InsertingComponent,
    SummaryComponent,
    StoperComponent,
    SettingsComponent
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
    ButtonModule,
    CheckboxModule,
    StoreModule.forFeature('lessonStore', reducer),
    EffectsModule.forFeature([LessonEffects]),
  ],
  providers: [
    Store,
    { provide: WordProviderBase, useClass: environment.production ? WordProvider : WordProviderMock },
    RouteParamsHandler,
    WordComparerService,
    StoperService,
    WordMapper,
    LessonGuardService,
    SummaryGuardService
  ]
})
export class LessonModule {
}
