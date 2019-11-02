import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, AfterContentInit, ContentChild } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent {

  private selfClick: boolean;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() visible: boolean;

  @Input() header: string;
  @Input() static: boolean;
  @Input() style: any;
  @ContentChild('footer') footer: ElementRef;

  constructor() {
    this.visible = false;
    this.static = false;
  }

  public clickOutside(): void {
    if (!this.static && !this.selfClick) {
      this.closeDialog();
    }
    this.clearState();
  }

  public modalClick(): void {
    this.selfClick = true;
  }

  public closeDialog(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private clearState(): void {
    this.selfClick = false;
  }

}
