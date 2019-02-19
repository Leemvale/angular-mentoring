import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingBlockService {
  private loaderSubject = new Subject<boolean>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  public show(): void {
    this.loaderSubject.next(true);
  }
  public hide(): void {
    this.loaderSubject.next(false);
  }
}
