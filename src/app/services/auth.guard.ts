import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private _authservice: AuthService, private route: Router) {}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _router: RouterStateSnapshot
  ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this._authservice.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          if (
            (user.roleId !== 2 && _router.url === '/lawyer') ||
            (user.roleId !== 3 && _router.url === '/admin')
          ) {
            return this.route.createUrlTree(['/myorders']);
          }
          return true;
        }
        return this.route.createUrlTree(['/signin']);
      })
    );
  }
}
