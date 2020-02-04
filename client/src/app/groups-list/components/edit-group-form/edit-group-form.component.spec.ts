import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupFormComponent } from './edit-group-form.component';

describe('EditGroupFormComponent', () => {
  let component: EditGroupFormComponent;
  let fixture: ComponentFixture<EditGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
