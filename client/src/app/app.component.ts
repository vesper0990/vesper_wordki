import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './authorization/services/user.service/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLogin$: Observable<boolean>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLogin$ = this.userService.subscribe();
    this.login();
  }

  ngOnDestroy(): void {
  }

  private login(): void {
    this.userService.loginFromCookie();
  }
}
