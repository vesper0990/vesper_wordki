import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Group } from '../../models/group.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-row',
  templateUrl: './group-row.component.html',
  styleUrls: ['./group-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupRowComponent implements OnInit {

  @Input() group: Group;

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  startLesson(groupId: number): void {
    this.router.navigate(['lesson/group', groupId]);
  }

  openGroup(groupId: number): void {
    this.router.navigate(['details', groupId]);
  }
}
