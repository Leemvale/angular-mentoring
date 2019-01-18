
import { AuthorizationService } from './authorization.service';
import { of } from 'rxjs';

describe('AuthorizationService', () => {
  let service: AuthorizationService;

  const mockResponse = {
    user: {
      id: '1',
      firstName: 'Test',
      lastName: 'Test Last',
    },
    token: 'JWT',
  };

  beforeEach(() => {
    service = new AuthorizationService();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    spyOn(service, 'getMockResponse').and.returnValue(of(mockResponse));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user and token to local storage when user logged in', (done: DoneFn) => {
    service.login('testemail', 'testPassword').subscribe(() => {
      expect(JSON.parse(localStorage.getItem('user'))).toEqual(mockResponse.user);
      expect(JSON.parse(localStorage.getItem('token'))).toEqual(mockResponse.token);
      done();
    });
  });

  it('should remove user and token from local storage when user logged out', () => {
    service.logout();
    expect(JSON.parse(localStorage.getItem('user'))).toBeFalsy();
    expect(JSON.parse(localStorage.getItem('token'))).toBeFalsy();
  });

  it('should get user info from local storage', () => {
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    expect(service.getUserInfo()).toEqual(mockResponse.user);
  });

});
