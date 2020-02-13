import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWordFormComponent } from './edit-word-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Word } from '../../models/word.model';

describe('EditWordFormComponent', () => {
  let component: EditWordFormComponent;
  let fixture: ComponentFixture<EditWordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditWordFormComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWordFormComponent);
    component = fixture.componentInstance;
    component.word = new Word(1, '', '', 2);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
