import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-navigation-bar',
    template: '',
})
export class NavigationBarComponentMock {
    @Input() isLogin: boolean;
}
