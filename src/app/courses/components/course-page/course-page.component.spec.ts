import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { of, throwError } from 'rxjs';

import { CoursePageComponent } from './course-page.component';
import { DialogModes } from '../../../shared/enums';
import { CoursesService } from '../../services/courses/courses.service';

describe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  const testCourse = {
    id: '1',
    title: 'Test Course1',
    date: new Date('01/05/2019'),
    duration: 120,
    description: 'Course description',
    topRated: false,
  };

  const coursesServiceStub = jasmine.createSpyObj('CoursesService', ['createCourse', 'updateItem', 'getItemById']);
  coursesServiceStub.createCourse.and.returnValue(of({}));
  coursesServiceStub.updateItem.and.returnValue(of({}));
  coursesServiceStub.getItemById.and.returnValue(of(testCourse));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'courses', component: CoursePageComponent },
        ]),
      ],
      declarations: [
        CoursePageComponent,
      ],
      providers: [
        FormBuilder,
        { provide: CoursesService, useValue: coursesServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ mode: DialogModes.Edit }),
            params: of({ id: '1'}),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call create course method', () => {
    component.dialogMode = DialogModes.Create;
    const coursesService = TestBed.get(CoursesService);
    component.onSave();
    expect(coursesService.createCourse).toHaveBeenCalled();
  });

  it('should call update course method', () => {
    component.dialogMode = DialogModes.Edit;
    const coursesService = TestBed.get(CoursesService);
    component.onSave();
    expect(coursesService.updateItem).toHaveBeenCalled();
  });

  it('should log error message if cannot create', () => {
    component.dialogMode = DialogModes.Create;
    const coursesService = TestBed.get(CoursesService);
    coursesService.createCourse.and.returnValue(throwError(new Error('Test error')));
    const log = spyOn( console, 'log');
    component.onSave();
    expect(log).toHaveBeenCalledWith('Could not create course');
  });

  it('should log error message if cannot update', () => {
    component.dialogMode = DialogModes.Edit;
    const coursesService = TestBed.get(CoursesService);
    coursesService.updateItem.and.returnValue(throwError(new Error('Test error')));
    const log = spyOn( console, 'log');
    component.onSave();
    expect(log).toHaveBeenCalledWith('Could not update course');
  });

  it('should set edit title', () => {
    fixture.detectChanges();
    expect(component.dialogTitle).toBe('Edit course');
  });

  it('should set create title', () => {
    const activatedRoute = TestBed.get(ActivatedRoute);
    activatedRoute.data = of({ mode: DialogModes.Create });
    fixture.detectChanges();
    expect(component.dialogTitle).toBe('Add new course');
  });
});
