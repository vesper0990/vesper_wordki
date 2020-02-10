import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { NubmerToTimePipe } from './pipes/number-to-time.pipe';
import { ComboBoxComponent } from './components/combo-box/combo-box.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LanguagesDropDownComponent } from './components/languages-drop-down/languages-drop-down.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ErrorComponent,
    NubmerToTimePipe,
    ComboBoxComponent,
    LanguagesDropDownComponent
  ],
  exports: [
    NubmerToTimePipe,
    ComboBoxComponent,
    LanguagesDropDownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule
  ]
})
export class ShareModule { }
