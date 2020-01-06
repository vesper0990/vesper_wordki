import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GroupDto } from '../../models/group-dto.model';

export abstract class GroupProviderBase {
    abstract getGroups(): Observable<GroupDto[]>;
}

@Injectable()
export class GroupProvider extends GroupProviderBase {

    constructor(private client: HttpClient) {
        super();
    }

    getGroups(): Observable<GroupDto[]> {
        throw new Error('Method not implemented.');
    }
}

export class GroupProviderMock extends GroupProviderBase {

    getGroups(): Observable<GroupDto[]> {
        return of<GroupDto[]>([]);
    }

}
