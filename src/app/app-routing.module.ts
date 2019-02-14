import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/components/courses/courses.component';
import { LoginPageComponent } from './login/components/login-page/login-page.component';
import { CoursePageComponent } from './courses/components/course-page/course-page.component';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { DialogModes } from './shared/enums';
import { CoursesListComponent } from './courses/components/courses-list/courses-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full',
      },
      {
        path: 'all',
        component: CoursesListComponent,
      },
      {
        path: 'new',
        component: CoursePageComponent,
        data: { mode: DialogModes.Create },
      },
      {
        path: ':id',
        component: CoursePageComponent,
        data: { mode: DialogModes.Edit },
      },
    ],
  },

  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
