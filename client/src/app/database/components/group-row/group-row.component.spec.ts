import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { GroupRowComponent } from './group-row.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GroupRowModel } from './group-row.model';
import { Location } from '@angular/common';
import { MockComponent } from 'src/app/util.mocks';
import { getElementByTagAndInnerText } from 'src/app/util.test';

describe('GroupRowComponent', () => {
  let component: GroupRowComponent;
  let fixture: ComponentFixture<GroupRowComponent>;
  let groupMock: GroupRowModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupRowComponent, MockComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'group/:id', component: MockComponent }
        ])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    groupMock = <GroupRowModel>{ id: '1', name: 'test', resultsCount: 1, wordsCount: 1, lastLesson: new Date('') };
    fixture = TestBed.createComponent(GroupRowComponent);
    component = fixture.componentInstance;
    component.group = groupMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect after click groupName', fakeAsync(() => {
    const element = getElementByTagAndInnerText(fixture, 'a', groupMock.name);
    const location = TestBed.get(Location);
    element.nativeElement.click();
    tick();
    expect(location.path()).toBe('/group/1');
  }));
});
