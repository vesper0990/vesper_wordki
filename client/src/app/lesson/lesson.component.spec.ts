import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonComponent } from './lesson.component';
import { Store } from '@ngrx/store';
import { LessonState } from './store/reducer';
import { FinishLessonAction } from './store/actions';

describe('LessonComponent', () => {
  let component: LessonComponent;
  let fixture: ComponentFixture<LessonComponent>;
  let storeMock: jasmine.SpyObj<Store<LessonState>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LessonComponent],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('store', ['dispatch'])
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    storeMock = TestBed.get(Store);
    fixture = TestBed.createComponent(LessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should finish lesson when destroy component', () => {
    component.ngOnDestroy();
    expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
    expect(storeMock.dispatch).toHaveBeenCalledWith(new FinishLessonAction());
  });
});
