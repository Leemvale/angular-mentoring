import { Action, ActionReducer } from '@ngrx/store';
import { StoreModel } from '../../store.model';
import { ActionTypes } from '../actions/action-types.enum';


export function clearState(reducer:  ActionReducer<any>):  ActionReducer<any> {
  return function (state: StoreModel, action: Action):  ActionReducer<any> {

    if (action.type === ActionTypes.Logout) {
      localStorage.removeItem('token');
      state = undefined;
    }

    return reducer(state, action);
  };
}
