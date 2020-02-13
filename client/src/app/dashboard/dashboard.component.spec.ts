import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { LastFailedRepeatComponent } from './components/last-failed-repeat/last-failed-repeat.component';
import { NewestWordsComponent } from './components/newest-words/newest-words.component';
import { NextRepeatWordComponent } from './components/next-repeat-word/next-repeat-word.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent,
        MockComponent(LastFailedRepeatComponent),
        MockComponent(NewestWordsComponent),
        MockComponent(NextRepeatWordComponent)],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('router', ['navigate']) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
