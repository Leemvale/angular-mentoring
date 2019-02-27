import { ActionTypes } from '../actions/action-types.enum';
import { User } from '../../core/user.model';
import { ActionWithPayload } from '../actions/action-with-payload.inteface';

export const initialState = undefined;

export function userReducer(state: User = initialState, action: ActionWithPayload): User {
  switch (action.type) {
    case ActionTypes.LoginSuccess:
      return {...state, ...action.payload};

    case ActionTypes.UserLoaded:
      return {...state, ...action.payload};

    case ActionTypes.LoginFailure:
      return null;

    default:
      return state;
  }
}
