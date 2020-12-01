import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginContract } from './login.contract';
import { RegisterContract } from './register.contract';

export abstract class UserProviderBase {
  abstract register(contract: RegisterContract): Observable<any>;
  abstract login(contract: LoginContract): Observable<string>;
}

@Injectable()
export class UserProvider extends UserProviderBase {

  constructor(private client: HttpClient) {
    super();
  }

  register(contract: RegisterContract): Observable<any> {
    return this.client.post(`${environment.apiUrl}/user/register`, contract);
  }

  login(contract: LoginContract): Observable<string> {
    return this.client.put<string>(`${environment.apiUrl}/user/login`, contract);
  }
}

@Injectable()
export class UserProviderMock extends UserProviderBase {

  login(contract: LoginContract): Observable<string> {
    return of<string>('mock-token');
  }

  register(contract: RegisterContract): Observable<any> {
    return of<any>({});
  }
}
