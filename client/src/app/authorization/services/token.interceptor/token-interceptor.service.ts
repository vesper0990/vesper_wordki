import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  readonly authorizationHeader = 'Authorization';

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    if (!token || token.length === 0) {
      return next.handle(req);
    }
    if (!req.headers.has(this.authorizationHeader)) {
      req = req.clone({ headers: req.headers.set(this.authorizationHeader, `Bearer ${token}`) });
    }

    return next.handle(req);
  }
}
