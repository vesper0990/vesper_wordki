import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoperComponent } from './stoper.component';
import { createProvider } from 'src/app/test/helpers.spec';
import { StoperService } from './services/stoper/stoper.service';

describe('StoperComponent', () => {
  let component: StoperComponent;
  let fixture: ComponentFixture<StoperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoperComponent],
      providers: [
        createProvider(StoperService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
