import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LastLessonDirective } from './directives/last-lesson.directive';
import { NextLessonPipe } from './pipes/next-lesson.pipe';
import { WordSenderBase, WordSenderMock, WordSender } from './services';
import { ModalBaseComponent } from './components/modal-base/modal-base.component';
import { DropDownComponent } from './components/dropdown-base/dropdown-base.component';
import { ModalAddGroupComponent } from './components/modal-add-group/modal-add-group.component';
import { DropDownItemLanguageComponent } from './components/dropdown-item-language/dropdown-item-language.component';
import { DropdownBaseBComponent } from './components/dropdown-base-b/dropdown-base-b.component';
import { WordFormComponent } from './components/word-form/word-form.component';
import { ModalAddWordComponent } from './components/modal-add-word/modal-add-word.component';
import { InputRowComponent } from './components/input-row/input-row.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { HowLongAgoPipe } from './pipes/how-long-ago/how-long-ago.pipe';

@NgModule({
  declarations: [
    MenuComponent,
    DropDownItemLanguageComponent,
    LastLessonDirective,
    NextLessonPipe,
    ModalBaseComponent,
    DropDownComponent,
    DropdownBaseBComponent,
    ModalAddGroupComponent,
    WordFormComponent,
    ModalAddWordComponent,
    InputRowComponent,
    GroupFormComponent,
    HowLongAgoPipe,
  ],
  exports: [
    MenuComponent,
    DropDownItemLanguageComponent,
    LastLessonDirective,
    NextLessonPipe,
    ModalBaseComponent,
    DropDownComponent,
    DropdownBaseBComponent,
    ModalAddGroupComponent,
    WordFormComponent,
    ModalAddWordComponent,
    InputRowComponent,
    GroupFormComponent,
    HowLongAgoPipe
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    AngularCommonModule,
    RouterModule,
    RouterModule,
  ],
  providers: [
    CookieService,
    HttpClient,
    { provide: WordSenderBase, useClass: environment.mock ? WordSenderMock : WordSender }
  ]
})
export class CommonModule { }
