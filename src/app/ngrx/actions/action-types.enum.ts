export enum ActionTypes {
  StartAppInitializer = '[App] Start App Initializer',
  FinishAppInitializer = '[App] Finish App Initializer',
  LoadUser = '[App] Load User' ,
  UserLoaded = '[App] User Loaded',

  Login = '[Auth] login',
  Logout = '[Auth] logout',
  LoginSuccess = '[Auth] login success',
  LoginFailure = '[Auth] login failure',

  LoadCourses = '[Courses] load',
  LoadCoursesSuccess = '[Courses] load success',
  LoadCoursesFailure = '[Courses] load failure',
  EditCourse = '[Courses] edit course',
  EditCourseSuccess = '[Courses] edit success',
  EditCourseFailure = '[Courses] edit failure',
  AddCourse = '[Courses] add course',
  AddCourseSuccess = '[Courses] add success',
  AddCourseFailure = '[Courses] add failure',
  DeleteCourse = '[Courses] delete course',
  DeleteCourseSuccess = '[Courses] delete success',
  DeleteCourseFailure = '[Courses] delete failure',

}
