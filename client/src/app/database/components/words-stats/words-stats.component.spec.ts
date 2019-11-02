import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsStatsComponent } from './words-stats.component';

describe('WordsStatsComponent', () => {
  let component: WordsStatsComponent;
  let fixture: ComponentFixture<WordsStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
