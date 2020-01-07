import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroupDetailsDto } from '../../models/group-details.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export abstract class GroupDetailsProviderBase {
    abstract getGroupDetails(groupId: number): Observable<GroupDetailsDto>;
}

export class GroupDetailsProvider extends GroupDetailsProviderBase {

    constructor(private http: HttpClient) {
        super();
    }

    getGroupDetails(groupId: number): Observable<GroupDetailsDto> {
        return this.http.get<GroupDetailsDto>(`${environment.apiUrl}/getGroupDetails/${groupId}`);
    }
}

export class GroupDetailsProviderMock extends GroupDetailsProviderBase {
    getGroupDetails(groupId: number): Observable<GroupDetailsDto> {
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
        return of<GroupDetailsDto>(groupDetailsDto);
    }
}
