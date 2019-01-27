import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthorizationService } from '../../services/authorization/authorization.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user: User;
  authSubscription: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void {
    this.checkAuth();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  public onLogOut(): void {
    this.authorizationService.logout();
  }

  private checkAuth(): void {
    this.authSubscription = this.authorizationService.isAuthenticated().subscribe((isAuth: boolean) => {
      if (isAuth) {
        this.user = this.authorizationService.getUserInfo();
      } else {
        this.user = undefined;
      }
    });
  }
}
