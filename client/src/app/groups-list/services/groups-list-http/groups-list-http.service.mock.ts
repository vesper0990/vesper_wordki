import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { Group } from 'src/app/share/models/card-details';
import { GroupDto } from 'src/app/share/models/dtos/group-dto';
import { mapGroup } from 'src/app/share/models/mappers';
import { GroupsListHttpServiceBase } from './groups-list-http.service.base';


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
