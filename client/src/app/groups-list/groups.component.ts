import { Component, OnInit } from '@angular/core';
import { Group } from './models/group.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GroupListState } from './store/reducer';
import { Store } from '@ngrx/store';
import { getGroupsList, getIsLoading } from './store/selectors';
import { GetGroupListAction, UpdateGroupInList, RemoveGroupAction } from './store/actions';
import { EditGroup } from '../share/components/edit-group-dialog/edit-group.model';

@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups$: Observable<Group[]>;
  isLoading$: Observable<boolean>;
  editingGroup: EditGroup = null;

  constructor(private router: Router,
    private groupsListState: Store<GroupListState>) { }

  ngOnInit() {
    this.groups$ = this.groupsListState.select(getGroupsList);
    this.isLoading$ = this.groupsListState.select(getIsLoading);
    this.groupsListState.dispatch(new GetGroupListAction());
  }

  openGroup(groupId: number): void {
    this.router.navigate(['lesson/group', groupId]);
  }

  groupEdit(group: Group): void {
    const editGroup = <EditGroup>{
      id: group.id,
      name : group.name,
      language1: group.language1,
      language2: group.language2
    };
    this.editingGroup = editGroup;
  }

  onEditSubmit(group: EditGroup): void {
    this.groupsListState.dispatch(new UpdateGroupInList({ group: group }));
    this.editingGroup = null;
  }

  onEditCancel(): void {
    this.editingGroup = null;
  }

  onEditRemove(groupId: number): void {
    this.editingGroup = null;
    this.groupsListState.dispatch(new RemoveGroupAction({ groupId: groupId }));
  }

  addGroup(): void {
    this.router.navigate(['details/add']);
  }
}
