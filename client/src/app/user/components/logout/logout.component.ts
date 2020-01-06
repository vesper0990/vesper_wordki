import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../authorization/services/user.service/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.logout();
    this.router.navigate(['/dashboard']);
  }
}
