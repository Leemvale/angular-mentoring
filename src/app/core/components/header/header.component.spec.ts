import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { AuthorizationService } from '../../services/authorization/authorization.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const authSpy = jasmine.createSpyObj('AuthorizationService', ['isAuthenticated', 'getUserInfo']);

  const testUser = {
    id: '1',
    firstName: 'Test',
    lastName: 'Test Last',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
      providers: [
        { provide: AuthorizationService, useValue: authSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user', () => {
    const authorizationService = TestBed.get(AuthorizationService);
    authorizationService.isAuthenticated.and.returnValue(of(true));
    authorizationService.getUserInfo.and.returnValue(testUser);

    fixture.detectChanges();
    expect(component.user).toEqual(testUser);
  });

  it('user should be undefined', () => {
    const authorizationService = TestBed.get(AuthorizationService);
    authorizationService.isAuthenticated.and.returnValue(of(false));

    fixture.detectChanges();
    expect(component.user).toBeFalsy();
  });
});
