import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { UserService } from '../user.service/user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LogoutGuardService implements CanActivate {

    constructor(private readonly userService: UserService,
        private readonly router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        return this.userService.isLogin() ? this.router.parseUrl('/login') : true;
    }
}
