import { FormGroup, FormControl } from '@angular/forms';
import { notSameValidator } from './notSame.validator';

describe('notSameValidator', () => {

    let testForm: FormGroup;

    beforeEach(() => {
        testForm = new FormGroup({
            control1: new FormControl(''),
            control2: new FormControl(''),
        });
    });

    it(`should validate properly`, () => {
        testForm.patchValue({ control1: 'test', control2: 'test' });
        const validatorFn = notSameValidator('control2');
        const result = validatorFn(testForm.get('control1'));
        expect(result).toBeNull();
    });

    it(`should validate properly`, () => {
        testForm.patchValue({ control1: 'test', control2: 'test2' });
        const validatorFn = notSameValidator('control2');
        const result = validatorFn(testForm.get('control1'));
        expect(result).toBeTruthy();
    });

    it(`shoud retunr null if reference not exist`, () => {
        testForm.patchValue({ control1: 'test', control2: 'test' });
        const validatorFn = notSameValidator('control3');
        const result = validatorFn(testForm.get('control1'));
        expect(result).toBeNull();
    });

    it('should return null if parent is null', () => {
        const validatorFn = notSameValidator('control2');
        const result = validatorFn(new FormControl(''));
        expect(result).toBeNull();
    });

});
