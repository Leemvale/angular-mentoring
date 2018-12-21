import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { ManagePanelComponent } from './manage-panel/manage-panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CourseComponent,
    ManagePanelComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ],
})
export class CoursesModule { }
