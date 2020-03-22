import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export abstract class UserProviderBase {
  abstract login(name: string, password: string): Observable<any>;
  abstract getUser(name: string, password: string): Observable<any>;
  abstract authenticate(name: string, password: string): Observable<any>;
  abstract refreshToken(token: string): Observable<string>;
}

@Injectable()
export class UserProvider extends UserProviderBase {

  constructor(private client: HttpClient) {
    super();
  }

  login(name: string, password: string): Observable<any> {
    const request = {
      name: name,
      password: password
    };
    return this.client.post(`${environment.apiUrl}/login`, request);
  }

  getUser(name: string, password: string): Observable<any> {
    return this.client.get(`${environment.apiUrl}/user`);
  }

  authenticate(name: string, password: string): Observable<any> {
    const request = {
      name: name,
      password: password
    };
    return this.client.post<any>(`${environment.apiUrl}/authentication`, request);
  }

  refreshToken(token: string): Observable<string> {
    return this.client.get<string>('');
  }
}

@Injectable()
export class UserProviderMock extends UserProviderBase {

  login(name: string, password: string): Observable<any> {
    return of<any>({});
  }

  getUser(name: string, password: string): Observable<any> {
    return of<any>({});
  }

  authenticate(name: string, password: string): Observable<string> {
    return of<string>('token');
  }

  refreshToken(token: string): Observable<string> {
    return of<string>('token');
  }
}
