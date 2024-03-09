import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortbytableComponent } from './sortbytable.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SortbytableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SortbytableComponent
  ]
})
export class SortbytableModule { }
