import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/LoginRequest';
import { RegisterRequest } from '../model/RegisterRequest';
import { UserRequest } from '../model/UserRequest';
import { UserDTO } from '../model/UserDTO';

@Injectable()
export abstract class UserProviderBase {
  abstract getUser(request: UserRequest): Observable<UserDTO>;
  abstract login(request: LoginRequest): Observable<any>;
  abstract register(request: RegisterRequest): Observable<any>;
}
