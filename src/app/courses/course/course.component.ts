import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() delete: EventEmitter<string> = new EventEmitter();

  defaultImageSrc = 'assets/images/course-default-img.jpg';

  constructor() { }

  ngOnInit(): void {
  }

  public onEdit(): void {}

  public onDelete(courseId: string): void {
    this.delete.emit(courseId);
  }
}
