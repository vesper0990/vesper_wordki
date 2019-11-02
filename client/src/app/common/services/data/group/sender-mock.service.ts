import { Observable, of } from 'rxjs';
import { GroupSenderBase, UpdateGroupContract, AddGroupContract, RemoveGroupContract } from './sender-base.service';
import { Injectable } from '@angular/core';
import { MockHelper } from '../_mock-helper';
import { Group, GroupToSplit } from '@app/common/models/model';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class GroupSenderMock implements GroupSenderBase {

  constructor() { }

  update(contract: UpdateGroupContract): Observable<{}> {
    for (let i = 0; i < MockHelper.database.groups.length; i++) {
      if (MockHelper.database.groups[i].id === contract.id) {
        MockHelper.database.groups[i].name = contract.name;
        MockHelper.database.groups[i].language1 = contract.language1;
        MockHelper.database.groups[i].language2 = contract.language2;
        break;
      }
    }
    return of({});
  }

  add(contract: AddGroupContract): Observable<string> {
    const newGroup = new Group();
    newGroup.id = `${MockHelper.database.groups.length}`;
    newGroup.language1 = contract.language1;
    newGroup.language2 = contract.language2;
    newGroup.name = contract.name;
    MockHelper.database.groups.push(newGroup);
    return of<string>(newGroup.id);
  }

  remove(contract: RemoveGroupContract): Observable<{}> {
    for (let i = 0; i < MockHelper.database.groups.length; i++) {
      if (MockHelper.database.groups[i].id === contract.id) {
        MockHelper.database.groups.splice(i, 1);
      }
    }
    return of({});
  }

  split(group: GroupToSplit): Observable<{}> {
    console.log('Mock split', this.constructor.name);
    return of({});
  }
}
