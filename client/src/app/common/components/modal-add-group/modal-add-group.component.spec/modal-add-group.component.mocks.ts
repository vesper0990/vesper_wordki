import { Component, Input } from '@angular/core';

import { Language } from '@app/common/models/model';

@Component({
    selector: 'app-dropdown-base-b',
    template: ''
})
export class DropdownMockComponent {
    @Input() items: any[];
    @Input() selectedItem: any;
}

@Component({
    selector: 'app-dropdown-item-language',
    template: ''
})
export class DropdownItemLanguageMockComponent {
    @Input() language: Language;
}
