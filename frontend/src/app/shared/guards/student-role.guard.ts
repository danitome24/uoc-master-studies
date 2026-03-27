import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStoreService } from '../services/user-store';

@Injectable({
  providedIn: 'root'
})
export class StudentRoleGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userStore.token().hasStudentRole()) {
      return true;
    }
    this.router.navigate(['admin', 'dashboard']);
    console.log('StudentRoleGuard#canActivate not permission to access page');
    return false;
  }
}
