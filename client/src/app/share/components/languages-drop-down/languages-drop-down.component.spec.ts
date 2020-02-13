import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesDropDownComponent } from './languages-drop-down.component';
import { MockComponent } from 'ng-mocks';
import { FormsModule } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';

describe('LanguagesDropDownComponent', () => {
  let component: LanguagesDropDownComponent;
  let fixture: ComponentFixture<LanguagesDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagesDropDownComponent,
        MockComponent(Dropdown)],
      imports: [
        FormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
