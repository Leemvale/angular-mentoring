import { Action } from '@ngrx/store';
import { Course } from '../../courses/course.model';
import { ActionTypes } from './action-types.enum';

export class LoadCourses implements Action {
  public readonly type = ActionTypes.LoadCourses;
  constructor(public readonly payload: { textFragment?: string, newSet?: boolean }) {}
}

export class LoadCoursesSuccess implements Action {
  public readonly type = ActionTypes.LoadCoursesSuccess;
  constructor(public readonly payload: Course[]) {}
}

export class LoadCoursesFailure implements Action {
  public readonly type = ActionTypes.LoadCoursesFailure;
  constructor() {}
}

export class EditCourse implements Action {
  public readonly type = ActionTypes.EditCourse;
  constructor(public readonly payload: Course) {}
}

export class EditCourseSuccess implements Action {
  public readonly type = ActionTypes.EditCourseSuccess;
  constructor(public readonly payload: Course) {}
}


export class EditCourseFailure implements Action {
  public readonly type = ActionTypes.EditCourseFailure;
  constructor() {}
}

export class AddCourse implements Action {
  public readonly type = ActionTypes.AddCourse;
  constructor(public readonly payload: Course) {}
}

export class AddCourseSuccess implements Action {
  public readonly type = ActionTypes.AddCourseSuccess;
  constructor(public readonly payload: Course) {}
}

export class AddCourseFailure implements Action {
  public readonly type = ActionTypes.AddCourseFailure;
  constructor() {
  }
}

export class DeleteCourse implements Action {
  public readonly type = ActionTypes.DeleteCourse;
  constructor(public readonly payload: number) {}
}

export class DeleteCourseSuccess implements Action {
  public readonly type = ActionTypes.DeleteCourseSuccess;
  constructor() {}
}

export class DeleteCourseFailure implements Action {
  public readonly type = ActionTypes.DeleteCourseFailure;
  constructor() {
  }
}
