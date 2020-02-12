import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { NubmerToTimePipe } from './pipes/number-to-time.pipe';
import { ComboBoxComponent } from './components/combo-box/combo-box.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LanguagesDropDownComponent } from './components/languages-drop-down/languages-drop-down.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressHorizontalComponent } from './components/progress-horizontal/progress-horizontal.component';

@NgModule({
  declarations: [
    ErrorComponent,
    NubmerToTimePipe,
    ComboBoxComponent,
    LanguagesDropDownComponent,
    ProgressSpinnerComponent,
    ProgressHorizontalComponent
  ],
  exports: [
    NubmerToTimePipe,
    ComboBoxComponent,
    LanguagesDropDownComponent,
    ProgressSpinnerComponent,
    ProgressHorizontalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    ProgressSpinnerModule,
    ProgressBarModule
  ]
})
export class ShareModule { }
