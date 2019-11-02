import { NgModule } from '@angular/core';
import { MockComponent } from './util.mocks';
import {
    DropdownMockComponent,
    DropdownItemLanguageMockComponent
} from './common/components/modal-add-group/modal-add-group.component.spec/modal-add-group.component.mocks';
import { WordFormMockComponent } from './common/components/modal-add-word/modal-add-word.spec/modal-add-word.component.mocks';
import { ModalAddWordMockComponent, WordRowMockComponent } from './database/views/group/group.component.spec/group.component.mocks';
import { InputRowMockComponent } from './common/components/word-form/word-form.component.spec/word-form.component.mock';
@NgModule({
    declarations: [
        MockComponent,
        DropdownMockComponent,
        DropdownItemLanguageMockComponent,
        WordFormMockComponent,
        ModalAddWordMockComponent,
        WordRowMockComponent,
        InputRowMockComponent
    ],
})
export class AppModule { }
