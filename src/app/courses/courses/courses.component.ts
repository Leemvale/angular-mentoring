import { Component, OnInit, Output } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getCourses();
  }

  private getCourses(): void {
    this.courses = [
      {
        id: '1',
        title: 'TestCourse1',
        creationDate: new Date(),
        duration: { minutes: 10, hours: 0 },
        description: 'Course description',
      },
      {
        id: '2',
        title: 'TestCourse2',
        creationDate: new Date(),
        duration: { minutes: 50, hours: 0 },
        description: 'Course description',
      },
      {
        id: '3',
        title: 'TestCourse3',
        creationDate: new Date(),
        duration: { minutes: 0, hours: 1 },
        description: 'Course description',
      },
      {
        id: '4',
        title: 'TestCourse4',
        creationDate: new Date(),
        duration: { minutes: 10, hours: 1 },
        description: 'Course description',
      },
      {
        id: '5',
        title: 'TestCourse5',
        creationDate: new Date(),
        duration: { minutes: 20, hours: 2 },
        description: 'Course description',
      },
    ];
  }

  public searchCourses(searchValue: string): void {
    console.log('%c%s', 'color: #bada55; font-weight: bold', searchValue);
  }

  public onDelete(courseId: string): void {
    console.log('%c%s', 'color: #bada55; font-weight: bold', `Delete course with id ${courseId}`);
  }
}
