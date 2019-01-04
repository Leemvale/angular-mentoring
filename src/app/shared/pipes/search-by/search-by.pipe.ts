import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy',
})
export class SearchByPipe implements PipeTransform {

  transform(array: any[], parameter: string, value: string): any[] {
    return array.filter((item: any ) =>  item[parameter].toLowerCase().includes(value.toLowerCase()) );
  }

}
