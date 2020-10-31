import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsComponent } from './groups.component';
import { GroupsListHttpServiceBase } from './services/groups-list-http/groups-list-http.service';
import { Router } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { ProgressHorizontalComponent } from '../share/components/progress-horizontal/progress-horizontal.component';
import { Store } from '@ngrx/store';
import { EditGroupDialogComponent } from '../share/components/edit-group-dialog/edit-group-dialog.component';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsComponent,
        MockComponent(GroupRowComponent),
        MockComponent(ProgressHorizontalComponent),
        MockComponent(EditGroupDialogComponent)],
      providers: [
        { provide: GroupsListHttpServiceBase, useValue: jasmine.createSpyObj('groupProvider', ['getGroups']) },
        { provide: Router, useValue: jasmine.createSpyObj('router', ['navigate']) },
        { provide: Store, useValue: jasmine.createSpyObj('store', ['select', 'dispatch']) },
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
