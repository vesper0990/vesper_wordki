import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-navigation-bar',
    template: '',
})
export class NavigationBarMockComponent {
    @Input() isLogin: boolean;
}

@Component({
    selector: 'app-word-row',
    template: ''
})
export class WordRowMockComponent {
    @Input() word: any;
}

@Component({
    selector: 'app-group-row',
    template: ''
})
export class GroupRowMockComponent {
    @Input() group: any;
}

@Component({
    selector: 'app-insert',
    template: ''
})
export class InsertMockComponent {
}

@Component({
    selector: 'app-fiszka',
    template: ''
})
export class FiszkaMockComponent {
}

@Component({
    selector: 'app-control-buttons',
    template: ''
})
export class ControlButtonsMockComponent {
}


@Component({
    selector: 'app-next-repeat-word',
    template: ''
})
export class NextRepeatWordMockComponent {
}

@Component({
    selector: 'app-progress-spinner',
    template: ''
})
export class ProgressSpinnerMockComponent {
}

@Component({
    selector: 'app-newest-words',
    template: ''
})
export class NewestWordsMockComponent {
}

@Component({
    selector: 'app-edit-group-form',
    template: ''
})
export class EditGroupFromMockComponent {
    @Input() group: any;
}

@Component({
    selector: 'app-progress-horizontal',
    template: ''
})
export class ProgressHorizontalMockComponent {
}

@Component({
    selector: 'app-languages-drop-down',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LanguagesDropDownMockComponent),
            multi: true
        }
    ]
})
export class LanguagesDropDownMockComponent implements ControlValueAccessor {
    writeValue(obj: any): void {
    }
    registerOnChange(fn: any): void {
    }
    registerOnTouched(fn: any): void {
    }
    setDisabledState?(isDisabled: boolean): void {
    }
}
