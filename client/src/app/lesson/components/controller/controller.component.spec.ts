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

  it('should call clickCorrect', () => {
    spyOn(component.correct, 'emit');
    component.clickCorrect();
    expect(component.correct.emit).toHaveBeenCalledTimes(1);
  });

  it('should call clickWrong', () => {
    spyOn(component.wrong, 'emit');
    component.clickWrong();
    expect(component.wrong.emit).toHaveBeenCalledTimes(1);
  });

  it('should call clickCheck', () => {
    spyOn(component.check, 'emit');
    component.clickCheck();
    expect(component.check.emit).toHaveBeenCalledTimes(1);
  });
});
