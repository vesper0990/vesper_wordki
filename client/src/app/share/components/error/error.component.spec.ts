import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createProvider } from 'src/app/test/helpers.spec';
import { ErrorComponent } from './error.component';
import { ErrorService } from './services/error/error-service';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [
        createProvider(ErrorService)
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
