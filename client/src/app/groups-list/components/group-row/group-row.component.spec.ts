import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRowComponent } from './group-row.component';
import { Router } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { LabelValueComponent } from 'src/app/share/components/label-value/label-value.component';
import { Group } from '../../models/group.model';
import { LanguageType, LanguageTypeEnum } from 'src/app/share/models/language-type.mode';

describe('GroupRowComponent', () => {
  let component: GroupRowComponent;
  let fixture: ComponentFixture<GroupRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupRowComponent,
        MockComponent(LabelValueComponent)
      ],
      providers: [
        { provide: Router, useValue: jasmine.createSpyObj('router', ['naviage']) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRowComponent);
    component = fixture.componentInstance;
    component.group = <Group>{
      id: 1,
      name: 'grupa',
      language1: LanguageType.getLanguageType(LanguageTypeEnum.Polish),
      language2: LanguageType.getLanguageType(LanguageTypeEnum.Polish),
      averageDrawer: 1,
      repeatsCount: 1,
      visibleWordsCount: 1,
      wordsCount: 1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
