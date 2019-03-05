import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { Course } from '../../course.model';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
    this.getCoursesEntities(textFragment, newSet).subscribe(
       null,
        (error: Error) => console.log('Could not load courses.'));
  }

  public getCoursesEntities(textFragment?: string, newSet?: boolean): Observable<Course[]> {
    const onePageItems = 5;
    const numberOfItems = newSet ? onePageItems : this.dataStore.courses.length + onePageItems;
    const textSearch = textFragment ? `&textFragment=${textFragment}` : '';
    return this.http.get<Course[]>(`${this.baseUrl}/courses?start=0&count=${numberOfItems}` + textSearch).pipe(
      tap((courses: Course[]) => {
        this.dataStore.courses = courses;
        this._courses.next(Object.assign({}, this.dataStore).courses);
      }),
    );
  }

  public createCourse(newCourse: Course): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/courses`, newCourse);
  }

  public getItemById(id: number): Observable<Course> {
    return of(this.dataStore.courses.find((item: Course) => item.id === id));
  }

  public updateItem(courseToUpdate: Course): Observable<void> {
    return  this.http.put<void>(`${this.baseUrl}/courses/${courseToUpdate.id}`, courseToUpdate);
  }

  public removeItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/courses/${id}`);
  }

  public getStore(): any {
    return Object.assign({}, { courses:  [...this.dataStore.courses]});
  }
}
