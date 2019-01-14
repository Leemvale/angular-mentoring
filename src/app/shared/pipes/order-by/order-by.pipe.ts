import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {

  transform(values: any[], parameter: string): any[] {
    if (parameter === 'creationDate') {
      return values.sort((a: any, b: any) => b[parameter].getTime() - a[parameter].getTime() );
    }
  }

}
