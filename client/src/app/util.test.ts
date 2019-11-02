import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

export function setTextByCss<T>(fixture: ComponentFixture<T>, css: string, text: string): any {
    const input = fixture.debugElement.query(By.css(css)).nativeElement;
    input.value = text;
    input.dispatchEvent(new Event('input'));
    return input;
}

export function getElementByTagAndInnerText<T>(fixture: ComponentFixture<T>, tag: string, text: string): DebugElement {
    let result: DebugElement;
    fixture.debugElement.queryAll(By.css(tag)).forEach((item: DebugElement) => {
        if (item.nativeElement.textContent.trim() === text) {
            result = item;
            return;
        }
    });
    return result;
}
