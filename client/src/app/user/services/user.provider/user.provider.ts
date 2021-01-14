import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginContract } from './login.contract';
import { RegisterContract } from './register.contract';
import { UserProviderBase } from './user.provider.base';

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
