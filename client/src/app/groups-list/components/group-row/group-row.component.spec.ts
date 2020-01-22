import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRowComponent } from './group-row.component';
import { Router } from '@angular/router';

describe('GroupRowComponent', () => {
  let component: GroupRowComponent;
  let fixture: ComponentFixture<GroupRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupRowComponent],
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('router', ['naviage'])
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
