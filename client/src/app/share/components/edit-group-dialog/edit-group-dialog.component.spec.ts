import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupDialogComponent } from './edit-group-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { LanguagesDropDownComponent } from '../languages-drop-down/languages-drop-down.component';
import { Dialog } from 'primeng/dialog';

describe('EditGroupDialogComponent', () => {
  let component: EditGroupDialogComponent;
  let fixture: ComponentFixture<EditGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        EditGroupDialogComponent,
        MockComponent(LanguagesDropDownComponent),
        MockComponent(Dialog)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
