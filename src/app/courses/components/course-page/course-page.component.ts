import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../course.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services/courses/courses.service';
import { DialogModes } from '../../../shared/enums';
import { CompositeDisposable } from '../../../shared/helpers/CompositeDisposable';
import { StoreModel } from '../../../store.model';
import { Store } from '@ngrx/store';
import { AddCourse, EditCourse } from '../../../ngrx/actions/courses.actions';


@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {

  anchor: CompositeDisposable = new CompositeDisposable();
  dialogTitle = '';
  dialogMode: string;
  course: Course = {} as Course;

  addCourseForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    length: ['', Validators.required],
    authors: ['', Validators.required],
  });

  constructor (
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private store: Store <StoreModel>,
  ) { }

  ngOnInit(): void {
    const routerDataSubscription = this.activatedRoute.data.subscribe((data: any) => {
      this.dialogMode = data.mode;
      this.setDialogTitle(this.dialogMode);

      if (this.dialogMode === DialogModes.Edit) {
        const routerParamsSubscription = this.activatedRoute.params.subscribe((params: any) => {
          const id = Number.parseInt(params['id'], 10);
          const courseSubscription = this.coursesService.getItemById(id)
            .subscribe((course: Course) => this.course = course);
          this.anchor.add(courseSubscription);
        });

        this.anchor.add(routerParamsSubscription);
      }
    });

    this.anchor.add(routerDataSubscription);
  }

  ngOnDestroy(): void {
    this.anchor.unsubscribe();
  }

  public onSave(): void {
    if (this.dialogMode === DialogModes.Create ) {
      this.store.dispatch(new AddCourse(this.course));
    }

    if (this.dialogMode === DialogModes.Edit) {
      this.store.dispatch(new EditCourse(this.course));
    }
  }

  public onCancel(): void {
    this.route.navigate(['/courses']);
  }

  private setDialogTitle(mode: string): void {
    if (mode === DialogModes.Create) {
      this.dialogTitle = 'Add new course';
    }

    if (mode === DialogModes.Edit) {
      this.dialogTitle = 'Edit course';
    }
  }

}
