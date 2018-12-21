import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CourseComponent } from './course.component';
import { Course } from '../course.model';

describe('CourseComponent', () => {
  const testCourse = {
    id: '1',
    title: 'TestCourse1',
    creationDate: new Date('12/22/2018'),
    duration: {minutes: 10, hours: 0},
    description: 'Course description',
  } as Course;

  @Component({
    template: `
      <app-course [course]="course" (delete)="onDelete($event)"></app-course>`,
  })
  class TestHostComponent {
    course = testCourse;

    onDelete(): void {
    }
  }

  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseComponent, TestHostComponent],
    })
      .compileComponents();
  }));

  describe('test as a class', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CourseComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      component.course = testCourse;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should emit delete event', () => {
      const deleteEvent = spyOn(component.delete, 'emit');
      component.onDelete(testCourse.id);
      expect(deleteEvent).toHaveBeenCalledTimes(1);
    });

  });

  describe('stand alone testing', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CourseComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      component.course = testCourse;
      fixture.detectChanges();
    });
    it('should render default course image', () => {
      const image = debugElement.query(By.css('img')).nativeElement;
      expect(image.src).toMatch(component.defaultImageSrc);
    });

    it('should render course image', () => {
      testCourse.image = 'assets/images/logo.png';
      fixture.detectChanges();
      const image = debugElement.query(By.css('img')).nativeElement;
      expect(image.src).toMatch(testCourse.image);
    });

    it('should render course title', () => {
      const title = debugElement.query(By.css('.course__title')).nativeElement.textContent;
      expect(title).toBe(testCourse.title);
    });

    it('should render course description', () => {
      const description = debugElement.query(By.css('.course__main p')).nativeElement.textContent;
      expect(description).toBe(testCourse.description);
    });

    it('should render course duration', () => {
      const duration = debugElement.query(By.css('.fa-clock+.property__title+span')).nativeElement.textContent;
      expect(duration).toBe(`${testCourse.duration.hours}h ${testCourse.duration.minutes}m`);
    });

    it('should render course date correct', () => {
      const date = debugElement.query(By.css('.fa-calendar-alt+.property__title+time')).nativeElement.textContent;
      expect(date).toBe(`Dec 22, 2018`);
    });

    it('should call onEdit method', () => {
      const onEdit = spyOn(component, 'onEdit');
      const editBtn = debugElement.queryAll(By.css('.btn-icon'))[0];
      editBtn.triggerEventHandler('click', null);
      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it('should call onDelete method', () => {
      const onDelete = spyOn(component, 'onDelete');
      const deleteBtn = debugElement.queryAll(By.css('.btn-icon'))[1];
      deleteBtn.triggerEventHandler('click', null);
      expect(onDelete).toHaveBeenCalledWith(testCourse.id);
    });
  });

  describe('test host testing', () => {
    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      debugElement = hostFixture.debugElement;
      hostFixture.detectChanges();
    });

    it('should render course image', () => {
      hostComponent.course.image = 'assets/images/logo.png';
      hostFixture.detectChanges();
      const image = debugElement.query(By.css('img')).nativeElement;
      expect(image.src).toMatch(testCourse.image);
    });

    it('should render course title', () => {
      const title = debugElement.query(By.css('.course__title')).nativeElement.textContent;
      expect(title).toBe(testCourse.title);
    });

    it('should render course description', () => {
      const description = debugElement.query(By.css('.course__main p')).nativeElement.textContent;
      expect(description).toBe(testCourse.description);
    });

    it('should render course duration', () => {
      const duration = debugElement.query(By.css('.fa-clock+.property__title+span')).nativeElement.textContent;
      expect(duration).toBe(`${testCourse.duration.hours}h ${testCourse.duration.minutes}m`);
    });

    it('should render course date correct', () => {
      const date = debugElement.query(By.css('.fa-calendar-alt+.property__title+time')).nativeElement.textContent;
      expect(date).toBe(`Dec 22, 2018`);
    });

    it('should call onDelete method in host', () => {
      const onDelete = spyOn(hostComponent, 'onDelete');
      const deleteBtn = debugElement.queryAll(By.css('.btn-icon'))[1];
      deleteBtn.triggerEventHandler('click', null);
      expect(onDelete).toHaveBeenCalledWith(testCourse.id);
    });
  });
});
