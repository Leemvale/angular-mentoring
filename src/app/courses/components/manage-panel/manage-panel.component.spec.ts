import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
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
    const search = spyOn(component, 'onSearchClick');
    const searchBtn = fixture.debugElement.query(By.css('.search-input button'));

    searchBtn.triggerEventHandler('click', null);
    expect(search).toHaveBeenCalledTimes(1);
  });

  it('should emit search event', () => {
    const search = spyOn(component.search, 'emit');
    const searchInput = fixture.nativeElement.querySelector('input');
    const searchBtn = fixture.debugElement.query(By.css('.search-input button'));

    const testString = 'test string';
    searchInput.value = testString;
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    searchBtn.triggerEventHandler('click', null);
    expect(search).toHaveBeenCalledWith(testString);
  });
});
