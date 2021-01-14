import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EditGroup } from '../share/components/edit-group-dialog/edit-group.model';
import { GroupsListService } from './services/groups-list/groups-list.service';
import { DialogMode } from '../share/components/edit-group-dialog/mode-dialog';
import { Title } from '@angular/platform-browser';
import { Group } from '../share/models/card-details';

@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  currentPage = 1;
  pagesCount = 10;

  groups$: Observable<Group[]>;
  isLoading$: Observable<boolean>;
  dialogVisibility$: Observable<boolean>;
  dialogMode$: Observable<DialogMode>;
  dialogGroup$: Observable<EditGroup>;

  constructor(private readonly service: GroupsListService,
    private readonly titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Wordki - Groups');
    this.service.loadGroups();
    this.groups$ = this.service.getList();
    this.isLoading$ = this.service.isLoading();
    this.dialogVisibility$ = this.service.isDialogVisible();
    this.dialogMode$ = this.service.getDialogMode();
    this.dialogGroup$ = this.service.getDialogGroup();
  }

  onEdit(group: Group): void {
    this.service.openDialogToEdit(group);
  }

  onEditSave(group: EditGroup): void {
    this.service.dialogSave(group);
  }

  onEditCancel(): void {
    this.service.dialogCancel();
  }

  onEditRemove(groupId: number): void {
    this.service.dialogRemove(groupId);
  }

  addGroup(): void {
    this.service.openDialogToAdd();
  }

  addGroupFromFile(): void {
    this.service.addGroupFromFile();
  }

  showDetails(group: Group): void {
    this.service.showDetails(group.id);
  }

  // currentPageChanged($event: number): void {
  //   console.log('currentpage', $event);
  // }
}
