import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizerPipe } from './sanitizer.pipe';
 
 

@NgModule({
  declarations: [SanitizerPipe],
  imports: [CommonModule],
  exports: [SanitizerPipe]
})

export class SanitizerModule { }
