import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import { Course } from '../../course.model';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() delete: EventEmitter<Course> = new EventEmitter();

  defaultImageSrc = 'assets/images/course-default-img.jpg';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public onEdit(course: Course): void {
    this.router.navigate(['courses', course.id]);
  }

  public onDelete(course: Course): void {
    this.delete.emit(course);
  }
}
