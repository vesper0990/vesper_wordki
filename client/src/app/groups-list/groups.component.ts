import { Component, OnInit } from '@angular/core';
import { Group } from './models/group.model';
import { Observable } from 'rxjs';
import { EditGroup } from '../share/components/edit-group-dialog/edit-group.model';
import { GroupsListService } from './services/groups-list/groups-list.service';

@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [GroupsListService]
})
export class GroupsComponent implements OnInit {

  groups$: Observable<Group[]>;
  isLoading$: Observable<boolean>;
  editingGroup: EditGroup = null;

  constructor(private readonly service: GroupsListService) { }

  ngOnInit() {
    this.service.loadGroups();
    this.groups$ = this.service.getList();
    this.isLoading$ = this.service.isLoading()
  }

  openGroup(groupId: number): void {
    this.service.openGroup(groupId);
  }

  groupEdit(group: Group): void {
    const editGroup = <EditGroup>{
      id: group.id,
      name: group.name,
      language1: group.language1,
      language2: group.language2
    };
    this.editingGroup = editGroup;
  }

  onEditSubmit(group: EditGroup): void {
    // this.groupsListState.dispatch(new UpdateGroup({ group: group }));
    this.editingGroup = null;
  }

  onEditCancel(): void {
    this.editingGroup = null;
  }

  onEditRemove(groupId: number): void {
    this.editingGroup = null;
    // this.groupsListState.dispatch(new RemoveGroup({ groupId: groupId }));
  }

  addGroup(): void {
    // this.router.navigate(['details/add']);
  }
}
