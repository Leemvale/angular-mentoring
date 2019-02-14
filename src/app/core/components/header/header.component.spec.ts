import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { AuthorizationService } from '../../services/authorization/authorization.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const testUser = {
    id: '1',
    name: {
      first: 'First',
      last: 'Last',
    },
  };

  const authSpy = { CurrentUser: of(testUser)};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
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
    fixture.detectChanges();
    expect(component.user).toEqual(testUser);
  });

});
