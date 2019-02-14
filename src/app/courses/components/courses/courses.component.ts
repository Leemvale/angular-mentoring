import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompositeDisposable } from '../../../shared/helpers/CompositeDisposable';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  anchor: CompositeDisposable = new CompositeDisposable();
  constructor(
    private auth: AuthorizationService,
  ) { }

  ngOnInit(): void {
    const authSubscription = this.auth.isAuthenticated().subscribe((isAuth: boolean) => this.isAuth = isAuth);
    this.anchor.add(authSubscription);
  }

  ngOnDestroy(): void {
    this.anchor.unsubscribe();
  }
}
