import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGroupFormComponent } from './edit-group-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupProviderBase } from '../../services/group.provider/group.provider';
import { of } from 'rxjs';
import { Group } from '../../models/group.model';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';
import { MockComponent } from 'ng-mocks';
import { LanguagesDropDownComponent } from 'src/app/share/components/languages-drop-down/languages-drop-down.component';

describe('EditGroupFormComponent', () => {
  let component: EditGroupFormComponent;
  let fixture: ComponentFixture<EditGroupFormComponent>;
  let groupProviderMock: jasmine.SpyObj<GroupProviderBase>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroupFormComponent,
        MockComponent(LanguagesDropDownComponent)],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: GroupProviderBase, useValue: jasmine.createSpyObj('groupProvider', ['updateGroup']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    groupProviderMock = TestBed.get(GroupProviderBase);
    groupProviderMock.updateGroup.and.returnValue(of());
    fixture = TestBed.createComponent(EditGroupFormComponent);
    component = fixture.componentInstance;
    component.group = new Group(
      1,
      '',
      LanguageType.getLanguageType(LanguageTypeEnum.Polish),
      LanguageType.getLanguageType(LanguageTypeEnum.Polish),
      0,
      0,
      0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
