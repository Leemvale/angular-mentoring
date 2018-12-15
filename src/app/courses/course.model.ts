import { Time } from '@angular/common';

export interface Course {
  id: string;
  title: string;
  creationDate: Date;
  duration: Time;
  description: string;
  image?: string;
}
