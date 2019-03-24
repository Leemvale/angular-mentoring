import { AuthorsService } from './authors.service';
import { of } from 'rxjs';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy , delete: jasmine.Spy  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
    httpClientSpy.get.and.returnValue(of([]));
    service = new AuthorsService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
