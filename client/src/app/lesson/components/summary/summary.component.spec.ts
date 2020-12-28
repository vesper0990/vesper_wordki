import { ComponentFixture, TestBed } from '@angular/core/testing';
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
