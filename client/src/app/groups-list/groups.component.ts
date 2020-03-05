import { Component, OnInit } from '@angular/core';
import { GroupProviderBase } from './services/group.provider/group.provider';
import { Group } from './models/group.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GroupListState } from './store/reducer';
import { Store } from '@ngrx/store';
import { getGroupsList } from './store/selectors';
import { GetGroupListAction, UpdateGroupInList } from './store/actions';

@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups$: Observable<Group[]>;
  editingGroup: Group = null;

  constructor(private groupProvider: GroupProviderBase,
    private router: Router,
    private groupsListState: Store<GroupListState>) { }

  ngOnInit() {
    this.groups$ = this.groupsListState.select(getGroupsList);
    this.groupsListState.dispatch(new GetGroupListAction());
  }

  openGroup(groupId: number): void {
    this.router.navigate(['lesson/group', groupId]);
  }

  groupEdit(group: Group): void {
    this.editingGroup = group;
  }

  onEditSubmit(group: Group): void {
    this.groupsListState.dispatch(new UpdateGroupInList({ group: group }));
    this.editingGroup = null;
  }
}
