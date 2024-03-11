import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { RouterModule } from '@angular/router';
import { AudioplayerComponent } from './audioplayer.component';



@NgModule({
  declarations: [AudioplayerComponent],
  exports: [AudioplayerComponent],
  imports: [CommonModule, RouterModule]
})
export class AudioplayerModule { }
