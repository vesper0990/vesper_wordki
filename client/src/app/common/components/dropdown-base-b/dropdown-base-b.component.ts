import { Component, Input, Output, EventEmitter, ContentChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-dropdown-base-b',
  templateUrl: './dropdown-base-b.component.html',
  styleUrls: ['./dropdown-base-b.component.scss']
})
export class DropdownBaseBComponent {

  @Input() selectedItem: any;
  @Output() selectedItemChange = new EventEmitter<any>();

  @Input() items: any[];
  @ContentChild('itemTemplate') itemTemplateRef: ElementRef;

  selectItem(selectedItem: any): void {
    this.selectedItem = selectedItem;
    this.selectedItemChange.emit(this.selectedItem);
  }

}
