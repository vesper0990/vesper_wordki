import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroupCreatorHttpServiceBase } from './group-creator-http.service.base';

@Injectable()
export class GroupCreatorHttpServiceMock extends GroupCreatorHttpServiceBase {
    save(model: any): Observable<number> {
        return of(1);
    }
}
