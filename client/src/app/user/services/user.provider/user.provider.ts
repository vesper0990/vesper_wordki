import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class UserProvider {

    constructor(private client: HttpClient) { }

    login(name: string, password: string): Observable<any> {
        return this.client.get(`${environment.apiUrl}/user`);
    }

    getUser(name: string, password: string): Observable<any> {
        return this.client.get(`${environment.apiUrl}/user`);
    }

    refreshToken(token: string): Observable<string> {
        return this.client.get<string>('');
    }
}
