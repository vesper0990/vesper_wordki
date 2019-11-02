import { GroupProviderBase } from './provider-base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlsProvider } from '../urls.provider';
import { Injectable } from '@angular/core';
import { UserService } from '@app/common/services/user/user.service';
import { GroupItem, Group } from '@app/common/models/model';
import { environment } from 'src/environments/environment';

@Injectable()
export class GroupProvider implements GroupProviderBase {

    constructor(private http: HttpClient, private userService: UserService) { }

    getGroupsItems(): Observable<GroupItem[]> {
        return this.http.get<GroupItem[]>(`${environment.apiUrl}GroupItems/${this.userService.user.id}`);
    }

    getGroup(groupId: string): Observable<GroupItem> {
        return this.http.get<GroupItem>(`${environment.apiUrl}GroupItems/${this.userService.user.id}/${groupId}`);
    }

    getGroupDetails(groupId: string): Observable<Group> {
        return this.http.get<Group>(`${UrlsProvider.groupDetails}/${groupId}`);
    }
}
