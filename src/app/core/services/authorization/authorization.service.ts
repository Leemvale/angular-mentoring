import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { User } from '../../user.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  private isLoginSubject = new BehaviorSubject<boolean>(false);
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

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
    this.isLoginSubject.next(false);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public getUserInfo(): Observable<User> {
    return this.http.post(`${this.baseUrl}/auth/userinfo`, {}).pipe(
      tap((user: User) => {
        this.isLoginSubject.next(true);
      }),
    );
  }


}
