import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-row',
  templateUrl: './input-row.component.html',
  styleUrls: ['./input-row.component.scss']
})
export class InputRowComponent {

  @Input() label: string;

  private _value: string;
  @Input() set value(value: string) {
    this._value = value;
    this.valueChange.emit(this._value);
  }
  get value(): string {
    return this._value;
  }
  @Output() valueChange = new EventEmitter<string>();
}
