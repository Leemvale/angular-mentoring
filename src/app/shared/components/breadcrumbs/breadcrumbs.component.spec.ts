import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { CoursesService } from '../../../courses/services/courses/courses.service';
import { Course } from '../../../courses/course.model';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const testCourse = {
    id: 1,
    name: 'TestCourse1',
    date: new Date('12/22/2018').toISOString(),
    length: 10,
    description: 'Course description',
    isTopRated: true,
  } as Course;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [ BreadcrumbsComponent ],
      providers: [
        { provide: CoursesService, useValue: { getItemById: () => of({ testCourse })} },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
