import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../course.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services/courses/courses.service';
import { DialogModes } from '../../../shared/enums';
import { CompositeDisposable } from '../../../shared/helpers/CompositeDisposable';


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
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    duration: ['', Validators.required],
    authors: ['', Validators.required],
  });

  constructor (
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit(): void {
    const routerDataSubscription = this.activatedRoute.data.subscribe((data: any) => {
      this.dialogMode = data.mode;
      this.setDialogTitle(this.dialogMode);

      if (this.dialogMode === DialogModes.Edit) {
        const routerParamsSubscription = this.activatedRoute.params.subscribe((params: any) => {
          const courseSubscription = this.coursesService.getItemById(params['id']).subscribe((course: Course) => this.course = course);
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
      const createSubscription = this.coursesService.createCourse(this.course).subscribe(
        () => this.route.navigate(['courses']),
        () => console.log('Could not create course'),
      );
      this.anchor.add(createSubscription);
    }

    if (this.dialogMode === DialogModes.Edit) {
      const updateSubscription = this.coursesService.updateItem(this.course).subscribe(
        () => this.route.navigate(['courses']),
        () => console.log('Could not update course'),
      );
      this.anchor.add(updateSubscription);
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
