import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.apiUrl) && this.userService.isLogged()) {
      console.log(this.userService.user.token);
      const headers = req.headers.set('Authorization', `Bearer ${this.userService.user.token}`);
      req = req.clone({ headers });
    }
    return next.handle(req);
  }

}
