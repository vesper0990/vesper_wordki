import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/share/models/card-details';

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
    this.wordsValue = this.group.cardsCount.toString();
  }

  editGroup(group: Group): void {
    this.edit.emit(group);
  }
}
