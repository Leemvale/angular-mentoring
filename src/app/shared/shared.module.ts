import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { StylingByCreationDirective } from './directives/styling-by-creation/styling-by-creation.directive';
import { DurationPipe } from './pipes/duration/duration.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { SearchByPipe } from './pipes/search-by/search-by.pipe';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { DateInputComponent } from './components/date-input/date-input.component';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { PeopleInputComponent } from './components/people-input/people-input.component';
import { HttpClientModule } from '@angular/common/http';
// import { DateFormatValidatorDirective } from './validators/date-format.validator';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    StylingByCreationDirective,
    DurationPipe,
    OrderByPipe,
    SearchByPipe,
    ModalConfirmComponent,
    DateInputComponent,
    DurationInputComponent,
    PeopleInputComponent,
    // DateFormatValidatorDirective,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatAutocompleteModule,
  ],
  exports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BreadcrumbsComponent,
    StylingByCreationDirective,
    DurationPipe,
    OrderByPipe,
    DateInputComponent,
    DurationInputComponent,
    PeopleInputComponent,
    MatAutocompleteModule,
  ],
  entryComponents: [
    ModalConfirmComponent,
  ],
})
export class SharedModule { }
