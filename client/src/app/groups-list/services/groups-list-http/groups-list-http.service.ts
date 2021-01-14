import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { Group } from 'src/app/share/models/card-details';
import { GroupDto } from 'src/app/share/models/dtos/group-dto';
import { mapGroup } from 'src/app/share/models/mappers';
import { GroupsListHttpServiceBase } from './groups-list-http.service.base';

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
        };
        return this.client.put(`${environment.apiUrl}/group/update`, body);
    }

    addGroup(group: EditGroup): Observable<number> {
        const body = {
            name: group.name,
            languageFront: group.languageFront.type,
            languageBack: group.languageBack.type,
        };
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


