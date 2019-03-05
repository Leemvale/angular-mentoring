import { User } from './core/user.model';
import { Course } from './courses/course.model';

export interface StoreModel {
  user: User;
  courses: Course[];
}
