import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSpinnerComponent } from './progress-spinner.component';
import { MockComponent } from 'ng-mocks';
import { ProgressSpinner } from 'primeng/progressspinner';

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressSpinnerComponent,
      MockComponent(ProgressSpinner) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
