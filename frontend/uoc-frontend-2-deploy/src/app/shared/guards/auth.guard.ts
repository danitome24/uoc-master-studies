import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.store.pipe(
            select(fromAuth.selectAuthIsLoggedIn),
            map(isLoggedIn => {
                if (isLoggedIn) {
                    return true;
                }

                this.router.navigate(['auth', 'signin']);
                return false;
            })
        );
    }
}
