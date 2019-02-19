import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../services/authorization/authorization.service';
import { User } from '../../user.model';
import { CompositeDisposable } from '../../../shared/helpers/CompositeDisposable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  anchor: CompositeDisposable = new CompositeDisposable();

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.anchor.add(
      this.authorizationService.CurrentUser.subscribe(
        (user: User) => this.user = user,
      ),
    );
  }

  ngOnDestroy(): void {
    this.anchor.unsubscribe();
  }

  public onLogOut(): void {
    this.authorizationService.logout();
    this.router.navigate(['/login']);
  }
}
