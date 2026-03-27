import { Injectable } from '@angular/core';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private tokenObject: Token = null;

  public setToken(token: Token | null) {
    if (token === null) {
      return;
    }
    localStorage.setItem('uoc-alumni', token.toString());
  }

  public token(): Token {
    this.tokenObject = JSON.parse(localStorage.getItem('uoc-alumni')) as Token;
    return new Token(this.tokenObject.userId, this.tokenObject.roles);
  }

  public logout() {
    this.setToken(null);
    localStorage.clear();
  }

  isLoggedIn() {
    return this.token != null;
  }
}
