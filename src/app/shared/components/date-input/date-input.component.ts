import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
})
export class DateInputComponent implements OnInit {

  @Input() date: Date;
  @Output() dateChange: EventEmitter<Date> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onDateChange(date: Date): void {
    this.dateChange.emit(date);
  }
}
