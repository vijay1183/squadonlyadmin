import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './shared/body/body.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/login/login.module').then(m => m.LoginModule) },
  {
    path: '',
    component: BodyComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
      // { path: 'setting', redirectTo: '/setting/DataSource', pathMatch: 'full' },
      { path: 'podcast', loadChildren: () => import('./pages/podcast/podcast.module').then(m => m.PodcastModule) },
      { path: 'podcast/:id', loadChildren: () => import('./pages/podcastdetails/podcastdetails.module').then(m => m.PodcastdetailsModule) },
      { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
