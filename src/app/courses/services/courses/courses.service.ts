import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { Course } from '../../course.model';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseUrl = environment.baseUrl;
  private _courses: BehaviorSubject<Course[]>;
  private dataStore: {
    courses: Course[],
  };

  constructor(
    private http: HttpClient,
  ) {
    this.dataStore = { courses: [] };
    this._courses = new BehaviorSubject([]);
  }

  get courses(): Observable<Course[]> {
    return this._courses.asObservable();
  }

  public getList(textFragment?: string, newSet?: boolean): void {
    const onePageItems = 5;
    const numberOfItems = newSet ? onePageItems : this.dataStore.courses.length + onePageItems;
    const textSearch = textFragment ? `&textFragment=${textFragment}` : '';
    this.http.get<Course[]>(`${this.baseUrl}/courses?start=0&count=${numberOfItems}` + textSearch)
      .subscribe(
        (courses: Course[]) => {
        this.dataStore.courses = courses;
        this._courses.next(Object.assign({}, this.dataStore).courses);
      },
        (error: Error) => console.log('Could not load courses.'));
  }

  public createCourse(newCourse: Course): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/courses`, newCourse).pipe(
      tap(() => {
        this.getList(undefined, true);
      }),
    );
  }

  public getItemById(id: number): Observable<Course> {
    return of(this.dataStore.courses.find((item: Course) => item.id === id));
  }

  public updateItem(courseToUpdate: Course): Observable<Course> {
    return this.courseMockResponse(courseToUpdate).pipe(
      tap((updatedCourse: Course) => {
        this.dataStore.courses.forEach((course: Course, idx: number) => {
          if (course.id === updatedCourse.id) {
            this.dataStore.courses[idx] = updatedCourse;
          }
        });
        this._courses.next(Object.assign({}, this.dataStore).courses);
      }));
  }

  public removeItem(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/courses/${id}`).subscribe(() => {
      this.getList(undefined, true);
    }, (error: Error) => console.log('Could not delete course.'));
  }

  public getStore(): any {
    return Object.assign({}, { courses:  [...this.dataStore.courses]});
  }

  public courseMockResponse(course: Course): Observable<Course> {
    return of(course);
  }
}
