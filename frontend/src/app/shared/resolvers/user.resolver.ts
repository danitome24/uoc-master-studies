import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserApiService } from '../services/backend-api/user-api.service';
import { UserStoreService } from '../services/user-store';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  constructor(private userApi: UserApiService, private userStore: UserStoreService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    const token = this.userStore.token();

    return this.userApi.getUserById(token.userId);
  }
}
