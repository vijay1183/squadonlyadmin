import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastComponent } from './podcast.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [{ path: '', component: PodcastComponent}];


@NgModule({
  declarations: [
    PodcastComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PodcastModule { }
