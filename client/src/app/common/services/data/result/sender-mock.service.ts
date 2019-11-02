import { Injectable } from '@angular/core';
import { ResultProviderBase } from './provider-base.service';
import { of, Observable } from 'rxjs';
import { MockHelper } from '../_mock-helper';
import { Result } from '@app/common/models/model';

@Injectable()
export class ResultSenderMock implements ResultProviderBase {

  add(result: Result): Observable<Result> {
    for (let i = 0; i < MockHelper.database.groups.length; i++) {
      if (MockHelper.database.groups[i].id === result.groupId) {
        result.id = `${MockHelper.database.groups[i].results.length}`;
        MockHelper.database.groups[i].results.push(result);
      }
    }
    return of<Result>(result);
  }
}
