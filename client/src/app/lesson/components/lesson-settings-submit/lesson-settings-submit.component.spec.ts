import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSettingsSubmitComponent } from './lesson-settings-submit.component';

describe('LessonSettingsSubmitComponent', () => {
  let component: LessonSettingsSubmitComponent;
  let fixture: ComponentFixture<LessonSettingsSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonSettingsSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonSettingsSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
