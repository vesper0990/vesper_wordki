import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LessonStep } from '../../models/lesson-state';
import { ControllerComponent } from './controller.component';

describe('ControllerComponent', () => {
  let component: ControllerComponent;
  let fixture: ComponentFixture<ControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControllerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerComponent);
    component = fixture.componentInstance;
    component.lessonStep = LessonStep.QUESTION;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
