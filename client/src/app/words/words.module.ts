import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsComponent } from './words.component';
import { WordsRoutingModule } from './words-routing.module';

@NgModule({
  declarations: [WordsComponent],
  imports: [
    CommonModule,
    WordsRoutingModule
  ]
})
export class WordsModule { }
