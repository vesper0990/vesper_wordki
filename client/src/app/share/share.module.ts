import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { NubmerToTimePipe } from './pipes/number-to-time.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LanguagesDropDownComponent } from './components/languages-drop-down/languages-drop-down.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressHorizontalComponent } from './components/progress-horizontal/progress-horizontal.component';
import { DateSpanToDaysPipe } from './pipes/datespan-to-days.pipe';

@NgModule({
  declarations: [
    ErrorComponent,
    NubmerToTimePipe,
    DateSpanToDaysPipe,
    LanguagesDropDownComponent,
    ProgressSpinnerComponent,
    ProgressHorizontalComponent
  ],
  exports: [
    NubmerToTimePipe,
    DateSpanToDaysPipe,
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
