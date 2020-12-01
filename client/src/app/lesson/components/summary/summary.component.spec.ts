import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { Button } from 'primeng/button';
import { createProvider } from 'src/app/test/helpers.spec';
import { SummaryService } from './services/summary/summary.service';
import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SummaryComponent,
        MockComponent(Button)
      ],
      providers: [
        createProvider(SummaryService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
