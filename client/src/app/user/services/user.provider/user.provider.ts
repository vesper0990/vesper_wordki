import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginContract } from './login.contract';
import { RegisterContract } from './register.contract';
import { AuthenticateContract } from './authenticate.contract';
import { UserSettings } from 'src/app/authorization/services/user.service/user-settings.model';
import { map } from 'rxjs/operators';
import { LanguageType } from 'src/app/share/models/language-type.mode';

export abstract class UserProviderBase {
  abstract register(contract: RegisterContract): Observable<any>;
  abstract login(contract: LoginContract): Observable<any>;
  abstract authenticate(contract: AuthenticateContract): Observable<any>;
  abstract refreshToken(): Observable<string>;
  abstract getUserSettings(): Observable<UserSettings>;
}

@Injectable()
export class UserProvider extends UserProviderBase {

  constructor(private client: HttpClient) {
    super();
  }

  register(contract: RegisterContract): Observable<any> {
    return this.client.post(`${environment.apiUrl}/user/register`, contract);
  }

  login(contract: LoginContract): Observable<any> {
    return this.client.put(`${environment.apiUrl}/user/login`, contract);
  }

  authenticate(contract: AuthenticateContract): Observable<any> {
    return this.client.post<any>(`${environment.apiUrl}/authentication`, contract);
  }

  refreshToken(): Observable<string> {
    return this.client.get<string>(`${environment.apiUrl}/refreshToken`);
  }

  getUserSettings(): Observable<UserSettings> {
    return this.client.get<UserSettingsDto>(`${environment.apiUrl}/getUserSettings`).pipe(
      map((dto: UserSettingsDto) => {
        const langauges: LanguageType[] = [];
        dto.languages.forEach((languageType: number) => {
          langauges.push(LanguageType.getLanguageType(languageType));
        });
        return {
          languages: langauges
        } as UserSettings;
      })
    );
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

  getUserSettings(): Observable<UserSettings> {
    return of<UserSettings>({
      languages: LanguageType.getAll()
    } as UserSettings);
  }
}

export class UserSettingsDto {
  languages: number[];
}
