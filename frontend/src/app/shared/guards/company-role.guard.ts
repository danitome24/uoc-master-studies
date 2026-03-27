import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store';

@Injectable({
  providedIn: 'root'
})
export class CompanyRoleGuard implements CanActivate {
  private roleCompany: string = 'company';

  constructor(private userStore: UserStoreService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userStore.token().hasCompanyRole()) {
      return true;
    }
    this.router.navigate(['admin', 'dashboard']);
    console.log('CompanyRoleGuard#canActivate not permission to access page');
    return false;
  }
}
