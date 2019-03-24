import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Person } from '../../person.model';

@Component({
  selector: 'app-people-input',
  templateUrl: './people-input.component.html',
  styleUrls: ['./people-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeopleInputComponent),
      multi: true,
    },
  ],
})
export class PeopleInputComponent implements OnInit, ControlValueAccessor {
  @Input() peopleList: Person[];
  @Input() ngClass: any;

  @Output() search: EventEmitter<string> = new EventEmitter();

  people = new FormArray([]);

  get value(): Person[] {
    return this.people.value;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public onSearch(searchValue: string): void {
    this.search.emit(searchValue);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.people.disable();
  }

  public writeValue(persons?: Person[]): void {
    if (persons) {
      persons.forEach((person: Person) => this.people.push(new FormControl(person)));
    } else {
      this.onTouched();
    }
    this.onChange(this.value);
  }

  public addPerson(person: Person): void {
    if (!this.people.value.some((item: Person) => item.id === person.id)) {
      this.people.push(new FormControl(person));
    }
    this.writeValue();
  }

  public removePerson(index: number): void {
    this.people.removeAt(index);
    this.writeValue();
  }

  private onChange = (persons: Person[]) => {};

  private onTouched = () => {};



}
