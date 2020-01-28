import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextRepeatWordComponent } from './next-repeat-word.component';

describe('NextRepeatWordComponent', () => {
  let component: NextRepeatWordComponent;
  let fixture: ComponentFixture<NextRepeatWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextRepeatWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextRepeatWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
