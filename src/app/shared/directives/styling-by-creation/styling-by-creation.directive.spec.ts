import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylingByCreationDirective } from './styling-by-creation.directive';

describe('StylingByCreationDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divTested: HTMLElement;
  @Component({
    template: `
    <div [appStylingByCreation]="date">Test</div>
    `,
  })

  class TestComponent {
    date: string = new Date().toISOString();
  }

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        StylingByCreationDirective,
      ],
    })
      .createComponent(TestComponent);
    component = fixture.componentInstance;
    divTested = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('test component should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change shadow color to green', () => {
    const greenColor = 'rgb(155, 200, 55)';
    expect(divTested.style.boxShadow ).toBe(greenColor + ' 0px 0px 10px 0px');
  });

  it('should change shadow color to blue', () => {
    const blueColor = 'rgb(81, 196, 228)';
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    component.date = new Date(Date.parse(component.date) + millisecondsPerDay).toISOString();
    fixture.detectChanges();
    expect(divTested.style.boxShadow ).toBe(blueColor + ' 0px 0px 10px 0px');
  });
});
