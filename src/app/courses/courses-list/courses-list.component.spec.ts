import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { Course } from '../course.model';


describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let debugElement: DebugElement;

  const testCourses = [{}, {}, {}] as Course[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event', () => {
    const deleteEvent = spyOn(component.delete, 'emit');
    const courseId = '1';
    component.onDelete(courseId);
    expect(deleteEvent).toHaveBeenCalledTimes(1);
  });

  it('should call load more', () => {
    const onLoadMore = spyOn(component, 'onLoadMore');
    const loadMoreBtn = debugElement.query(By.css('.btn-color'));
    loadMoreBtn.triggerEventHandler('click', null);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('should render 3 courses', () => {
    component.courses = testCourses;
    fixture.detectChanges();
    const coursesEl = debugElement.queryAll(By.css('app-course'));
    expect(coursesEl.length).toBe(3);
  });
});
