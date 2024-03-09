import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBydate'
})
export class SortByPipe implements PipeTransform {

  transform(value: any, key?: any): any {
    return value.sort(
      (a: any, b: any) =>
        new Date(a[key]).getTime() - new Date(b[key]).getTime()
    );
  }

}
