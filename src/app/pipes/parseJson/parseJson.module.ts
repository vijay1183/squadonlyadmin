import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParseJsonPipe } from './parseJson.pipe';

@NgModule({
  declarations: [ParseJsonPipe],
  imports: [CommonModule],
  exports: [ParseJsonPipe]
})

export class ParseJsonModule { }
