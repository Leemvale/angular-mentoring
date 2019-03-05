import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-manage-panel',
  templateUrl: './manage-panel.component.html',
  styleUrls: ['./manage-panel.component.scss'],
})
export class ManagePanelComponent implements OnInit {
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() addNew: EventEmitter<string> = new EventEmitter();

  searchControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  public onSearch(): void {
    this.search.emit(this.searchControl.value);
  }

  public onAddCourse(): void {
    this.addNew.emit();
  }
}
