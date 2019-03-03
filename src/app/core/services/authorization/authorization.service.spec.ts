import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';
import { of } from 'rxjs';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let httpClientSpy: { post: jasmine.Spy };

  const mockResponse = {
    token: 'JWT',
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    httpClientSpy.post.and.returnValue(of(mockResponse));
    service = new AuthorizationService(<any> httpClientSpy);
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token to local storage when user logged in', (done: DoneFn) => {
    service.login('testemail', 'testPassword').subscribe(() => {
      expect(localStorage.getItem('token')).toEqual(mockResponse.token);
      done();
    });
  });

  it('should remove user and token from local storage when user logged out', () => {
    service.logout();
    expect(JSON.parse(localStorage.getItem('user'))).toBeFalsy();
  });
});
