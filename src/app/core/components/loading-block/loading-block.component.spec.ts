import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';

import { LoadingBlockComponent } from './loading-block.component';

describe('LoadingBlockComponent', () => {
  let component: LoadingBlockComponent;
  let fixture: ComponentFixture<LoadingBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule,
      ],
      declarations: [ LoadingBlockComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
