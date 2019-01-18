import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelComponent } from './user-panel.component';

describe('UserPanelComponent', () => {
  let component: UserPanelComponent;
  let fixture: ComponentFixture<UserPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPanelComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.user = {
      id: '1',
      firstName: 'User',
      lastName: 'User Lastname',
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user', () => {
    expect(component.id).toBeTruthy();
    expect(component.firstName).toBeTruthy();
    expect(component.lastName).toBeTruthy();
  });
});
