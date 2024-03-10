import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { BreadcrumbsModule } from 'src/app/shared/breadcrumbs/breadcrumbs.module';
const routes: Routes = [{ path: '', component: CategoriesComponent}];

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BreadcrumbsModule,
    DataTablesModule
  ]
})
export class CategoriesModule { }
