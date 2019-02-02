import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';

import { Course } from '../../course.model';
import { SearchByPipe } from '../../../shared/pipes/search-by/search-by.pipe';
import { CoursesService } from '../../services/courses/courses.service';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { ModalAddCourseComponent } from '../modal-add-course/modal-add-course.component';
import { DialogModes } from '../../../shared/enums';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  allCourses: Course[] = [];
  courses: Course[] = [];
  coursesSubscription: Subscription;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  ngOnDestroy(): void {
    this.coursesSubscription.unsubscribe();
  }

  private getCourses(): void {
    this.coursesService.getList();
    this.coursesSubscription = this.coursesService.courses.subscribe((courses: Course[]) => {
      this.allCourses = courses;
      this.courses =  courses.slice();
    });
  }

  public searchCourses(searchValue: string): void {
    this.courses = new SearchByPipe().transform(this.allCourses, 'title', searchValue);
  }

  public onDelete(course: Course): void {
    this.dialog.open(ModalConfirmComponent, {
      data: {
        title: `Remove course ${course.title}`,
        confirm: () => this.coursesService.removeItem(course.id),
      },
    });
  }

  public onAddNewCourse(): void {
    this.dialog.open(ModalAddCourseComponent, {
      width: '70%',
      data: {
        mode: DialogModes.Create,
      },
    });
  }

  public onEdit(course: Course): void {
    this.dialog.open(ModalAddCourseComponent, {
      width: '70%',
      data: {
        mode: DialogModes.Edit,
        course: course,
      },
    });
  }
}
