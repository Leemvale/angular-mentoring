import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { User } from '../../user.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  private isLoginSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User>(undefined);
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  public get CurrentUser(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  public initialAuthCheck(): Observable<User | null> {
    if (localStorage.getItem('token')) {
      return this.getUserInfo();
    }
    return of(null);
  }

  public login(login: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, JSON.stringify({login, password})).pipe(
      concatMap((response: any) => {
        localStorage.setItem('token', response.token);
        return this.getUserInfo();
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(undefined);
    this.isLoginSubject.next(false);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public getUserInfo(): Observable<User> {
    return this.http.post(`${this.baseUrl}/auth/userinfo`, {}).pipe(
      tap((user: User) => {
        this.currentUserSubject.next(user);
        this.isLoginSubject.next(true);
      }),
      catchError((err: any) => {
        console.log(err);
        return of(null);
      }),
    );
  }


}
