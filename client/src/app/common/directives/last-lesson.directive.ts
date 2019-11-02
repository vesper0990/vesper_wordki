import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appLastLesson]',
})
export class LastLessonDirective implements AfterViewInit {
    @Input() lastLesson: string;
    constructor(private elRef: ElementRef) {
    }
    ngAfterViewInit(): void {
        this.elRef.nativeElement.innerHtml = 'testtest';
    }
}
