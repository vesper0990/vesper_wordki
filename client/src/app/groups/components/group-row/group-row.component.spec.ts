import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRowComponent } from './group-row.component';

describe('GroupRowComponent', () => {
  let component: GroupRowComponent;
  let fixture: ComponentFixture<GroupRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupRowComponent ]
    })
    .compileComponents();
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
