import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  RegisterUserCommand,
  LoginUserCommand,
  GetUserQuery,
  User
} from '../../models';
import { environment } from 'src/environments/environment';

export abstract class IUserProviderService {
  abstract register(command: RegisterUserCommand): Observable<{}>;
  abstract login(command: LoginUserCommand): Observable<{}>;
  abstract get(query: GetUserQuery): Observable<User>;
}

@Injectable()
export class UserProviderService implements IUserProviderService {

  constructor(private client: HttpClient) { }

  register(command: RegisterUserCommand): Observable<{}> {
    return this.client.post<{}>(`${environment.apiUrl}/register`, command);
  }

  login(command: LoginUserCommand): Observable<{}> {
    return this.client.put<{}>(`${environment.apiUrl}/login`, command);
  }

  get(query: GetUserQuery): Observable<User> {
    return this.client.patch<User>(`${environment.apiUrl}/user`, query);
  }
}

@Injectable()
export class UserProviderServiceMock implements IUserProviderService {

  register(command: RegisterUserCommand): Observable<{}> {
    return of<{}>();
  }

  login(command: LoginUserCommand): Observable<{}> {
    return of<{}>();
  }

  get(query: GetUserQuery): Observable<User> {
    return of<User>(<User>{});
  }
}
