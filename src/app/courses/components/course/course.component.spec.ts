import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CourseComponent } from './course.component';
import { Course } from '../../course.model';
import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';
import { StylingByCreationDirective } from '../../../shared/directives/styling-by-creation/styling-by-creation.directive';


describe('CourseComponent', () => {
  const testCourse = {
    id: '1',
    title: 'TestCourse1',
    creationDate: new Date('12/22/2018'),
    duration: 10,
    description: 'Course description',
    topRated: true,
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
      declarations: [
        CourseComponent,
        TestHostComponent,
        StylingByCreationDirective,
        DurationPipe,
      ],
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
      component.onDelete(testCourse);
      expect(deleteEvent).toHaveBeenCalledTimes(1);
    });

  });

  describe('stand alone testing', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CourseComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      component.course = testCourse;
    });

    it('should render default course image', () => {
      fixture.detectChanges();
      const image = debugElement.query(By.css('img')).nativeElement;
      expect(image.src).toMatch(component.defaultImageSrc);
    });

    it('should render course image', () => {
      component.course = {
        ...testCourse,
        image: 'assets/images/logo.png',
      };
      fixture.detectChanges();
      const image = debugElement.query(By.css('img')).nativeElement;
      expect(image.src).toMatch(component.course.image);
    });

    it('should render course title', () => {
      fixture.detectChanges();
      const title = debugElement.query(By.css('.course__title')).nativeElement.textContent;
      expect(title).toBe(testCourse.title.toUpperCase());
    });

    it('should render course description', () => {
      fixture.detectChanges();
      const description = debugElement.query(By.css('.course__main p')).nativeElement.textContent;
      expect(description).toBe(testCourse.description);
    });

    it('should render course duration', () => {
      fixture.detectChanges();
      const duration = debugElement.query(By.css('.fa-clock+.property__title+span')).nativeElement.textContent;
      expect(duration).toBe(`${testCourse.duration}m`);
    });

    it('should render course date correct', () => {
      fixture.detectChanges();
      const date = debugElement.query(By.css('.fa-calendar-alt+.property__title+time')).nativeElement.textContent;
      expect(date).toBe(`Dec 22, 2018`);
    });

    it('should render top rated sign', () => {
      fixture.detectChanges();
      const star = debugElement.query(By.css('.top-rated-sign'));
      expect(star).toBeTruthy();
    });

    it('should set top rated course styles', () => {
      fixture.detectChanges();
      const star = debugElement.query(By.css('.course--top-rated'));
      expect(star).toBeTruthy();
    });

    it('should not render top rated sign', () => {
      component.course = {
        ...testCourse,
        topRated: false,
      };
      fixture.detectChanges();
      const star = debugElement.query(By.css('.top-rated-sign'));
      expect(star).toBeFalsy();
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
      expect(onDelete).toHaveBeenCalledWith(testCourse);
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
      hostComponent.course = {
        ...testCourse,
        image: 'assets/images/logo.png',
      };
      hostFixture.detectChanges();
      const image = debugElement.query(By.css('img')).nativeElement;
      expect(image.src).toMatch(hostComponent.course.image);
    });

    it('should render course title', () => {
      const title = debugElement.query(By.css('.course__title')).nativeElement.textContent;
      expect(title).toBe(testCourse.title.toUpperCase());
    });

    it('should render course description', () => {
      const description = debugElement.query(By.css('.course__main p')).nativeElement.textContent;
      expect(description).toBe(testCourse.description);
    });

    it('should render course duration', () => {
      const duration = debugElement.query(By.css('.fa-clock+.property__title+span')).nativeElement.textContent;
      expect(duration).toBe(`${testCourse.duration}m`);
    });

    it('should render course date correct', () => {
      const date = debugElement.query(By.css('.fa-calendar-alt+.property__title+time')).nativeElement.textContent;
      expect(date).toBe(`Dec 22, 2018`);
    });

    it('should call onDelete method in host', () => {
      const onDelete = spyOn(hostComponent, 'onDelete');
      const deleteBtn = debugElement.queryAll(By.css('.btn-icon'))[1];
      deleteBtn.triggerEventHandler('click', null);
      expect(onDelete).toHaveBeenCalledWith(testCourse);
    });
  });
});
