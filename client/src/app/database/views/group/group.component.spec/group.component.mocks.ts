import { Input, Component } from '@angular/core';

@Component({
    selector: 'modal-add-word',
    template: ''
})
export class ModalAddWordMockComponent {
    @Input() word: any;
    @Input() visible: any;
}

@Component({
    selector: 'app-word-row',
    template: ''
})
export class WordRowMockComponent {
    @Input() word: any;
}
