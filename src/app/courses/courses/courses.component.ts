import { Component, OnInit, Output } from '@angular/core';
import { Course } from '../course.model';
import { SearchByPipe } from '../../shared/pipes/search-by/search-by.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  allCourses: Course[] = [];
  courses: Course[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getCourses();
  }

  private getCourses(): void {
    this.allCourses = [
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

    this.courses = this.allCourses.slice();
  }

  public searchCourses(searchValue: string): void {
    this.courses = new SearchByPipe().transform(this.allCourses, 'title', searchValue);
  }

  public onDelete(courseId: string): void {
    console.log('%c%s', 'color: #bada55; font-weight: bold', `Delete course with id ${courseId}`);
  }
}
