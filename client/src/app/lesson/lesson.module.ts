import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './lesson.component';
import { LessonRoutingModule } from './lesson-routing.module';
import { RepeatComponent } from './pages/repeat/repeat.component';
import { GroupComponent } from './pages/group/group.component';
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

@NgModule({
  declarations: [
    LessonComponent,
    RepeatComponent,
    GroupComponent,
    FiszkaComponent,
    ControlButtonsComponent,
    InsertComponent
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('lessonStore', reducer),
    EffectsModule.forFeature([LessonEffects])
  ],
  providers: [
    Store,
    { provide: WordProviderBase, useClass: environment.production ? WordProvider : WordProviderMock }
  ]
})
export class LessonModule { }
