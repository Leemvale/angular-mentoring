import { Action } from '@ngrx/store';
import { User } from '../../core/user.model';
import { ActionTypes } from './action-types.enum';

export class Login implements Action {
  readonly type = ActionTypes.Login;
  constructor(public payload: { email: string, password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = ActionTypes.LoginSuccess;
  constructor(public payload: User) {}
}

export class LoginFailure implements Action {
  readonly type = ActionTypes.LoginFailure;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.Logout;
}
