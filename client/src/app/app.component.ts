import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './authorization/services/user.service/user.service';
import { Subscription } from 'rxjs';
import { UserProvider, UserProviderBase } from './user/services/user.provider/user.provider';
import { UserSettings } from './authorization/services/user.service/user-settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private userServiceSub: Subscription;

  isLogin: boolean;

  constructor(private userService: UserService,
    private userProvider: UserProviderBase) { }

  ngOnInit(): void {
    this.userServiceSub = this.userService.subscribe().subscribe((userExists: boolean) => {
      this.isLogin = userExists;
      if (userExists) {
      }
    });
    this.login();
  }

  ngOnDestroy(): void {
    this.userServiceSub.unsubscribe();
  }

  private login(): void {
    this.userService.loginFromCookie();
  }

  private getUserSettings(): void {
    this.userProvider.getUserSettings().subscribe((settings: UserSettings) => {
      this.userService.userSettings = settings;
    });
  }
}
