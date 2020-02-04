import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { NubmerToTimePipe } from './pipes/number-to-time.pipe';

@NgModule({
  declarations: [
    ErrorComponent,
    NubmerToTimePipe
  ],
  exports: [
    NubmerToTimePipe
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule { }
