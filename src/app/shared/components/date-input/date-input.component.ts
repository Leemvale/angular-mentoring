import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() ngClass: any;
  dateFormat = 'DD/MM/YYYY';
  date = new FormControl('');

  get value(): string {
    return moment(this.date.value, this.dateFormat).toISOString();
  }

  constructor() { }

  ngOnInit(): void {
  }

  private onChange = (date: string) => {};

  private onTouched = () => {};


  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.date.disable();
  }

  public writeValue(date?: string): void {
    if (date) {
      const value = moment(date).format(this.dateFormat);
      this.date.setValue(value);
    } else {
      this.onTouched();
    }
    this.onChange(this.value);
  }

  public validate(): ValidationErrors | null {
    const formatCorrect = moment(this.date.value, this.dateFormat).format(this.dateFormat) === this.date.value;
    return formatCorrect ? null : {'formatIncorrect': {value: this.date.value}};
  }
}
