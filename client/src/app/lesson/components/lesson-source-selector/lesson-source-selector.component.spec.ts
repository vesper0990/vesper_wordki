import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSourceSelectorComponent } from './lesson-source-selector.component';

describe('LessonSourceSelectorComponent', () => {
  let component: LessonSourceSelectorComponent;
  let fixture: ComponentFixture<LessonSourceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonSourceSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonSourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
