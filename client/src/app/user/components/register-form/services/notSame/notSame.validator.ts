import { AbstractControl, ValidatorFn } from '@angular/forms';


export function notSameValidator(comparableControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any; } | null => {
        const parent = control.parent;
        if (parent === undefined || parent === null) {
            return null;
        }
        const comparableControl = control.parent.get(comparableControlName);
        if (comparableControl === undefined || comparableControl === null) {
            return null;
        }
        const isSame = comparableControl.value === control.value;
        return isSame ? null : { 'notSame': { value: control.value } };
    };
}
