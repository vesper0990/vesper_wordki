import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRowComponent } from './input-row.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { setTextByCss } from 'src/app/util.test';

describe('InputRowComponent', () => {
  let component: InputRowComponent;
  let fixture: ComponentFixture<InputRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputRowComponent],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should put label in proper element', () => {
    component.label = 'test';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('label')).nativeElement.innerHTML).toBe('test');
  });

  it('should put value in proper element', () => {
    spyOn(component.valueChange, 'emit').and.callThrough();
    setTextByCss<InputRowComponent>(fixture, 'input', 'test');
    expect(component.value).toBe('test');
    expect(component.valueChange.emit).toHaveBeenCalledWith('test');
  });
});
