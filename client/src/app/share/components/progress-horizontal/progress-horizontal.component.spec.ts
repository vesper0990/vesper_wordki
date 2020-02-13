import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressHorizontalComponent } from './progress-horizontal.component';
import { MockComponent } from 'ng-mocks';
import { ProgressBar } from 'primeng/progressbar';

describe('ProgressHorizontalComponent', () => {
  let component: ProgressHorizontalComponent;
  let fixture: ComponentFixture<ProgressHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressHorizontalComponent ,
      MockComponent(ProgressBar)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
