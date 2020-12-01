import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGroupDialogComponent } from './edit-group-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { LanguagesDropDownComponent } from '../languages-drop-down/languages-drop-down.component';
import { Dialog } from 'primeng/dialog';
import { Footer } from 'primeng/api';

describe('EditGroupDialogComponent', () => {
  let component: EditGroupDialogComponent;
  let fixture: ComponentFixture<EditGroupDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        EditGroupDialogComponent,
        MockComponent(LanguagesDropDownComponent),
        MockComponent(Dialog),
        MockComponent(Footer)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
