import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'parseJson'
})
export class ParseJsonPipe implements PipeTransform {
  transform(data: any): any {
    try {
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }
}
