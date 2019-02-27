import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { Course } from '../../course.model';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component';
import { CompositeDisposable } from '../../../shared/helpers/CompositeDisposable';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { StoreModel } from '../../../store.model';
import { DeleteCourse, LoadCourses } from '../../../ngrx/actions/courses.actions';

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
    private dialog: MatDialog,
    private router: Router,
    private store: Store<StoreModel>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadCourses({ newSet: true }));
    this.anchor.add(
      this.store.pipe(select('courses')).subscribe((courses: Course[]) => {
        this.courses = courses;
      }),
    );

    this.anchor.add(
      this.searchValue.pipe(
        debounceTime(500),
        filter((textFragment: string) => textFragment.length > 2 || textFragment === ''),
        tap((textFragment: string) => this.store.dispatch(new LoadCourses({ textFragment }))),
      ).subscribe());
  }

  ngOnDestroy(): void {
    this.anchor.unsubscribe();
  }

  public onDelete(course: Course): void {
    this.dialog.open(ModalConfirmComponent, {
      data: {
        title: `Remove course ${course.name}`,
        confirm: () => this.store.dispatch(new DeleteCourse(course.id)),
      },
    });
  }

  public onAddNewCourse(): void {
    this.router.navigate(['courses', 'new']);
  }

  public onLoadMore(): void {
    this.store.dispatch(new LoadCourses({ textFragment: this.currentSearchValue }));
  }

  public searchCourses(searchValue: string): void {
    this.currentSearchValue = searchValue;
    this.searchValue.next(searchValue);
  }
}
