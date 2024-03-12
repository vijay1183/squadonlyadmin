import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { BreadcrumbsModule } from 'src/app/shared/breadcrumbs/breadcrumbs.module';
import { BooleanpipePipe } from './booleanpipe.pipe';
const routes: Routes = [{ path: '', component: UsersComponent}];


@NgModule({
  declarations: [
    UsersComponent,
    BooleanpipePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BreadcrumbsModule,
    DataTablesModule
  ]
})
export class UsersModule { }
