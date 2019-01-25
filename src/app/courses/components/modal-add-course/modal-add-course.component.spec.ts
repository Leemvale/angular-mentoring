import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { of, throwError } from 'rxjs';

import { ModalAddCourseComponent } from './modal-add-course.component';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../course.model';
import { DialogModes } from '../../../shared/enums';



describe('ModalAddCourseComponent', () => {
  let component: ModalAddCourseComponent;
  let fixture: ComponentFixture<ModalAddCourseComponent>;

  const testCourse = {
    id: '1',
      title: 'Test Course1',
      creationDate: new Date('01/05/2019'),
      duration: 120,
      description: 'Course description',
      topRated: false,
  };
  const matDataStub = { mode: DialogModes.Create, course: testCourse };

  const coursesServiceStub = jasmine.createSpyObj('CoursesService', ['createCourse', 'updateItem']);
  coursesServiceStub.createCourse.and.returnValue(of({}));
  coursesServiceStub.updateItem.and.returnValue(of({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        ModalAddCourseComponent,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: { close: () => null } },
        { provide: MAT_DIALOG_DATA, useValue: matDataStub },
        { provide: CoursesService, useValue: coursesServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddCourseComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set course from matData', () => {
    fixture.detectChanges();
    expect(component.course).toEqual(testCourse);
  });

  it('should not set course from matData', () => {
    const data = TestBed.get(MAT_DIALOG_DATA);
    data.course = undefined;
    fixture.detectChanges();
    console.log(component.course);
    expect(component.course).toEqual({ title: undefined, description: undefined } as Course);
  });

  it('should call create course method', () => {
    const coursesService = TestBed.get(CoursesService);
    component.onSave();
    expect(coursesService.createCourse).toHaveBeenCalled();
  });

  it('should call update course method', () => {
    const data = TestBed.get(MAT_DIALOG_DATA);
    data.mode = DialogModes.Edit;
    const coursesService = TestBed.get(CoursesService);
    component.onSave();
    expect(coursesService.updateItem).toHaveBeenCalled();
  });

  it('should log error message if cannot create', () => {
    const coursesService = TestBed.get(CoursesService);
    coursesService.createCourse.and.returnValue(throwError(new Error('Test error')));
    const log = spyOn( console, 'log');
    component.onSave();
    expect(log).toHaveBeenCalledWith('Could not create course');
  });

  it('should log error message if cannot update', () => {
    const data = TestBed.get(MAT_DIALOG_DATA);
    data.mode = DialogModes.Edit;
    const coursesService = TestBed.get(CoursesService);
    coursesService.updateItem.and.returnValue(throwError(new Error('Test error')));
    const log = spyOn( console, 'log');
    component.onSave();
    expect(log).toHaveBeenCalledWith('Could not update course');
  });

});
