import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { tap } from 'rxjs/operators';
import { User } from '../../user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  private isLoginSubject = new BehaviorSubject<boolean>(false);

  mockResponse: any = {
    user: {
      id: '1',
      firstName: 'My',
      lastName: 'User',
    },
    token: 'JWT',
  };

  constructor() { }

  public login(name: string, password: string): Observable<any> {
    return this.getMockResponse().pipe(
      tap((response: any) => {
        localStorage.setItem('token', JSON.stringify(response.token));
        localStorage.setItem('user', JSON.stringify(response.user));
        this.isLoginSubject.next(true);
        return response;
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public getUserInfo(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public getMockResponse(): Observable<any> {
    return of(this.mockResponse);
  }
}
