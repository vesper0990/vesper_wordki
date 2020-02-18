import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsComponent } from './groups.component';
import { GroupProviderBase } from './services/group.provider/group.provider';
import { Router } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { ProgressHorizontalComponent } from '../share/components/progress-horizontal/progress-horizontal.component';
import { EditGroupFormComponent } from './components/edit-group-form/edit-group-form.component';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsComponent,
        MockComponent(GroupRowComponent),
        MockComponent(ProgressHorizontalComponent),
        MockComponent(EditGroupFormComponent)],
      providers: [
        { provide: GroupProviderBase, useValue: jasmine.createSpyObj('groupProvider', ['getGroups']) },
        { provide: Router, useValue: jasmine.createSpyObj('router', ['navigate']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
