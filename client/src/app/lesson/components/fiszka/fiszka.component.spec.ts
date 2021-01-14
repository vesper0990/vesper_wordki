import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiszkaComponent } from './fiszka.component';
import { createProvider } from 'src/app/test/helpers.spec';
import { FiszkaService } from './services/fiszka/fiszka.service';

describe('FiszkaComponent', () => {
  let component: FiszkaComponent;
  let fixture: ComponentFixture<FiszkaComponent>;
  let service: FiszkaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiszkaComponent,
      ],
      providers: [
        createProvider(FiszkaService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(FiszkaService);
    fixture = TestBed.createComponent(FiszkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check on enter', () => {
    component.keyEvent({ key: 'Enter' } as KeyboardEvent);
    expect(service.check).toHaveBeenCalledTimes(1);
  });

  it('should correct on arrow right', () => {
    component.keyEvent({ key: 'ArrowRight' } as KeyboardEvent);
    expect(service.correct).toHaveBeenCalledTimes(1);
  });

  it('should wrong on arrow left', () => {
    component.keyEvent({ key: 'ArrowLeft' } as KeyboardEvent);
    expect(service.wrong).toHaveBeenCalledTimes(1);
  });
});
