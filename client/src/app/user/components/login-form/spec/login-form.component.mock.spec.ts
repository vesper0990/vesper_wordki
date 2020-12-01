import { FormControl, FormGroup, Validators } from '@angular/forms';

export function getForm(): FormGroup {
    return new FormGroup({
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });
}
