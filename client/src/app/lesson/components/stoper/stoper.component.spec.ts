import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoperComponent } from './stoper.component';
import { StoperService } from '../../services/stoper/stoper.service';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { of } from 'rxjs';

describe('StoperComponent', () => {
  let component: StoperComponent;
  let fixture: ComponentFixture<StoperComponent>;
  let stoperServiceMock: jasmine.SpyObj<StoperService>;
  let storeMock: jasmine.SpyObj<Store<LessonState>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoperComponent],
      providers: [
        { provide: StoperService, useValue: jasmine.createSpyObj('stoperService', ['getObservable']) },
        { provide: Store, useValue: jasmine.createSpyObj('lessonStore', ['dispatch']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    stoperServiceMock = TestBed.get(StoperService);
    stoperServiceMock.getObservable.and.returnValue(of());
    storeMock = TestBed.get(Store);
    fixture = TestBed.createComponent(StoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
