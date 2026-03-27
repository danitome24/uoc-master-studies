import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, flatMap, map, tap } from 'rxjs/operators';
import { AppSettings } from '../../app.settings';
import { Language } from '../../models/language.model';


@Injectable()
export class UserApiService {

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) {
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User[]>(AppSettings.API_ENDPOINT_USER).pipe(
      flatMap((response) => response),
      filter(user => user.email === email)
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(AppSettings.API_ENDPOINT_USER + '/' + userId).pipe(
      tap(_ => console.log(`fetched user id=${userId}`))
    );
  }

  removeStudyFromUser(user: User, studyId: number) {
    user.studies = user.studies.filter(study => study.uid !== studyId);

    return this.http.delete(AppSettings.API_ENDPOINT_USER + '/' + user.id);
  }

  updateUserStudy(user: User, study) {
    const index = user.studies.findIndex(studyRow => studyRow.uid === study.uid);
    user.studies.splice(index, 1, study);

    return this.http.put(AppSettings.API_ENDPOINT_USER, user);
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put(AppSettings.API_ENDPOINT_USER, user, this.httpOptions).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.log('errooorr');
    return throwError(error);
  }

  updateLanguage(user: User, language: Language) {
    const index = user.languages.findIndex(langRow => langRow.uid === language.uid);
    user.languages.splice(index, 1, language);

    return this.http.put(AppSettings.API_ENDPOINT_USER, user);
  }
}
