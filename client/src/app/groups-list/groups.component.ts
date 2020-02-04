import { Component, OnInit } from '@angular/core';
import { GroupProviderBase } from './services/group.provider/group.provider';
import { Group } from './models/group.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: Observable<Group[]>;
  editingGroup: Group = null;

  constructor(private groupProvider: GroupProviderBase,
    private router: Router) { }

  ngOnInit() {
    this.groups = this.groupProvider.getGroups();
  }

  openGroup(groupId: number): void {
    this.router.navigate(['lesson/group', groupId]);
  }

  groupEdit(group: Group): void {
    this.editingGroup = group;
  }

  onEditSubmit(group: Group): void {
    this.editingGroup = null;
    this.groups = this.groupProvider.getGroups();
  }
}
