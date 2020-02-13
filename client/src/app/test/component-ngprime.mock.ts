import { Component, Input } from '@angular/core';

@Component({
    selector: 'p-dropdown',
    template: ''
})
export class DropDownMockComponent {
    @Input() style: any;
    @Input() class: any;
    @Input() options: any;
}

@Component({
    selector: 'p-card',
    template: ''
})
export class CardMockComponent {
}

@Component({
    selector: 'p-progressBar',
    template: ''
})
export class ProgressBarMockComponent {
}

@Component({
    selector: 'p-progressSpinner',
    template: ''
})
export class ProgressSpinnerMockComponent {
}
