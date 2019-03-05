import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { AuthorizationService } from '../../core/services/authorization/authorization.service';
import { Login, LoginFailure, LoginSuccess } from '../actions/auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from '../../core/user.model';
import { of } from 'rxjs';
import { ActionTypes } from '../actions/action-types.enum';
import { UserLoaded } from '../actions/app.actions';

@Injectable()
export class LoginEffects {

  @Effect()
  login = this.actions
    .pipe(
      ofType(ActionTypes.Login),
      switchMap((action: Login) => {
        const { email, password } = action.payload;
        return this.authService.login(email, password).pipe(
          tap(
            () => {
              console.log('Logged in!');
              this.router.navigate(['']);
            },
          ),
          map((user: User) => new LoginSuccess(user)),
          catchError((error: any) => of(new LoginFailure(error))),
        );
    }));

  @Effect()
  loadUser = this.actions
    .pipe(
      ofType(ActionTypes.LoadUser),
      switchMap(() => {
        return this.authService.getUserInfo().pipe(
          map((user: User) => new UserLoaded(user)),
          catchError((error: any) => of(new LoginFailure(error))),
        );
      }));

  constructor(
    private actions: Actions,
    private authService: AuthorizationService,
    private router: Router,
  ) {}
}
