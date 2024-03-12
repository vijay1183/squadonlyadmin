import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanpipe'
})
export class BooleanpipePipe implements PipeTransform {

  transform(value: number): Boolean {
    return  Boolean(Number(value));
  }

}
