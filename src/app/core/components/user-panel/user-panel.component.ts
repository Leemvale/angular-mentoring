import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit, User {

  id: string;
  name: {
    first: string;
    last: string;
  };

  @Input()
  set user(user: User) {
    this.id = user.id;
    this.name = user.name;
  }

  @Output() logOut:  EventEmitter<void> = new EventEmitter();

  get userName(): string {
    return `${this.name.first} ${this.name.last}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public onLogOut(): void {
    this.logOut.emit();
  }

}
