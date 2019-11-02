import { UserProviderBase } from './provider-base.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/LoginRequest';
import { RegisterRequest } from '../model/RegisterRequest';
import { UserDTO } from '../model/UserDTO';

@Injectable()
export class UserProviderMock implements UserProviderBase {

    getUser(): Observable<UserDTO> {
        const userDTO = new UserDTO();
        userDTO.id = '1';
        userDTO.name = 'userName';
        userDTO.password = 'password';
        userDTO.token = 'token';
        userDTO.expires = 3600;
        return of<UserDTO>(userDTO);
    }

    login(user: LoginRequest): Observable<{}> {
        return of<{}>({});
    }

    register(user: RegisterRequest): Observable<{}> {
        return of({});
    }
}
