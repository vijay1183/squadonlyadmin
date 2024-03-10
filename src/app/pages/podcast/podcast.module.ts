import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastComponent } from './podcast.component';
import { RouterModule, Routes } from '@angular/router';
// import { PodcastService } from './podcast.service';
import { BreadcrumbsModule } from 'src/app/shared/breadcrumbs/breadcrumbs.module';
import { DataTablesModule } from 'angular-datatables';
const routes: Routes = [{
  path: '',
  component: PodcastComponent,
  // resolve: { service: PodcastService }
}];


@NgModule({
  declarations: [
    PodcastComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BreadcrumbsModule,
    DataTablesModule
  ]
})
export class PodcastModule { }
