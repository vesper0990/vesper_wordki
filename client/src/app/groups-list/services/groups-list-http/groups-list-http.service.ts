import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GroupDto } from '../../models/group-dto.model';
import { Group } from '../../models/group.model';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { mapToGroup } from '../mappers/mappers';

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
        return this.client.put(`${environment.apiUrl}/group/update`, group);
    }

    addGroup(editGroup: EditGroup): Observable<number> {
        return this.client.post<number>(`${environment.apiUrl}/group/add`, editGroup);
    }

    getGroups(): Observable<Group[]> {
        return this.client.get<GroupDto[]>(`${environment.apiUrl}/group/all`).pipe(
            map((dtos: GroupDto[]) => {
                const result = [];
                dtos.forEach((dto: GroupDto) => {
                    result.push(mapToGroup(dto));
                });
                return result;
            }));
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
                language1: 1,
                language2: 2,
                cardsCount: 30 % i,
                repeatsCount: 30 % i,
                visibleWordsCount: 30 % i,
                averageDrawer: 5 % i,
            });
        }
        return of<GroupDto[]>(groups)
            .pipe(map((dtos: GroupDto[]) => {
                const result = [];
                dtos.forEach((dto: GroupDto) => {
                    result.push(mapToGroup(dto));
                });
                return result;
            })).pipe(delay(500));
    }

    updateGroup(group: EditGroup): Observable<any> {
        return of<any>({});
    }

    removeGroup(groupId: number): Observable<any> {
        return of<any>({});
    }

}
