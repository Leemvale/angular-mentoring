import {
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Course } from '../../course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { SearchByPipe } from '../../../shared/pipes/search-by/search-by.pipe';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  coursesSubscription: Subscription;
  searchValue = '';

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.coursesService.getList(this.searchValue, true);
    this.coursesSubscription = this.coursesService.courses.subscribe((courses: Course[]) => {
      this.courses = courses;
    });
  }

  ngOnDestroy(): void {
    this.coursesSubscription.unsubscribe();
  }

  public searchCourses(searchValue: string): void {
    this.searchValue = searchValue;
    this.coursesService.getList(searchValue, true);
  }

  public onDelete(course: Course): void {
    this.dialog.open(ModalConfirmComponent, {
      data: {
        title: `Remove course ${course.name}`,
        confirm: () => this.coursesService.removeItem(course.id),
      },
    });
  }

  public onAddNewCourse(): void {
    this.router.navigate(['courses', 'new']);
  }

  public onLoadMore(): void {
    this.coursesService.getList(this.searchValue);
  }
}
