import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownBaseBComponent } from './dropdown-base-b.component';
import { By } from '@angular/platform-browser';

describe('DropdownBaseBComponent', () => {
  let component: DropdownBaseBComponent;
  let fixture: ComponentFixture<DropdownBaseBComponent>;
  const items = ['1', '2', '3'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownBaseBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownBaseBComponent);
    component = fixture.componentInstance;
    component.items = items;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper number of items', () => {
    const elementCount = fixture.debugElement.queryAll(By.css('.dropdown-item')).length;
    expect(elementCount).toBe(items.length);
  });

  it('should set selectedItem after choose item', () => {
    fixture.debugElement.queryAll(By.css('.dropdown-item'))[0].nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedItem).toBe(items[0]);
  });

  it('should emit selectedItem with item during choosing', () => {
    spyOn(component.selectedItemChange, 'emit').and.callThrough();

    fixture.debugElement.queryAll(By.css('.dropdown-item'))[0].nativeElement.click();

    expect(component.selectedItemChange.emit).toHaveBeenCalledWith(items[0]);

  });
});
