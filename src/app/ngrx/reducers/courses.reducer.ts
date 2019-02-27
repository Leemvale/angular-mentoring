import { ActionWithPayload } from '../actions/action-with-payload.inteface';
import { ActionTypes } from '../actions/action-types.enum';
import { Course } from '../../courses/course.model';

export const initialState = [];

export function coursesReducer(state: Course[] = initialState, action: ActionWithPayload): Course[] {
  let newState;
  switch (action.type) {
    case ActionTypes.LoadCoursesSuccess:
      return action.payload;

    case ActionTypes.EditCourseSuccess:
      const courseIndex = state.findIndex((course: Course) => course.id === action.payload.id);
      newState = state.slice(0);
      newState[courseIndex] = action.payload;
      return newState;

    case ActionTypes.AddCourseSuccess:
      newState = state.slice(0);
      newState.push(action.payload);
      return newState;


    default:
      return state;
  }
}
