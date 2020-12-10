import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupRowComponent } from './group-row.component';
import { MockComponent } from 'ng-mocks';
import { LabelValueComponent } from 'src/app/share/components/label-value/label-value.component';
import { Group } from '../../models/group.model';
import { selectNativeElementByClass } from 'src/app/test/utils';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';

describe('GroupRowComponent', () => {
  let component: GroupRowComponent;
  let fixture: ComponentFixture<GroupRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupRowComponent,
        MockComponent(LabelValueComponent)
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRowComponent);
    component = fixture.componentInstance;

    component.group = {
      language1: LanguageType.getLanguageType(LanguageTypeEnum.English),
      language2: LanguageType.getLanguageType(LanguageTypeEnum.Polish),
    } as Group;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event when click edit button', () => {
    const editButton = selectNativeElementByClass(fixture, 'edit-button');

    component.edit.subscribe(value => expect(value).toBe(component.group));
    spyOn(component, 'editGroup').and.callThrough();

    editButton.click();
    expect(component.editGroup).toHaveBeenCalledTimes(1);
  });
});
