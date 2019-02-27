import { Action } from '@ngrx/store';
import { ActionTypes } from './action-types.enum';
import { User } from '../../core/user.model';

export class StartAppInitializer implements Action {
  public readonly type = ActionTypes.StartAppInitializer;
}

export class FinishAppInitializer implements Action {
  public readonly type = ActionTypes.FinishAppInitializer;
}

export class LoadUser implements Action {
  public readonly type = ActionTypes.LoadUser;
}

export class UserLoaded implements Action {
  public readonly type = ActionTypes.UserLoaded;
  constructor(public readonly payload: User) {}
}
