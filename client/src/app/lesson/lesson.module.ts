import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonComponent } from './lesson.component';
import { LessonRoutingModule } from './lesson-routing.module';

@NgModule({
  declarations: [LessonComponent],
  imports: [
    CommonModule,
    LessonRoutingModule
  ]
})
export class LessonModule { }
