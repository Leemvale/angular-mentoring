import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ActionTypes } from '../actions/action-types.enum';
import { CoursesService } from '../../courses/services/courses/courses.service';
import { Course } from '../../courses/course.model';
import {
  AddCourse, AddCourseFailure, AddCourseSuccess,
  DeleteCourse, DeleteCourseFailure, DeleteCourseSuccess,
  EditCourse, EditCourseFailure, EditCourseSuccess,
  LoadCourses, LoadCoursesFailure, LoadCoursesSuccess,
} from '../actions/courses.actions';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../store.model';



@Injectable()
export class CoursesEffects {

  @Effect()
  loadCourses = this.actions
    .pipe(
      ofType(ActionTypes.LoadCourses),
      switchMap((action: LoadCourses) => {
        const { textFragment, newSet } = action.payload;
        return this.coursesService.getCoursesEntities(textFragment, newSet).pipe(
          map((courses: Course[]) => new LoadCoursesSuccess(courses)),
          catchError(() => of(new LoadCoursesFailure())),
        );
      }));

  @Effect()
  editCourse = this.actions
    .pipe(
      ofType(ActionTypes.EditCourse),
      switchMap((action: EditCourse) => {
        return this.coursesService.updateItem(action.payload).pipe(
          tap(() => this.route.navigate(['courses'])),
          map(() => new EditCourseSuccess(action.payload)),
          catchError(() => of(new EditCourseFailure())),
        );
      }));

  @Effect()
  addCourse = this.actions
    .pipe(
      ofType(ActionTypes.AddCourse),
      switchMap((action: AddCourse) => {
        return this.coursesService.createCourse(action.payload).pipe(
          tap(() => this.route.navigate(['courses'])),
          map(() => new AddCourseSuccess(action.payload)),
          catchError(() => of(new AddCourseFailure())),
        );
      }));

  @Effect()
  deleteCourse = this.actions
    .pipe(
      ofType(ActionTypes.DeleteCourse),
      switchMap((action: DeleteCourse) => {
        return this.coursesService.removeItem(action.payload).pipe(
          map(() => new DeleteCourseSuccess()),
          catchError(() => of(new DeleteCourseFailure())),
          finalize(() => this.store.dispatch(new LoadCourses({textFragment: undefined, newSet: true}))),
        );
      }));
  constructor(
    private actions: Actions,
    private coursesService: CoursesService,
    private route: Router,
    private store: Store<StoreModel>,
  ) {}
}
