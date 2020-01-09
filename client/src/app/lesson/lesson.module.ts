import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './lesson.component';
import { LessonRoutingModule } from './lesson-routing.module';
import { RepeatComponent } from './components/repeat/repeat.component';
import { GroupComponent } from './components/group/group.component';
import { FiszkaComponent } from './components/fiszka/fiszka.component';
import { ControlButtonsComponent } from './components/control-buttons/control-buttons.component';
import {
  WordProviderBase,
  WordProvider,
  WordProviderMock
} from './services/word.provider/word.provider';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    LessonComponent,
    RepeatComponent,
    GroupComponent,
    FiszkaComponent,
    ControlButtonsComponent
  ],
  imports: [
    CommonModule,
    LessonRoutingModule
  ],
  providers: [
    { provide: WordProviderBase, useClass: environment.production ? WordProvider : WordProviderMock }
  ]
})
export class LessonModule { }
