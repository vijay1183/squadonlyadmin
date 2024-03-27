import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastdetailsComponent } from './podcastdetails.component';
import { RouterModule, Routes } from '@angular/router';
import { PodcastDetailsService } from './podcastdetails.service';
import { BreadcrumbsModule } from 'src/app/shared/breadcrumbs/breadcrumbs.module';
import { AudioplayerModule } from 'src/app/shared/audioplayer/audioplayer.module';
import { SanitizerModule } from 'src/app/pipes/sanitizer/sanitizer.module';
const routes: Routes = [{
  path: '',
  component: PodcastdetailsComponent,
  resolve: { service: PodcastDetailsService }
}];


@NgModule({
  declarations: [
    PodcastdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BreadcrumbsModule,
    AudioplayerModule,
    SanitizerModule
  ]
})
export class PodcastdetailsModule { }
