import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditGroup } from 'src/app/share/components/edit-group-dialog/edit-group.model';
import { Group } from 'src/app/share/models/card-details';

@Injectable()
export abstract class GroupsListHttpServiceBase {
    abstract getGroups(): Observable<Group[]>;
    abstract addGroup(editGroup: EditGroup): Observable<number>;
    abstract updateGroup(group: EditGroup): Observable<any>;
    abstract removeGroup(groupId: number): Observable<any>;
}
