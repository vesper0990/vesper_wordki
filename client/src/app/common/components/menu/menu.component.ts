import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '@app/common/services/user/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  private routerSubscription: Subscription;

  public isVisible: boolean;

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit() {
    this.isVisible = this.router.url.indexOf('wordki') >= 0;
    this.routerSubscription = this.router.events.subscribe(() => {
      this.isVisible = this.router.url.indexOf('wordki') >= 0;
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['wordki']);
  }

}
