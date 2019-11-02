import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userTag = 'user';
  user: User;

  constructor(private cookiesService: CookieService) {
    if (this.cookiesService.check(this.userTag)) {
      this.user = JSON.parse(this.cookiesService.get(this.userTag));
    }
  }

  public setUser(user: User): void {
    this.user = user;
    this.cookiesService.set(this.userTag, JSON.stringify(user));
  }

  public isLogged(): boolean {
    return this.user != null;
  }

  public logout(): void {
    this.setUser(null);
    this.cookiesService.delete(this.userTag);
  }
}

