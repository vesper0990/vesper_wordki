import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Result } from '@app/common/models/model';

@Injectable()
export abstract class ResultSenderBase {

    abstract add(result: Result): Observable<Result>;
}
