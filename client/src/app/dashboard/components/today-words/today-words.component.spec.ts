import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayWordsComponent } from './today-words.component';

describe('TodayWordsComponent', () => {
  let component: TodayWordsComponent;
  let fixture: ComponentFixture<TodayWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
