import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiszkiComponent } from './fiszki.component';

describe('RepeatComponent', () => {
  let component: FiszkiComponent;
  let fixture: ComponentFixture<FiszkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiszkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiszkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
