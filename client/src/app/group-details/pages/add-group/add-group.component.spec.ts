import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupComponent } from './add-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { LanguagesDropDownComponent } from 'src/app/share/components/languages-drop-down/languages-drop-down.component';

describe('AddGroupComponent', () => {
  let component: AddGroupComponent;
  let fixture: ComponentFixture<AddGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        AddGroupComponent,
        MockComponent(LanguagesDropDownComponent)
      ],
      providers: [
        { provide: Store, useValue: jasmine.createSpyObj('store', ['select', 'dispatch']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
