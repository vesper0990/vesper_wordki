import { Component, Input } from '@angular/core';
import { Language } from '../../models/model';

@Component({
  selector: 'app-dropdown-item-language',
  templateUrl: './dropdown-item-language.component.html',
  styleUrls: ['./dropdown-item-language.component.scss']
})
export class DropDownItemLanguageComponent {
  @Input() language: Language;
}
