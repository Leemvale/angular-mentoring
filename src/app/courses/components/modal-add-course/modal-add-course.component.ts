import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';

import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../course.model';
import { DialogModes } from '../../../shared/enums';

@Component({
  selector: 'app-modal-add-course',
  templateUrl: './modal-add-course.component.html',
  styleUrls: ['./modal-add-course.component.scss'],
})
export class ModalAddCourseComponent implements OnInit {
  dialogTitle = '';
  course: Course = {} as Course;

  addCourseForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    duration: ['', Validators.required],
    authors: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<ModalAddCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.setDialogTitle();
    if (this.data.course) {
      this.course = Object.assign({}, this.data.course);
    }
  }

  public onSave(): void {
    if (this.data.mode === DialogModes.Create ) {
      this.coursesService.createCourse(this.course).subscribe(
        () => this.dialogRef.close(),
        () => console.log('Could not create course'),
      );
    }
    if (this.data.mode === DialogModes.Edit) {
      this.coursesService.updateItem(this.course).subscribe(
        () => this.dialogRef.close(),
        () => console.log('Could not update course'),
      );
    }
  }

  private setDialogTitle(): void {
    if (this.data.mode === DialogModes.Create) {
      this.dialogTitle = 'Add new course';
    }

    if (this.data.mode === DialogModes.Edit) {
      this.dialogTitle = 'Edit course';
    }
  }

}
