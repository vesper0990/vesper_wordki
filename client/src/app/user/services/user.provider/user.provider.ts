import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginContract } from './login.contract';
import { RegisterContract } from './register.contract';
import { AuthenticateContract } from './authenticate.contract';

export abstract class UserProviderBase {
  abstract register(contract: RegisterContract): Observable<any>;
  abstract login(contract: LoginContract): Observable<any>;
  abstract authenticate(contract: AuthenticateContract): Observable<any>;
  abstract refreshToken(): Observable<string>;
}

@Injectable()
export class UserProvider extends UserProviderBase {

  constructor(private client: HttpClient) {
    super();
  }

  register(contract: RegisterContract): Observable<any> {
    return this.client.post(`${environment.apiUrl}/register`, contract);
  }

  login(contract: LoginContract): Observable<any> {
    return this.client.post(`${environment.apiUrl}/login`, contract);
  }

  authenticate(contract: AuthenticateContract): Observable<any> {
    return this.client.post<any>(`${environment.apiUrl}/authentication`, contract);
  }

  refreshToken(): Observable<string> {
    return this.client.get<string>(`${environment.apiUrl}/refreshToken`);
  }
}

@Injectable()
export class UserProviderMock extends UserProviderBase {

  login(contract: LoginContract): Observable<any> {
    return of<any>({});
  }

  authenticate(contract: AuthenticateContract): Observable<string> {
    return of<string>('token');
  }

  refreshToken(): Observable<string> {
    return of<string>('token');
  }

  register(contract: RegisterContract): Observable<any> {
    return of<any>({});
  }
}
