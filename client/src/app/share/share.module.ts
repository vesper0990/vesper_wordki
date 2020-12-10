import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { NubmerToTimePipe } from './pipes/number-to-time.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LanguagesDropDownComponent } from './components/languages-drop-down/languages-drop-down.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressHorizontalComponent } from './components/progress-horizontal/progress-horizontal.component';
import { DateSpanToDaysPipe } from './pipes/datespan-to-days.pipe';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.dirctive';
import { EditWordDialogComponent } from './components/edit-word-dialog/edit-word-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { EditGroupDialogComponent } from './components/edit-group-dialog/edit-group-dialog.component';
import { LabelValueComponent } from './components/label-value/label-value.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    ErrorComponent,
    NubmerToTimePipe,
    DateSpanToDaysPipe,
    ClickStopPropagationDirective,
    LanguagesDropDownComponent,
    ProgressSpinnerComponent,
    ProgressHorizontalComponent,
    EditWordDialogComponent,
    EditGroupDialogComponent,
    LabelValueComponent,
    CardComponent,
    ButtonComponent,
    InfoCardComponent,
    PaginatorComponent,
  ],
  exports: [
    NubmerToTimePipe,
    DateSpanToDaysPipe,
    ClickStopPropagationDirective,
    LanguagesDropDownComponent,
    ProgressSpinnerComponent,
    ProgressHorizontalComponent,
    EditWordDialogComponent,
    EditGroupDialogComponent,
    LabelValueComponent,
    CardComponent,
    ButtonComponent,
    InfoCardComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    DialogModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule
  ]
})
export class ShareModule { }
