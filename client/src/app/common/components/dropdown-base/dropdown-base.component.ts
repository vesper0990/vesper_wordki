import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ContentChild,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'dropdown-base',
  templateUrl: './dropdown-base.component.html',
  styleUrls: ['./dropdown-base.component.scss']
})
export class DropDownComponent implements OnInit {

  private documentClickListener: any;
  private selfClick: boolean;

  @Input() selectedItem: any;
  @Output() selectedItemChange = new EventEmitter<any>();

  @Input() isOpen: boolean;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() items: any[];
  @ContentChild('itemTemplate') itemTemplateRef: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() { }

  selectItem(selectedItem: any): void {
    this.selectedItem = selectedItem;
    this.selectedItemChange.emit(this.selectedItem);
    this.close();
    this.unbindDocumentClickListener();
  }

  buttonClick(): void {
    if (!this.isOpen) {
      this.selfClick = true;
      this.open();
      this.bindDocumentClickListener();
    } else {
      this.close();
      this.unbindDocumentClickListener();
    }
  }

  open(): void {
    this.isOpen = true;
    this.isOpenChange.emit(true);
  }

  close(): void {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  private bindDocumentClickListener(): void {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', () => {
        if (this.selfClick) {
          this.clearState();
          return;
        }
        this.close();
        this.unbindDocumentClickListener();
      });
    }
  }

  private unbindDocumentClickListener(): void {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
    this.clearState();
  }

  private clearState(): void {
    this.selfClick = false;
  }

}

