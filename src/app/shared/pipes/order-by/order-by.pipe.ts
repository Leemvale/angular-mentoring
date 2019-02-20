import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  transform(values: any[], parameter: string): any[] {
    if (parameter === 'date') {
      return values.sort((a: string, b: string) => Date.parse(b[parameter]) - Date.parse(a[parameter]) );
    }
  }

}
