import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user.service/user.service';
import { Injectable } from '@angular/core';
@Injectable()
export class LogoutGuardService implements CanActivate {
    constructor(private userService: UserService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return !this.userService.isLogin();
    }
}
