import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFailedRepeatComponent } from './last-failed-repeat.component';
import { ProgressSpinnerMockComponent } from 'src/app/test/compontens.mock';

describe('LastFailedRepeatComponent', () => {
  let component: LastFailedRepeatComponent;
  let fixture: ComponentFixture<LastFailedRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastFailedRepeatComponent,
        ProgressSpinnerMockComponent ]
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
