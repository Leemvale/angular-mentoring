import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

import { filter, pluck, mergeMap } from 'rxjs/operators';
import { CompositeDisposable } from '../../helpers/CompositeDisposable';
import { CoursesService } from 'src/app/courses/services/courses/courses.service';
import { Course } from 'src/app/courses/course.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  courseName: string;
  anchor: CompositeDisposable = new CompositeDisposable();

  constructor(
    private router: Router,
    private courses: CoursesService,
  ) { }

  ngOnInit(): void {
    const routerEventSubscription = this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      pluck('snapshot'),
      filter((event: any) => event._lastPathIndex !== 0),
      pluck( 'params'),
      mergeMap((event: any) => event.id ? this.courses.getItemById(event.id) : of(null)),
    )
      .subscribe((course: Course) => {
        if (course) {
          this.courseName = course.name;
        } else {
          this.courseName = undefined;
        }
      });

    this.anchor.add(routerEventSubscription);
  }

  ngOnDestroy(): void {
    this.anchor.unsubscribe();
  }
}
