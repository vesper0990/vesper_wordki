import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBaseComponent } from './modal-base.component';
import { By } from '@angular/platform-browser';

describe('ModalBaseComponent', () => {
  let component: ModalBaseComponent;
  let fixture: ComponentFixture<ModalBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalBaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close after click on close button', () => {
    component.visible = true;
    fixture.debugElement.query(By.css('#closeButton')).nativeElement.click();
    expect(component.visible).toBeFalsy();
  });

  it('should emit visible change during closing', () => {
    component.visible = true;
    spyOn(component.visibleChange, 'emit').and.callThrough();
    fixture.debugElement.query(By.css('#closeButton')).nativeElement.click();
    expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
  });

  it('should close when click outside', () => {
    component.visible = true;
    fixture.debugElement.query(By.css('.o-modal-main')).nativeElement.click();
    expect(component.visible).toBeFalsy();
  });

  it('should be static', () => {
    component.visible = true;
    component.static = true;
    fixture.debugElement.query(By.css('.o-modal-main')).nativeElement.click();
    expect(component.visible).toBeTruthy();
  });

});
