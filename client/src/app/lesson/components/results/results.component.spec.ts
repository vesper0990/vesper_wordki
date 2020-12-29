import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createProvider } from 'src/app/test/helpers.spec';
import { ResultsComponent } from './results.component';
import { ResultsService } from './services/results/results.service';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      providers: [
        createProvider(ResultsService)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
