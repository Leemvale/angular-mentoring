import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../course.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../services/courses/courses.service';
import { DialogModes } from '../../../shared/enums';
import { CompositeDisposable } from '../../../shared/helpers/CompositeDisposable';
import { StoreModel } from '../../../store.model';
import { Store } from '@ngrx/store';
import { AddCourse, EditCourse } from '../../../ngrx/actions/courses.actions';
import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Person } from '../../../shared/person.model';
import { AuthorsService } from '../../services/authors/authors.service';


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
  searchedAuthors: Person[] = [];

  addCourseForm = this.fb.group({
    name: ['', Validators.compose([
      Validators.required,
      Validators.maxLength(50),
    ])],
    description: ['', Validators.compose([
      Validators.required,
      Validators.maxLength(500),
    ])],
    date: ['', Validators.required],
    length: ['', Validators.required],
    authors: ['', Validators.required],
  });

  searchValue = new Subject<string>();

  get name(): AbstractControl {
    return this.addCourseForm.get('name');
  }

  get description(): AbstractControl {
    return this.addCourseForm.get('description');
  }

  get date(): AbstractControl {
    return this.addCourseForm.get('date');
  }

  get length(): AbstractControl {
    return this.addCourseForm.get('length');
  }

  get authors(): AbstractControl {
    return this.addCourseForm.get('authors');
  }
  constructor (
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private authorsService: AuthorsService,
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
            .subscribe((course: Course) => {
              this.course = course;
              this.addCourseForm.patchValue(course);
              console.log(this.addCourseForm);
            });
          this.anchor.add(courseSubscription);
        });

        this.anchor.add(routerParamsSubscription);
      }
    });

    this.anchor.add(routerDataSubscription);

    this.anchor.add(
      this.searchValue.pipe(
        switchMap((value: string) => this.authorsService.loadAuthors(value)),
      ).subscribe((authors: Person[]) => this.searchedAuthors = authors));
  }
  ngOnDestroy(): void {
    this.anchor.unsubscribe();
  }

  public onSave(): void {
    const course = {...this.course, ...this.addCourseForm.value};
    if (this.dialogMode === DialogModes.Create ) {
      this.store.dispatch(new AddCourse(course));
    }

    if (this.dialogMode === DialogModes.Edit) {
      this.store.dispatch(new EditCourse(course));
    }
  }

  public onCancel(): void {
    this.route.navigate(['/courses']);
  }

  public onSearch(searchValue: string): void {
    this.searchValue.next(searchValue);
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
