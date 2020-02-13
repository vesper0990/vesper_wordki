import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesDropDownComponent } from './languages-drop-down.component';
import { DropDownMockComponent } from 'src/app/test/component-ngprime.mock';
import { FormsModule } from '@angular/forms';

describe('LanguagesDropDownComponent', () => {
  let component: LanguagesDropDownComponent;
  let fixture: ComponentFixture<LanguagesDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagesDropDownComponent,
        DropDownMockComponent],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
