import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormComponent } from './group-form.component';
import { Component, Input } from '@angular/core';

describe('GroupFormComponent', () => {
  let component: GroupFormComponent;
  let fixture: ComponentFixture<GroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupFormComponent,
        DropdownBaseMockComponent,
        DropdownItemLanguageMockComponent,
        InputRowMockComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-dropdown-base-b',
  template: ''
})
class DropdownBaseMockComponent {
  @Input() items: any;
  @Input() selectedItem: any;
}

@Component({
  selector: 'app-dropdown-item-language',
  template: ''
})
class DropdownItemLanguageMockComponent {
  @Input() language: any;
}

@Component({
  selector: 'app-input-row',
  template: ''
})
class InputRowMockComponent {
  @Input() label: any;
  @Input() value: any;
}
