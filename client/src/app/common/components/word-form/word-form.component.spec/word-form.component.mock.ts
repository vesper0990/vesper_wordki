import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-input-row',
    template: ''
})
export class InputRowMockComponent {
    @Input() label: string;
    @Input() value: string;
}
