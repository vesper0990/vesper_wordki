import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboBoxComponent),
      multi: true
    }
  ]
})
export class ComboBoxComponent implements OnInit, ControlValueAccessor {

  private _value: string;
  private onChange: (_: string) => void;
  private onTouched: any = () => { };

  @Input()
  set value(v: string) {
    this._value = v;
    if (this.onChange) {
      this.onChange(v);
    }
  }

  get value() {
    return this._value;
  }

  constructor() { }

  ngOnInit() {
    this.value = 'default';
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState', isDisabled);
  }

}
