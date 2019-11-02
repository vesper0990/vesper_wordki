import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { ResultSenderBase } from './sender-base.service';
import { UrlsProvider } from '../urls.provider';
import { Result } from '@app/common/models/model';
import { UserService } from '../../user/user.service';

@Injectable()
export class ResultSender implements ResultSenderBase {

  constructor(private http: HttpClient, private userService: UserService) { }

  add(result: Result): Observable<Result> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    result.userId = this.userService.user.id;
    return this.http.post<Result>(UrlsProvider.resultAdd, result, options);
  }
}
