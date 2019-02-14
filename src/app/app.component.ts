import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './core/services/authorization/authorization.service';
import { User } from './core/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthorizationService,
  ) { }

  ngOnInit(): void {
    this.auth.initialAuthCheck();
  }
}
