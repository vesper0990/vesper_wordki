import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupToSplit } from '@app/common/models/model';
import { UrlsProvider } from '../urls.provider';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export abstract class GroupSenderBase {
    abstract update(contract: UpdateGroupContract): Observable<{}>;
    abstract add(contract: AddGroupContract): Observable<string>;
    abstract remove(contract: RemoveGroupContract): Observable<{}>;
    abstract split(group: GroupToSplit): Observable<{}>;
}

@Injectable()
export class GroupSender implements GroupSenderBase {

    private options: { headers: HttpHeaders }

    constructor(private http: HttpClient) {
        this.options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }

    update(contract: UpdateGroupContract): Observable<{}> {
        return this.http.put(UrlsProvider.groupUpdate, contract, this.options);
    }

    add(contract: AddGroupContract): Observable<string> {
        return this.http.post<string>(UrlsProvider.groupAdd, contract, this.options);
    }

    remove(contract: RemoveGroupContract): Observable<{}> {
        return this.http.post(UrlsProvider.groupRemove, contract, this.options);
    }

    split(group: GroupToSplit): Observable<{}> {
        return this.http.post(UrlsProvider.groupSplit, group, this.options);
    }
}

export interface UpdateGroupContract {
    id: string;
    name: string;
    language1: number;
    language2: number;
}

export interface AddGroupContract {
    userId: string;
    name: string;
    language1: number;
    language2: number;
}

export interface RemoveGroupContract {
    id: string;
}
