import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLangaugeSelectorComponent } from './lesson-langauge-selector.component';

describe('LessonLangaugeSelectorComponent', () => {
  let component: LessonLangaugeSelectorComponent;
  let fixture: ComponentFixture<LessonLangaugeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonLangaugeSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLangaugeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
