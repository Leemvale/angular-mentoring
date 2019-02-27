import { HttpClient } from '@angular/common/http';
import { CoursesService } from './courses.service';
import { of, throwError } from 'rxjs';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy , delete: jasmine.Spy  };

  const mockCourses = [
    {
      id: 1,
      name: 'Test Course1',
      date: new Date('01/05/2019').toISOString(),
      length: 120,
      description: 'Course description',
      isTopRated: false,
    },
    {
      id: 2,
      name: 'Test Course2',
      date: new Date('01/05/2018').toISOString(),
      length: 10,
      description: 'Course description',
      isTopRated: false,
    },
    {
      id: 3,
      name: 'Test Course3',
      date: new Date().toISOString(),
      length: 140,
      description: 'Course description',
      isTopRated: true,
    },
  ];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    httpClientSpy.get.and.returnValue(of(mockCourses));
    httpClientSpy.post.and.returnValue(of({}));
    httpClientSpy.delete.and.returnValue(of({}));
    service = new CoursesService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses and then update dataStore', () => {
    service.getList();
    expect(service.getStore().courses).toEqual(mockCourses);
  });

  it('should log error message if cannot get courses', () => {
    httpClientSpy.get.and.returnValue(throwError(new Error('Test error')));
    const log = spyOn( console, 'log');
    service.getList();

    expect(log).toHaveBeenCalledWith('Could not load courses.');
  });
});
