import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '@app/common/models/Group';
import { GroupProviderBase, WordSenderBase, WordProviderBase } from '@app/common/services';
import { LessonSettingsService } from '@app/common/services/lesson-settings.service';
import { Word } from '@app/common/models/model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  group: Group;
  addWordModalVisibility: boolean;

  constructor(private acitvatedRoute: ActivatedRoute,
    private router: Router,
    private groupProvider: GroupProviderBase,
    private wordProvider: WordProviderBase,
    private lessonSettignsService: LessonSettingsService) { }

  ngOnInit() {
    this.acitvatedRoute.params.subscribe(params => {
      this.loadGroup(params['groupId']);
    });
  }

  public addWord(): void {
    this.addWordModalVisibility = true;
  }

  public lesson(): void {
    this.lessonSettignsService.settings.group = this.group;
    this.router.navigate(['../lesson/settings']);
  }

  private loadGroup(groupId: string): void {
    this.groupProvider.getGroupDetails(groupId).subscribe(
      (group: Group) => {
        this.group = group;
      },
      (error: any) => {
        console.log(`Error in loadGroup: ${error}`);
      }
    );
  }

  success(wordId: string) {
    this.wordProvider.getWord(wordId).subscribe(
      (word: Word) => {
        this.group.words.push(word);
      },
      (error: any) => {
        console.error(error);
      }
    )
  }
}
