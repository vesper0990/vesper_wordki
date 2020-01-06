import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './authorization/services/user.service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private userServiceSub: Subscription;

  isLogin: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userServiceSub = this.userService.subscribe().subscribe((userExists: boolean) => this.isLogin = userExists);
    this.login();
  }

  ngOnDestroy(): void {
    this.userServiceSub.unsubscribe();
  }

  private login(): void {
    this.userService.loginFromCookie();
  }
}
