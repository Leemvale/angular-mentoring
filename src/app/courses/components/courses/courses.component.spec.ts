import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { CoursesComponent } from './courses.component';
import { SearchByPipe } from '../../../shared/pipes/search-by/search-by.pipe';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { of } from 'rxjs';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  const authServiceMock = jasmine.createSpyObj('AuthorizationService', ['isAuthenticated']);
  authServiceMock.isAuthenticated.and.returnValue(of(true));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        SearchByPipe,
      ],
      imports: [
        MatDialogModule,
      ],
      providers: [
        { provide: AuthorizationService, useValue: authServiceMock },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
