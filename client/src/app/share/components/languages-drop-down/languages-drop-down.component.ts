import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { LanguageType } from '../../models/language-type.mode';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'app-languages-drop-down',
  templateUrl: './languages-drop-down.component.html',
  styleUrls: ['./languages-drop-down.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguagesDropDownComponent),
      multi: true
    }
  ]
})
export class LanguagesDropDownComponent implements OnInit, ControlValueAccessor {

  @Input() style: any;
  @Input() styleClass: any;
  @Input() items: LanguageType[] = LanguageType.getAll();

  languages: SelectItem[] = [];

  private _value: LanguageType;

  private onChange: (_: LanguageType) => void;
  private onTouched: any = () => { };

  @Input() set value(val: LanguageType) {
    this._value = val;
    if (this.onChange) {
      this.onChange(val);
    }
  }

  get value() {
    return this._value;
  }


  constructor() { }

  ngOnInit() {
    this.items.forEach((item: LanguageType) => {
      this.languages.push({
        label: item.label,
        value: item
      });
    });

  }

  writeValue(obj: LanguageType): void {
    this.value = obj;
  }

  registerOnChange(fn: (_: LanguageType) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState', isDisabled);
  }

}
