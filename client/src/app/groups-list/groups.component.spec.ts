import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsComponent } from './groups.component';
import { GroupProviderBase } from './services/group.provider/group.provider';
import { Router } from '@angular/router';
import { GroupRowMockComponent } from '../test/compontens.mock';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsComponent,
        GroupRowMockComponent],
      providers: [
        {
          provide: GroupProviderBase,
          useValue: jasmine.createSpyObj('groupProvider', ['getGroups'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('router', ['navigate'])
        }
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
