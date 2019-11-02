import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProviderBase } from './provider-base.service';
import { UrlsProvider } from '@app/common/services/data/urls.provider';
import { RegisterRequest } from '../model/RegisterRequest';
import { LoginRequest } from '../model/LoginRequest';
import { UserRequest } from '../model/UserRequest';
import { UserDTO } from '../model/UserDTO';

@Injectable()
export class UserProvider implements UserProviderBase {

  constructor(private http: HttpClient) { }

  getUser(request: UserRequest): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${UrlsProvider.user}/${request.userName}/${request.password}`);
  }

  login(request: LoginRequest): Observable<{}> {
    return this.http.put(`${UrlsProvider.userLogin}`, request);
  }

  register(request: RegisterRequest): Observable<{}> {
    return this.http.post(`${UrlsProvider.userRegister}`, request);
  }
}
