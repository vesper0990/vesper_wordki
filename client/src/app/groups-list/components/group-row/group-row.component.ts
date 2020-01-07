import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Group } from '../../models/group.model';

@Component({
  selector: 'app-group-row',
  templateUrl: './group-row.component.html',
  styleUrls: ['./group-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupRowComponent implements OnInit {

  @Input() group: Group;

  constructor() { }

  ngOnInit() {
  }

}
