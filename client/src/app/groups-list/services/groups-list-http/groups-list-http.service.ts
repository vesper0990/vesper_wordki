import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { Group } from 'src/app/share/models/card-details';
import { GroupDto } from 'src/app/share/models/dtos/group-dto';
import { mapGroup } from 'src/app/share/models/mappers';

@Injectable()
export abstract class GroupsListHttpServiceBase {
    abstract getGroups(): Observable<Group[]>;
    abstract addGroup(editGroup: EditGroup): Observable<number>;
    abstract updateGroup(group: EditGroup): Observable<any>;
    abstract removeGroup(groupId: number): Observable<any>;
}

@Injectable()
export class GroupsListHttpService extends GroupsListHttpServiceBase {

    constructor(private client: HttpClient) {
        super();
    }

    updateGroup(group: EditGroup): Observable<any> {
        const body = {
            id: group.id,
            name: group.name,
            languageFront: group.languageFront.type,
            languageBack: group.languageBack.type,
        }
        return this.client.put(`${environment.apiUrl}/group/update`, body);
    }

    addGroup(group: EditGroup): Observable<number> {
        const body = {
            name: group.name,
            languageFront: group.languageFront.type,
            languageBack: group.languageBack.type,
        }
        return this.client.post<number>(`${environment.apiUrl}/group/add`, body);
    }

    getGroups(): Observable<Group[]> {
        return this.client.get<GroupDto[]>(`${environment.apiUrl}/group/all`).pipe(
            map((dtos: GroupDto[]) => dtos.map(item => mapGroup(item)))
        );
    }

    removeGroup(groupId: number): Observable<any> {
        return this.client.delete(`${environment.apiUrl}/group/delete/${groupId}`);
    }
}

@Injectable()
export class GroupsListHttpMockService extends GroupsListHttpServiceBase {

    constructor() {
        super();
    }

    addGroup(editGroup: EditGroup): Observable<number> {
        return of(1);
    }

    getGroups(): Observable<Group[]> {
        const groups: GroupDto[] = [];
        for (let i = 1; i < 100; i++) {
            groups.push({
                id: i,
                name: `group ${i}`,
                languageFront: 1,
                languageBack: 2,
                cardsCount: 30 % i,
                repeatsCount: 30 % i,
            });
        }
        return of<GroupDto[]>(groups).pipe(
            delay(500),
            map((dtos: GroupDto[]) => dtos.map(item => mapGroup(item)))
        );
    }

    updateGroup(group: EditGroup): Observable<any> {
        return of<any>({});
    }

    removeGroup(groupId: number): Observable<any> {
        return of<any>({});
    }

}
