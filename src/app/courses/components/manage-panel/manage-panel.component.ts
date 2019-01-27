import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-manage-panel',
  templateUrl: './manage-panel.component.html',
  styleUrls: ['./manage-panel.component.scss'],
})
export class ManagePanelComponent implements OnInit {
  searchValue: string;
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() addNew: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onSearchClick(): void {
    this.search.emit(this.searchValue);
  }

  public onAddCourse(): void {
    this.addNew.emit();
  }
}
