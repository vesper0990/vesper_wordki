import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownComponent } from '../dropdown-base.component';
import { Renderer2 } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DropDownComponent', () => {
  let component: DropDownComponent;
  let fixture: ComponentFixture<DropDownComponent>;
  const items = ['1', '2', '3'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropDownComponent,
      ],
      providers: [
        Renderer2
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownComponent);
    component = fixture.componentInstance;
    component.items = items;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper number of items', () => {
    const elementCount = fixture.debugElement.queryAll(By.css('.o-dropdown-item')).length;
    expect(elementCount).toBe(items.length);
  });

  it('should open after click in button', () => {
    component.isOpen = false;

    fixture.debugElement.query(By.css('.o-dropdown-button')).nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpen).toBeTruthy();
  });

  it('should close after choose item', () => {
    component.isOpen = true;

    fixture.debugElement.queryAll(By.css('.o-dropdown-item'))[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpen).toBeFalsy();
  });

  it('should set selectedItem after choose item', () => {
    component.isOpen = true;

    fixture.debugElement.queryAll(By.css('.o-dropdown-item'))[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedItem).toBe(items[0]);
  });

  it('should close after click wherever', () => {
    fixture.debugElement.query(By.css('.o-dropdown-button')).nativeElement.click();
    fixture.detectChanges();

    document.dispatchEvent(new MouseEvent('click'));

    expect(component.isOpen).toBeFalsy();
  });

  it('should close after double click in button', () => {
    component.isOpen = false;
    const buttonElement = fixture.debugElement.query(By.css('.o-dropdown-button')).nativeElement;

    buttonElement.click();
    buttonElement.click();

    expect(component.isOpen).toBeFalsy();
  });

  it('should emit isOpen true during openning', () => {
    spyOn(component.isOpenChange, 'emit').and.callThrough();

    fixture.debugElement.query(By.css('.o-dropdown-button')).nativeElement.click();

    expect(component.isOpenChange.emit).toHaveBeenCalledWith(true);
  });

  it('should emit isOpen false during closing', () => {
    spyOn(component.isOpenChange, 'emit').and.callThrough();
    component.isOpen = true;

    fixture.debugElement.query(By.css('.o-dropdown-button')).nativeElement.click();

    expect(component.isOpenChange.emit).toHaveBeenCalledWith(false);
  });

  it('should emit selectedItem with item during choosing', () => {
    spyOn(component.selectedItemChange, 'emit').and.callThrough();
    component.isOpen = true;

    fixture.debugElement.queryAll(By.css('.o-dropdown-item'))[0].nativeElement.click();

    expect(component.selectedItemChange.emit).toHaveBeenCalledWith(items[0]);

  });
});
