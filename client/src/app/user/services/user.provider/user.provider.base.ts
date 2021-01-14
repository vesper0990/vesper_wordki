import { Observable } from 'rxjs';
import { LoginContract } from './login.contract';
import { RegisterContract } from './register.contract';


export abstract class UserProviderBase {
  abstract register(contract: RegisterContract): Observable<any>;
  abstract login(contract: LoginContract): Observable<string>;
}
