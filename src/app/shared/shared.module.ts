import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { StylingByCreationDirective } from './directives/styling-by-creation/styling-by-creation.directive';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchByPipe } from './pipes/search-by/search-by.pipe';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    StylingByCreationDirective,
    DurationPipe,
    OrderByPipe,
    SearchByPipe,
    ModalConfirmComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    BreadcrumbsComponent,
    StylingByCreationDirective,
    DurationPipe,
    OrderByPipe,
  ],
  entryComponents: [
    ModalConfirmComponent,
  ],
})
export class SharedModule { }
