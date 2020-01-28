import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFailedRepeatComponent } from './last-failed-repeat.component';

describe('LastFailedRepeatComponent', () => {
  let component: LastFailedRepeatComponent;
  let fixture: ComponentFixture<LastFailedRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastFailedRepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastFailedRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
