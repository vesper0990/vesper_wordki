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
import { reducer } from './store/reducer';
import { InsertComponent } from './components/insert/insert.component';
import { EffectsModule } from '@ngrx/effects';
import { LessonEffects } from './store/effects';
import { HttpClientModule } from '@angular/common/http';
import { InsertingComponent } from './pages/inserting/inserting.component';
import { FormsModule } from '@angular/forms';
import { RouteParamsHandler } from './services/route-params.handler/route-params.handler';
import { SummaryComponent } from './pages/summary/summary.component';
import { ShareModule } from '../share/share.module';
import { StoperComponent } from './components/stoper/stoper.component';
import { StoperService } from './services/stoper/stoper.service';
import { WordComparerService } from './services/word-comparer/word-comparer.service';
import { UserModule } from '../user/user.module';
import { AuthorizationModule } from '../authorization/authorization.module';

@NgModule({
  declarations: [
    FiszkiComponent,
    FiszkaComponent,
    ControlButtonsComponent,
    InsertComponent,
    InsertingComponent,
    SummaryComponent,
    StoperComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    LessonRoutingModule,
    HttpClientModule,
    ShareModule,
    UserModule,
    AuthorizationModule,
    StoreModule.forFeature('lessonStore', reducer),
    EffectsModule.forFeature([LessonEffects]),
  ],
  providers: [
    Store,
    { provide: WordProviderBase, useClass: environment.production ? WordProvider : WordProviderMock },
    RouteParamsHandler,
    WordComparerService,
    StoperService
  ]
})
export class LessonModule { }
