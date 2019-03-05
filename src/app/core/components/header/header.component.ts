import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { User } from '../../user.model';
import { CompositeDisposable } from '../../../shared/helpers/CompositeDisposable';
import { StoreModel } from '../../../store.model';
import { Logout } from '../../../ngrx/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  anchor: CompositeDisposable = new CompositeDisposable();

  constructor(
    private store: Store<StoreModel>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.anchor.add(
      this.store.pipe(select('user')).subscribe(
        (user: User) => this.user = user,
      ),
    );
  }

  ngOnDestroy(): void {
    this.anchor.unsubscribe();
  }

  public onLogOut(): void {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }
}
