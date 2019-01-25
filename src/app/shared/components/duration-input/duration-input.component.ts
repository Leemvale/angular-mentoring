import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
})
export class DurationInputComponent implements OnInit {
  @Input() duration: number;
  @Output() durationChange: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onDurationChange(minutes: number): void {
    this.durationChange.emit(minutes);
  }
}
