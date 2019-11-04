import { Injectable } from '@angular/core';
import { UserProvider } from '../user.provider/user.provider';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly cookieTag = 'wordki-usr-tag';

  private user: User;

  constructor(private userProvider: UserProvider,
    private cookiesService: CookieService) { }

  getToken(): string {
    if (!this.user) {
      return null;
    }
    return this.user.token;
  }

  isLogin(): boolean {
    return this.user != null;
  }

  loginFromCookie() {
    if (!this.cookiesService.check(this.cookieTag)) {
      return;
    }
    const cookieValue = this.cookiesService.get(this.cookieTag);
    const cookieObj = JSON.parse(cookieValue);
    const user = new User(cookieObj.name, cookieObj.token);
    this.user = user;
    this.refresh();
  }

  login(): void {

  }

  logout(): void {
    this.user = null;
    if (this.cookiesService.check(this.cookieTag)) {
      this.cookiesService.delete(this.cookieTag);
    }
  }

  refresh(): void {
    if (!this.user) {
      return;
    }
    this.userProvider.refreshToken(this.user.token).subscribe((token: string) => this.user.token = token);
    this.saveCookie();
  }

  private saveCookie(): void {
    this.cookiesService.set(this.cookieTag, JSON.stringify(this.user));
  }

}
