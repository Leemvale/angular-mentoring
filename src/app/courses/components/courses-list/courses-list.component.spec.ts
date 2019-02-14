import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { Course } from '../../course.model';
import { OrderByPipe } from '../../../shared/pipes/order-by/order-by.pipe';
import { MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursesService } from '../../services/courses/courses.service';
import { of } from 'rxjs';


describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let debugElement: DebugElement;

  const testCourses = [
    {
      id: 1,
      name: 'Test Course1',
      date: new Date('01/05/2019').toISOString(),
      length: 120,
      description: 'Course description',
      isTopRated: false,
    },
    {
      id: 2,
      name: 'Test Course2',
      date: new Date('01/05/2018').toISOString(),
      length: 10,
      description: 'Course description',
      isTopRated: false,
    },
    {
      id: 3,
      name: 'Test Course3',
      date: new Date().toISOString(),
      length: 140,
      description: 'Course description',
      isTopRated: true,
    },
  ];

  const coursesServiceStub = {
    getList: () => null,
    courses: of(testCourses),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RouterTestingModule,
      ],
      declarations: [
        CoursesListComponent,
        OrderByPipe,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.courses = testCourses;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call load more', () => {
    const onLoadMore = spyOn(component, 'onLoadMore');
    const loadMoreBtn = debugElement.query(By.css('.btn-color'));
    loadMoreBtn.triggerEventHandler('click', null);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should render 3 courses', () => {
    const coursesEl = debugElement.queryAll(By.css('app-course'));
    expect(coursesEl.length).toBe(3);
  });

  it('should render no courses sentence', () => {
    component.courses = [];
    fixture.detectChanges();
    const paragraph = debugElement.query(By.css('.container p:first-child'));
    expect(paragraph.nativeElement.textContent).toBe('No data, feel free to add new course');
  });
});
