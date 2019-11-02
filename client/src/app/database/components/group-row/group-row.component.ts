import { Component, OnInit, Input } from '@angular/core';
import { GroupRowModel } from './group-row.model';

@Component({
  selector: 'app-group-row',
  templateUrl: './group-row.component.html',
  styleUrls: ['./group-row.component.scss']
})
export class GroupRowComponent implements OnInit {

  @Input() group: GroupRowModel;

  constructor() { }

  ngOnInit() {
  }

}
