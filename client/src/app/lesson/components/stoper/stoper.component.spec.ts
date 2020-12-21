import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoperComponent } from './stoper.component';
import { StoperService } from '../../services/stoper/stoper2.service';
import { Store } from '@ngrx/store';

describe('StoperComponent', () => {
  let component: StoperComponent;
  let fixture: ComponentFixture<StoperComponent>;
  let stoperServiceMock: jasmine.SpyObj<StoperService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoperComponent],
      providers: [
        { provide: StoperService, useValue: jasmine.createSpyObj('stoperService', ['getObservable']) },
        { provide: Store, useValue: jasmine.createSpyObj('lessonStore', ['dispatch']) }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    stoperServiceMock = TestBed.inject(StoperService) as jasmine.SpyObj<StoperService>;
    // stoperServiceMock.getObservable.and.returnValue(of());
    fixture = TestBed.createComponent(StoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
