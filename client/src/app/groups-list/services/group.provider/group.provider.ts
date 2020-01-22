import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GroupDto } from '../../models/group-dto.model';
import { Group } from '../../models/group.model';
import { GroupMapper } from '../group.mapper/group.mapper';
import { map } from 'rxjs/operators';

export abstract class GroupProviderBase {
    abstract getGroups(): Observable<Group[]>;
}

@Injectable()
export class GroupProvider extends GroupProviderBase {

    constructor(private client: HttpClient) {
        super();
    }

    getGroups(): Observable<Group[]> {
        throw new Error('Method not implemented.');
    }
}

export class GroupProviderMock extends GroupProviderBase {

    constructor(private mapper: GroupMapper) {
        super();
    }

    getGroups(): Observable<Group[]> {
        const groups: GroupDto[] = [];
        for (let i = 1; i < 100; i++) {
            groups.push({
                id: i,
                name: `group ${i}`,
                language1: 1,
                language2: 2,
                wordsCount: 30 % i
            });
        }
        return of<GroupDto[]>(groups)
            .pipe(map((dtos: GroupDto[]) => {
                const result = [];
                dtos.forEach((dto: GroupDto) => {
                    result.push(this.mapper.map(dto));
                });
                return result;
            }));
    }

}
