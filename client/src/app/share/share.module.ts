import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { NubmerToTimePipe } from './pipes/number-to-time.pipe';
import { ComboBoxComponent } from './components/combo-box/combo-box.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ErrorComponent,
    NubmerToTimePipe,
    ComboBoxComponent
  ],
  exports: [
    NubmerToTimePipe,
    ComboBoxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ShareModule { }
