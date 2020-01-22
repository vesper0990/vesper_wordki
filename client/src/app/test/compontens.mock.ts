import { Component, Input } from '@angular/core';

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
