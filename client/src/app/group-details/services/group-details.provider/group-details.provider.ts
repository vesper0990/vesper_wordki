import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroupDetailsDto } from '../../models/group-details.dto';

@Injectable()
export abstract class GroupDetailsProviderBase {
    abstract getGroupDetails(groupId: number): Observable<GroupDetailsDto>;
}

export class GroupDetailsProvider extends GroupDetailsProviderBase {
    getGroupDetails(groupId: number): Observable<GroupDetailsDto> {
        throw new Error('Method not implemented.');
    }

}

export class GroupDetailsProviderMock extends GroupDetailsProviderBase {
    getGroupDetails(groupId: number): Observable<GroupDetailsDto> {
        return of<GroupDetailsDto>();
    }
}
