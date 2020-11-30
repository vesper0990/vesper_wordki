import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-row',
  templateUrl: './group-row.component.html',
  styleUrls: ['./group-row.component.scss']
})
export class GroupRowComponent implements OnInit {

  @Input() group: Group;
  @Output() lessonStart: EventEmitter<Group> = new EventEmitter();
  @Output() edit: EventEmitter<Group> = new EventEmitter();

  wordsValue: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.wordsValue = this.group.visibleWordsCount + '/' + this.group.cardsCount;
  }

  startLesson(group: Group): void {
    this.lessonStart.emit(group);
    this.router.navigate(['lesson/group', group.id]);
  }

  editGroup(group: Group): void {
    this.edit.emit(group);
  }

  openGroup(group: Group): void {
    this.router.navigate(['details', group.id]);
  }
}
