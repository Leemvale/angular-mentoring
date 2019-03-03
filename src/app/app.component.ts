import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBlockService } from './core/services/loading-block/loading-block.service';
import { CompositeDisposable } from './shared/helpers/CompositeDisposable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  showSpinner = false;
  anchor: CompositeDisposable = new CompositeDisposable();

  constructor(
    private loadingService: LoadingBlockService,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.anchor.add(
      this.loadingService.loaderState
      .subscribe((state: boolean) => {
        this.showSpinner = state;
        this.cdRef.detectChanges();
      }),
    );
  }

  ngOnDestroy(): void {
    this.anchor.unsubscribe();
  }
}
