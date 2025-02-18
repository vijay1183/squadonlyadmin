import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnails'
})
export class ThumbnailsPipe implements PipeTransform {

  transform(value: unknown): any {
    console.log(value)
    return value
    // return '<img [src]="value" (error)="'./assets/images/errorimage.png'" />';
  }

}
