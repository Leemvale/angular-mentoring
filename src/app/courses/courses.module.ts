import { NgModule } from '@angular/core';

import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseComponent } from './components/course/course.component';
import { ManagePanelComponent } from './components/manage-panel/manage-panel.component';
import { SharedModule } from '../shared/shared.module';

import { CoursesService } from './services/courses/courses.service';
import { ModalAddCourseComponent } from './components/modal-add-course/modal-add-course.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesListComponent,
    CourseComponent,
    ManagePanelComponent,
    ModalAddCourseComponent,
  ],
  imports: [
    SharedModule,
  ],
  providers: [
    CoursesService,
  ],
  entryComponents: [
    ModalAddCourseComponent,
  ],
})
export class CoursesModule { }
