import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

export function selectDebugElementById<T>(fixture: ComponentFixture<T>, id: string): DebugElement {
    return fixture.debugElement.query(By.css(`#${id}`));
}

export function selectNativeElementById<T>(fixture: ComponentFixture<T>, id: string): any {
    return selectDebugElementById<T>(fixture, id).nativeElement;
}

export function selectDebugElementByClass<T>(fixture: ComponentFixture<T>, $class: string): DebugElement {
    return fixture.debugElement.query(By.css(`.${$class}`));
}

export function selectNativeElementByClass<T>(fixture: ComponentFixture<T>, $class: string): any {
    return selectDebugElementByClass<T>(fixture, $class).nativeElement;
}

export function selectDebugElement<T>(fixture: ComponentFixture<T>, type: string): DebugElement{
    return fixture.debugElement.query(By.css(type));
}

export function selectNativeElement<T>(fixture: ComponentFixture<T>, type: string): any{
    return selectDebugElement<T>(fixture, type).nativeElement;
}

export function inputValueToInputElementById<T>(fixture: ComponentFixture<T>, id: string, value: string): void{
    let element = selectNativeElementById(fixture, id);
    element.value = value;
    element.dispatchEvent(new Event('input'));
}

export function inputValueToInputElementByClass<T>(fixture: ComponentFixture<T>, $class: string, value: string): void{
    let element = selectNativeElementByClass(fixture, $class);
    element.value = value;
    element.dispatchEvent(new Event('input'));
}

export function clickButton<T>(fixture: ComponentFixture<T>): void{
    selectNativeElement<T>(fixture, 'button').click();
}