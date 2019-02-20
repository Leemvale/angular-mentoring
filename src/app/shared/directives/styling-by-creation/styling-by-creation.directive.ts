import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
@Directive({
  selector: '[appStylingByCreation]',
})
export class StylingByCreationDirective implements OnChanges {
  @Input('appStylingByCreation') date: string;
  private currentDate: number = Date.now();

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.setBorder();
  }

  private setBorder(): void {
    const dateMS = Date.parse(this.date);
    const blueColor = 'rgb(81, 196, 228)';
    const greenColor = 'rgb(155, 200, 55)';
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    if (dateMS <= this.currentDate && dateMS >= this.currentDate - millisecondsPerDay * 14) {
      this.el.nativeElement.style.boxShadow = greenColor + ' 0px 0px 10px 0px';
    } else if (dateMS > this.currentDate) {
      this.el.nativeElement.style.boxShadow = blueColor + ' 0px 0px 10px 0px';
    }
  }

}
