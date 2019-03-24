import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { CoursePageComponent } from './course-page.component';
import { DialogModes } from '../../../shared/enums';
import { CoursesService } from '../../services/courses/courses.service';
import { Store } from '@ngrx/store';
import { AuthorsService } from '../../services/authors/authors.service';
import { Course } from '../../course.model';
import { DateInputComponent } from '../../../shared/components/date-input/date-input.component';
import { DurationInputComponent } from '../../../shared/components/duration-input/duration-input.component';
import { PeopleInputComponent } from '../../../shared/components/people-input/people-input.component';
import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';
import { MatAutocompleteModule } from '@angular/material';

describe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  const testCourse = {
    id: 1,
    name: 'Test Course1',
    date: new Date('01/05/2019').toISOString(),
    length: 120,
    description: 'Course description',
    isTopRated: false,
  } as Course;

  const coursesServiceStub = jasmine.createSpyObj('CoursesService', ['createCourse', 'updateItem', 'getItemById']);
  coursesServiceStub.createCourse.and.returnValue(of({}));
  coursesServiceStub.updateItem.and.returnValue(of({}));
  coursesServiceStub.getItemById.and.returnValue(of(testCourse));

  const authorsServiseStub = {
    loadAuthors: () => of([]),
  };

  const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        RouterTestingModule.withRoutes([
          { path: 'courses', component: CoursePageComponent },
        ]),
      ],
      declarations: [
        CoursePageComponent,
        DateInputComponent,
        DurationInputComponent,
        DurationPipe,
        PeopleInputComponent,
      ],
      providers: [
        FormBuilder,
        { provide: CoursesService, useValue: coursesServiceStub },
        { provide: AuthorsService, useValue: authorsServiseStub },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ mode: DialogModes.Edit }),
            params: of({ id: '1'}),
          },
        },
        { provide: Store, useValue: storeSpy },
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
    const coursesService = TestBed.get(Store);
    component.onSave();
    expect(coursesService.dispatch).toHaveBeenCalled();
  });

  it('should call update course method', () => {
    component.dialogMode = DialogModes.Edit;
    const coursesService = TestBed.get(Store);
    component.onSave();
    expect(coursesService.dispatch).toHaveBeenCalled();
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
