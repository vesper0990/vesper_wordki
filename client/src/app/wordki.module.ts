import { NgModule } from '@angular/core';
import { WordkiComponent } from './wordki.component';
import { WordkiRoutingModule } from './wordki-routing.module';
import { CommonModule } from './common/common.module';

@NgModule({
    declarations: [
        WordkiComponent,
    ],
    imports: [
        WordkiRoutingModule,
        CommonModule,
    ],
    bootstrap: [WordkiComponent]
})
export class WordkiModule { }
