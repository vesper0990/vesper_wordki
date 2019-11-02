import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GroupItem, Group } from '@app/common/models/model';

@Injectable()
export abstract class GroupProviderBase {
    
    abstract getGroup(groupId: string): Observable<GroupItem>;
    abstract getGroupsItems(): Observable<GroupItem[]>;
    abstract getGroupDetails(groupId: string): Observable<Group>;
}
