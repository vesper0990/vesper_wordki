import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../../models/group.model';

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

  constructor() { }

  ngOnInit() {
    this.wordsValue = this.group.visibleWordsCount + '/' + this.group.cardsCount;
  }

  editGroup(group: Group): void {
    this.edit.emit(group);
  }
}
