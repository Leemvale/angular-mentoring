import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseComponent } from './components/course/course.component';
import { ManagePanelComponent } from './components/manage-panel/manage-panel.component';
import { SharedModule } from '../shared/shared.module';

import { CoursesService } from './services/courses/courses.service';

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
  providers: [
    CoursesService,
  ],
})
export class CoursesModule { }
