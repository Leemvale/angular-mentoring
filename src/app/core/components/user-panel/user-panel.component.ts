import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit, User {

  id: string;
  firstName: string;
  lastName: string;

  @Input()
  set user(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }

  @Output() logOut:  EventEmitter<void> = new EventEmitter();

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public onLogOut(): void {
    this.logOut.emit();
  }

}
