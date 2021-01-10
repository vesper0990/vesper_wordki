import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createProvider } from 'src/app/test/helpers.spec';
import { selectNativeElement } from 'src/app/test/utils.spec';
import { SummaryService } from './services/summary/summary.service';
import { SummaryComponent } from './summary.component';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;
  let service: jasmine.SpyObj<SummaryService>;

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
    service = TestBed.inject(SummaryService) as jasmine.SpyObj<SummaryService>;
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should finish after click', () => {
    const button = selectNativeElement(fixture, 'button');
    button.click();

    expect(service.finish).toHaveBeenCalledTimes(1);
  });
});
