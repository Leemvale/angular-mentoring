import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/components/courses/courses.component';
import { LoginPageComponent } from './login/components/login-page/login-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full'},
  { path: 'courses', component: CoursesComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: 'courses' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
