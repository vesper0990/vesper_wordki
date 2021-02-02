import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTypeSelectorComponent } from './lesson-type-selector.component';

describe('LessonTypeSelectorComponent', () => {
  let component: LessonTypeSelectorComponent;
  let fixture: ComponentFixture<LessonTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonTypeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
