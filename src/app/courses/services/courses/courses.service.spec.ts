import { CoursesService } from './courses.service';
import { of, throwError } from 'rxjs';
import { Course } from '../../course.model';

describe('CoursesService', () => {
  let service: CoursesService;
  const mockCourses = [
    {
      id: '1',
      title: 'Test Course1',
      creationDate: new Date('01/05/2019'),
      duration: 120,
      description: 'Course description',
      topRated: false,
    },
    {
      id: '2',
      title: 'Test Course2',
      creationDate: new Date('01/05/2018'),
      duration: 10,
      description: 'Course description',
      topRated: false,
    },
    {
      id: '3',
      title: 'Test Course3',
      creationDate: new Date(),
      duration: 140,
      description: 'Course description',
      topRated: true,
    },
  ];

  beforeEach(() => {
    service = new CoursesService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses and then update dataStore', () => {
    spyOn(service, 'getMockCourses').and.returnValue(of(mockCourses));

    service.getList();
    expect(service.getStore().courses).toEqual(mockCourses);
  });

  it('should log error message if cannot get courses', () => {
    spyOn(service, 'getMockCourses').and.returnValue(throwError(new Error('Test error')));
    const log = spyOn( console, 'log');
    service.getList();

    expect(log).toHaveBeenCalledWith('Could not load courses.');
  });

  it('should add new course and update dataStore', () => {
    const testCourse = {
      id: '5',
      title: 'Test',
      creationDate: new Date('01/05/2019'),
      duration: 30,
      description: 'Course description',
      topRated: false,
    };

    const store = service.getStore();
    store.courses.push(testCourse);

    service.createCourse(testCourse);
    expect(service.getStore()).toEqual(store);
  });

  it('should log error message if cannot add new course', () => {
    const testCourse = {
      id: '5',
      title: 'Test',
      creationDate: new Date('01/05/2019'),
      duration: 30,
      description: 'Course description',
      topRated: false,
    };

    spyOn(service, 'courseMockResponse').and.returnValue(throwError(new Error('Test error')));
    const log = spyOn( console, 'log');
    service.createCourse(testCourse);

    expect(log).toHaveBeenCalledWith('Could not create course.');
  });

  it('should update course then update dataStore', () => {
    const update = {
      id: '1',
      title: 'new name',
      creationDate: new Date('01/05/2019'),
      duration: 120,
      description: 'Course description',
      topRated: false,
    };

    const store = service.getStore();
    store.courses[0] = update;

    service.updateItem(update);
    expect(service.getStore()).toEqual(store);
  });

  it('should nothing change when update item with strange id', () => {
    const update = {
      id: '10',
      title: 'new name',
      creationDate: new Date('01/05/2019'),
      duration: 120,
      description: 'Course description',
      topRated: false,
    };

    spyOn(service, 'courseMockResponse').and.returnValue(of(update.id = 'test'));

    const store = service.getStore();

    service.updateItem(update);
    expect(service.getStore()).toEqual(store);
  });

  it('should log error message if cannot update course', () => {
    const testCourse = {
      id: '5',
      title: 'Test',
      creationDate: new Date('01/05/2019'),
      duration: 30,
      description: 'Course description',
      topRated: false,
    };

    spyOn(service, 'courseMockResponse').and.returnValue(throwError(new Error('Test error')));
    const log = spyOn( console, 'log');
    service.updateItem(testCourse);

    expect(log).toHaveBeenCalledWith('Could not update course.');
  });

  it('should remove course then update dataStore', () => {
    spyOn(service, 'getMockCourses').and.returnValue(of(mockCourses));
    service.getList();

    const store = service.getStore();
    store.courses.splice(0, 1);

    service.removeItem('1');
    expect(service.getStore()).toEqual(store);
  });
});
