import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { Course } from '../../course.model';
import { CoursesService } from '../../services/courses/courses.service';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component';
import { CompositeDisposable } from '../../../shared/helpers/CompositeDisposable';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  searchValue = new Subject<string>();
  currentSearchValue = '';

  anchor: CompositeDisposable = new CompositeDisposable();

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.coursesService.getList(null, true);
    this.anchor.add(
      this.coursesService.courses.subscribe((courses: Course[]) => {
        this.courses = courses;
      }),
    );

    this.anchor.add(
      this.coursesService.search(
        this.searchValue.pipe(
          debounceTime(500),
          filter((textFragment: string) => textFragment.length > 2 || textFragment === ''),
        ),
      )
        .subscribe(
      (searchValue: string) => this.currentSearchValue = searchValue,
    ));
  }

  ngOnDestroy(): void {
    this.anchor.unsubscribe();
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
    this.coursesService.getList(this.currentSearchValue);
  }

  public searchCourses(searchValue: string): void {
    this.searchValue.next(searchValue);
  }
}
