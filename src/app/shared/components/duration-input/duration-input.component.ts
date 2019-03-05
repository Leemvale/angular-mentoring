import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DurationInputComponent),
      multi: true,
    },
  ],
})
export class DurationInputComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() ngClass: any;
  duration = new FormControl('');

  get value(): number {
    return this.duration.value;
  }
  constructor() { }

  ngOnInit(): void {
  }

  private onChange = (duration: number) => {};

  private onTouched = () => {};

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
  }

  public writeValue(duration?: number): void {
    if (duration) {
      this.duration.setValue(duration);
    } else {
      this.onTouched();
    }
    this.onChange(this.value);
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return Number.isNaN(Number(control.value))  ? {'isNotNumber': {value: control.value}} : null;
  }

}
