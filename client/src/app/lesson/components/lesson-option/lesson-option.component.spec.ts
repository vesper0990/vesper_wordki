import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonOptionComponent } from './lesson-option.component';

describe('LessonOptionComponent', () => {
  let component: LessonOptionComponent;
  let fixture: ComponentFixture<LessonOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonOptionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
