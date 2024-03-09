import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentJsPipe } from './momentJs.pipe';
 

@NgModule({
  declarations: [MomentJsPipe],
  imports: [CommonModule],
  exports: [MomentJsPipe]
})

export class MomentJsModule { }
