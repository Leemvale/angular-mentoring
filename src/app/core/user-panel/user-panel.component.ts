import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit, User {

  id: string;
  firstName: string;
  lastName: string;

  constructor() { }

  ngOnInit(): void {
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  private getUser(): void {}

}
