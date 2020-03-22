import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWordDialogComponent } from './edit-word-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';

describe('EditWordDialogComponent', () => {
  let component: EditWordDialogComponent;
  let fixture: ComponentFixture<EditWordDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [EditWordDialogComponent,
        MockComponent(Checkbox),
        MockComponent(Dialog),
      ],
      providers: [

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
