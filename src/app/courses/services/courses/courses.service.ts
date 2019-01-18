import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Course } from '../../course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private _courses: BehaviorSubject<Course[]>;
  private dataStore: {
    courses: Course[],
  };

  private mockCourses = [
    {
      id: '1',
      title: 'Test Course1',
      creationDate: new Date('01/05/2019'),
      duration: 120,
      description: 'Course description',
      topRated: false,
    },
    {
      id: '2',
      title: 'Test Course2',
      creationDate: new Date('01/05/2018'),
      duration: 10,
      description: 'Course description',
      topRated: false,
    },
    {
      id: '3',
      title: 'Test Course3',
      creationDate: new Date(),
      duration: 140,
      description: 'Course description',
      topRated: true,
    },
    {
      id: '4',
      title: 'Test Course4',
      creationDate: new Date(),
      duration: 22,
      description: 'Course description',
      topRated: false,
    },
    {
      id: '5',
      title: 'Test Course5',
      creationDate: new Date(),
      duration: 185,
      description: 'Course description',
      topRated: true,
    },
  ];

  constructor() {
    this.dataStore = { courses: [] };
    this._courses = new BehaviorSubject([]);
  }

  get courses(): Observable<Course[]> {
    return this._courses.asObservable();
  }

  public getList(): void {
    this.getMockCourses().subscribe((courses: Course[]) => {
      this.dataStore.courses = courses;
      this._courses.next(Object.assign({}, this.dataStore).courses);
    }, (error: Error) => console.log('Could not load courses.'));
  }

  public createCourse(newCourse: Course): void {
    this.courseMockResponse(newCourse).subscribe((createdCourse: Course) => {
      this.dataStore.courses.push(createdCourse);
      this._courses.next(Object.assign({}, this.dataStore).courses);
    }, (error: Error) => console.log('Could not create course.'));
  }

  public getItemById(id: string): Observable<Course> {
    return of(this.mockCourses.find((item: Course) => item.id === id));
  }

  public updateItem(courseToUpdate: Course): void {
    this.courseMockResponse(courseToUpdate).subscribe((updatedCourse: Course) => {
      this.dataStore.courses.forEach((course: Course, idx: number) => {
        if (course.id === updatedCourse.id) {
          this.dataStore.courses[idx] = updatedCourse;
        }
      });

      this._courses.next(Object.assign({}, this.dataStore).courses);
    }, (error: Error) => console.log('Could not update course.'));
  }

  public removeItem(id: string): void {
    of(this.mockCourses.find((item: Course) => item.id === id)).subscribe((deletedCourse: Course) => {
      this.dataStore.courses.forEach((course: Course, idx: number) => {
        if (course.id === deletedCourse.id) {
          this.dataStore.courses.splice(idx, 1);
        }
      });

      this._courses.next(Object.assign({}, this.dataStore).courses);
    }, (error: Error) => console.log('Could not delete course.'));
  }

  public getStore(): any {
    return Object.assign({}, this.dataStore);
  }

  public getMockCourses(): Observable<Course[]> {
    return of(this.mockCourses);
  }

  public courseMockResponse(course: Course): Observable<Course> {
    return of(course);
  }
}
