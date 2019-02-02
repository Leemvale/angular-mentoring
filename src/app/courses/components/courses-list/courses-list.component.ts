import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Course } from '../../course.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements
  OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() courses: Course[];
  @Output() delete: EventEmitter<Course> = new EventEmitter();
  @Output() edit: EventEmitter<Course> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log('init');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes');
  }

  ngDoCheck(): void {
    console.log('do check');
  }

  ngAfterContentInit(): void {
    console.log('after content init');
  }

  ngAfterContentChecked(): void {
    console.log('after content checked');
  }

  ngAfterViewInit(): void {
    console.log('after view init');
  }

  ngAfterViewChecked(): void {
    console.log('after view checked');
  }

  ngOnDestroy(): void {
    console.log('on destroy');
  }


  public onDelete(course: Course): void {
    this.delete.emit(course);
  }

  public onEdit(course: Course): void {
    this.edit.emit(course);
  }

  public onLoadMore(): void {
    console.log('%c%s', 'color: #bada55; font-weight: bold', 'Load more');
  }
}
