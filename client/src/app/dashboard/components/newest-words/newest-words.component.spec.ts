import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestWordsComponent } from './newest-words.component';

describe('LastWordsComponent', () => {
  let component: NewestWordsComponent;
  let fixture: ComponentFixture<NewestWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewestWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
