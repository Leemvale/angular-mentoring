import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { StylingByCreationDirective } from './directives/styling-by-creation/styling-by-creation.directive';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchByPipe } from './pipes/search-by/search-by.pipe';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    StylingByCreationDirective,
    DurationPipe,
    OrderByPipe,
    SearchByPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BreadcrumbsComponent,
    StylingByCreationDirective,
    DurationPipe,
    OrderByPipe,
  ],
})
export class SharedModule { }
