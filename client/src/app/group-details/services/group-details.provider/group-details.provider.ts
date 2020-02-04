import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupDetailsDto } from '../../models/group-details.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GroupDetails } from '../../models/group-details.model';
import { GroupDetailsMapper } from '../group-details.mapper/group-details.mapper';

@Injectable()
export abstract class GroupDetailsProviderBase {
    abstract getGroupDetails(groupId: number): Observable<GroupDetails>;
}

@Injectable()
export class GroupDetailsProvider extends GroupDetailsProviderBase {

    constructor(private http: HttpClient, private mapper: GroupDetailsMapper) {
        super();
    }

    getGroupDetails(groupId: number): Observable<GroupDetails> {
        return this.http.get<GroupDetailsDto>(`${environment.apiUrl}/getGroupDetails/${groupId}`).pipe(
            map((dto: GroupDetailsDto) => this.mapper.map(dto)));
    }
}

@Injectable()
export class GroupDetailsProviderMock extends GroupDetailsProviderBase {

    constructor(private mapper: GroupDetailsMapper) {
        super();
    }

    getGroupDetails(groupId: number): Observable<GroupDetails> {
        const groupDetailsDto: GroupDetailsDto = {
            id: groupId,
            name: `group ${groupId}`,
            language1: 1,
            language2: 2,
            words: []
        };
        for (let i = 0; i < 10; i++) {
            groupDetailsDto.words.push({
                id: 1,
                language1: `word ${i}`,
                language2: `słowo ${i}`,
                drawer: 5 % i
            });
        }
        return of<GroupDetailsDto>(groupDetailsDto).pipe(map((dto: GroupDetailsDto) => this.mapper.map(dto)));
    }
}
