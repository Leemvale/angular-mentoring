import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ManagePanelComponent } from './manage-panel.component';

describe('ManagePanelComponent', () => {
  let component: ManagePanelComponent;
  let fixture: ComponentFixture<ManagePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ManagePanelComponent,
       ],
      imports: [
        FormsModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearch', () => {
    const search = spyOn(component, 'onSearch');
    const searchInput = fixture.nativeElement.querySelector('input');

    searchInput.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(search).toHaveBeenCalledTimes(1);
  });

  it('should emit next search event', () => {
    const search = spyOn(component.search, 'emit');
    const testString = 'test string';

    component.onSearch(testString);
    expect(search).toHaveBeenCalledWith(testString);
  });
});
