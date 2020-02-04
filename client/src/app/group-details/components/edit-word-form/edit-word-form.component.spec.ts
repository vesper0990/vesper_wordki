import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWordFormComponent } from './edit-word-form.component';

describe('EditWordFormComponent', () => {
  let component: EditWordFormComponent;
  let fixture: ComponentFixture<EditWordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
