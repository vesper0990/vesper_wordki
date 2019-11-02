import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddGroupComponent } from '../modal-add-group.component';
import { ModalBaseComponent } from '../../modal-base/modal-base.component';
import { DropdownMockComponent, DropdownItemLanguageMockComponent } from './modal-add-group.component.mocks';
import { getElementByTagAndInnerText } from 'src/app/util.test';
import { FormsModule } from '@angular/forms';
import { GroupSenderBase, GroupSenderMock } from '@app/common/services/data/data.service';

describe('ModalAddGroupComponent', () => {
  let component: ModalAddGroupComponent;
  let fixture: ComponentFixture<ModalAddGroupComponent>;
  let groupSenderMock: GroupSenderMock;

  beforeEach(async(() => {
    groupSenderMock = new GroupSenderMock();
    TestBed.configureTestingModule({
      declarations: [
        ModalAddGroupComponent,
        ModalBaseComponent,
        DropdownMockComponent,
        DropdownItemLanguageMockComponent
      ],
      providers: [
        { provide: GroupSenderBase, useValue: groupSenderMock }
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create group object if any was pass', () => {
    expect(component.group !== null).toBeTruthy();
  });

  it('should close after yes click', () => {
    component.visible = true;
    getElementByTagAndInnerText(fixture, 'button', 'Yes').nativeElement.click();
    expect(component.visible).toBeFalsy();
  });

  it('should close after no click', () => {
    component.visible = true;
    getElementByTagAndInnerText(fixture, 'button', 'No').nativeElement.click();
    expect(component.visible).toBeFalsy();
  });

  it('should emit visible during change', () => {
    component.visible = true;
    spyOn(component.visibleChange, 'emit').and.callThrough();
    component.closeDialog();
    expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
  });
});

