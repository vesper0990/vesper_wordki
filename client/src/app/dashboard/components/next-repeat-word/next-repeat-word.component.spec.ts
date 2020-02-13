import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextRepeatWordComponent } from './next-repeat-word.component';
import { ProgressSpinnerMockComponent } from 'src/app/test/compontens.mock';

describe('NextRepeatWordComponent', () => {
  let component: NextRepeatWordComponent;
  let fixture: ComponentFixture<NextRepeatWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextRepeatWordComponent,
        ProgressSpinnerMockComponent ]
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
