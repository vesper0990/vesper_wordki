import { GroupProviderBase } from './provider-base.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MockHelper } from '../_mock-helper';
import { GroupItem, Group } from '@app/common/models/model';

@Injectable()
export class GroupProviderMock implements GroupProviderBase {

    constructor() { }

    getGroupsItems(): Observable<GroupItem[]> {
        const items: GroupItem[] = [];
        const groups = MockHelper.database.groups;
        groups.forEach(element => {
            const item: GroupItem = {
                id: element.id,
                name: element.name,
                language1: element.language1,
                language2: element.language2,
                wordsCount: element.words.length,
                resultsCount: element.results.length,
                creationDate: element.creationDate,
                lastLessonDate: element.creationDate
            };
            items.push(item);
        });
        return of<GroupItem[]>(items);
    }

    getGroup(groupId: string): Observable<GroupItem> {
        let item: GroupItem;
        const groups = MockHelper.database.groups;
        groups.forEach(element => {
            if (element.id === groupId) {
                item = {
                    id: element.id,
                    name: element.name,
                    language1: element.language1,
                    language2: element.language2,
                    wordsCount: element.words.length,
                    resultsCount: element.results.length,
                    creationDate: element.creationDate,
                    lastLessonDate: element.creationDate
                };
            }
        });
        return of<GroupItem>(item);
    }


    getGroupDetails(groupId: string): Observable<Group> {
        for (let i = 0; i < MockHelper.database.groups.length; i++) {
            if (MockHelper.database.groups[i].id === groupId) {
                return of<Group>(MockHelper.database.groups[i]);
            }
        }
        return of<Group>(new Group());
    }
}
