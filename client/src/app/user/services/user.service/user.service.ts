import { Injectable } from '@angular/core';
import { UserProviderBase } from '../user.provider/user.provider';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../model/user.model';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly cookieTag = 'wordki-usr-tag';

  private token: string;
  private subject: BehaviorSubject<boolean>;

  constructor(private userProvider: UserProviderBase,
    private cookiesService: CookieService) {
    this.subject = new BehaviorSubject<boolean>(false);
  }

  subscribe(): Observable<boolean> {
    return this.subject.asObservable();
  }

  getToken(): string {
    return this.token;
  }

  isLogin(): boolean {
    return this.token != null;
  }

  loginFromCookie(): void {
    if (!this.cookiesService.check(this.cookieTag)) {
      return;
    }
    const cookieValue = this.cookiesService.get(this.cookieTag);
    this.token = JSON.parse(cookieValue);
    this.sendToSubscribers();
  }

  logout(): void {
    this.token = null;
    if (this.cookiesService.check(this.cookieTag)) {
      this.cookiesService.delete(this.cookieTag);
    }
    this.sendToSubscribers();
  }

  refresh(newToken: string): void {
    if (newToken.length === 0) {
      return;
    }
    this.token = newToken;
    this.saveCookie();
    this.sendToSubscribers();
  }

  private sendToSubscribers(): void {
    this.subject.next(this.token !== null);
  }

  private saveCookie(): void {
    this.cookiesService.set(this.cookieTag, JSON.stringify(this.token));
  }

}