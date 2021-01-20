import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class GroupCreatorHttpServiceBase {
    abstract save(model: any): Observable<number>;
}
