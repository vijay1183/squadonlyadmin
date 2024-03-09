import { Pipe, type PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'momentJs'
})
export class MomentJsPipe implements PipeTransform {
  transform(value: Date): { value: string, days: number } {
    return {
      value: moment(value).fromNow(true),
      days: (moment().diff(value, 'days') + 1)
    }
  }
}



