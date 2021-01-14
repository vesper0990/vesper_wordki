import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginContract } from './login.contract';
import { RegisterContract } from './register.contract';
import { UserProviderBase } from './user.provider.base';


@Injectable()
export class UserProviderMock extends UserProviderBase {

  login(contract: LoginContract): Observable<string> {
    return of<string>('mock-token');
  }

  register(contract: RegisterContract): Observable<any> {
    return of<any>({});
  }
}
