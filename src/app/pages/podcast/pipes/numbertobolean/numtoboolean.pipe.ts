import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numtoboolean'
})
export class NumtobooleanPipe implements PipeTransform {

  transform(value: unknown): any {    
    return (value === '1') ? 'True' : "False";
  }

}
