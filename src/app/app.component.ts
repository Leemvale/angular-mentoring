import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from './core/services/authorization/authorization.service';

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
