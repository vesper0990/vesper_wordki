import { Component, OnInit } from '@angular/core';
import { GroupProviderBase } from './services/group.provider/group.provider';
import { GroupDto } from './models/group-dto.model';
import { Group } from './models/group.model';
import { GroupMapper } from './services/group.mapper/group.mapper';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: Observable<Group[]>;

  constructor(private groupProvider: GroupProviderBase,
    private groupMapper: GroupMapper) { }

  ngOnInit() {
    this.groupProvider
      .getGroups()
      .pipe(
        map((values: GroupDto[]) => this.handleGroupsDto(values)),
        catchError(err => of([]))
      );
  }

  private handleGroupsDto(dtos: GroupDto[]): Group[] {
    const groups = [];
    dtos.forEach((dto: GroupDto) => {
      groups.push(this.groupMapper.map(dto));
    });
    return groups;
  }

}
