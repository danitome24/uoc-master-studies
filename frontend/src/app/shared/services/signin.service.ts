import { Injectable } from '@angular/core';
import { UserApiService } from './backend-api/user-api.service';
import { User } from '../models/user.model';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserStoreService } from './user-store';
import { Token } from '../models/token.model';

@Injectable()
export class SigninService {

  constructor(private userApiService: UserApiService, private userStore: UserStoreService) {
  }

  public signIn(email: string, password: string): Observable<User | Observable<never>> {
    return this.userApiService.getUserByEmail(email)
      .pipe(
        map((resp: User) => {
            if (resp.password === password) {
              this.userStore.setToken(new Token(resp.id, resp.roles));
              return resp;
            } else {
              throw throwError(new Error('User password does not match'));
            }
          }
        )
      );
  }
}
