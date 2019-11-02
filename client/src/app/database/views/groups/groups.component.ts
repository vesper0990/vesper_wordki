import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupItem } from '@app/common/models/model';
import { GroupProviderBase, LanguagesProvider } from '@app/common/services';
import { GroupRowModel } from '../../components/group-row/group-row.model';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit, OnDestroy {

  groups: GroupRowModel[];
  addGroupModalVisibility: boolean;
  modalMode: string;

  constructor(private groupProvider: GroupProviderBase) {
    this.groups = [];
  }

  ngOnInit(): void {
    this.loadGroups();
  }

  ngOnDestroy(): void {
  }

  addClick(): void {
    this.modalMode = 'add';
    this.addGroupModalVisibility = true;
  }

  private loadGroups(): void {
    this.groupProvider.getGroupsItems().subscribe(
      (groups: GroupItem[]) => {
        for (let i = 0; i < groups.length; i++) {
          this.groups.push(<GroupRowModel>{
            id: groups[i].id,
            name: groups[i].name,
            language1: LanguagesProvider.languages[groups[i].language1],
            language2: LanguagesProvider.languages[groups[i].language2],
            creationDate: groups[i].creationDate,
            lastLessonDate: groups[i].lastLessonDate,
            wordsCount: groups[i].wordsCount,
            resultsCount: groups[i].resultsCount,
          });
        }
      },
      (error: any) => {
        console.log(`Error in load groups: ${error}`);
      }
    );
  }

  public isSuccess(groupId: string | boolean): void {
    if (typeof groupId === "boolean") {
      return;
    }
    this.groupProvider.getGroup(groupId).subscribe(
      (group: GroupItem) => {
        this.groups.push(<GroupRowModel>{
          id: group.id,
          name: group.name,
          language1: LanguagesProvider.languages[group.language1],
          language2: LanguagesProvider.languages[group.language2],
          creationDate: group.creationDate,
          lastLessonDate: group.lastLessonDate,
          wordsCount: group.wordsCount,
          resultsCount: group.resultsCount,
        });
      },
      (error: any) => {
        console.log(`Error in load groups: ${error}`);
      }
    );
  }
}
