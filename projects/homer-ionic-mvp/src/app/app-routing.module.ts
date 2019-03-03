import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'homer-live/:id', loadChildren: './pages/homer-live/homer-live.module#HomerLivePageModule' },
  { path: 'homer-list/:api/:env/:limit', loadChildren: './pages/homer-list/homer-list.module#HomerListPageModule' },
  { path: 'homer-detail/:api/:id', loadChildren: './pages/homer-detail/homer-detail.module#HomerDetailPageModule' },
  { path: 'homer-search', loadChildren: './pages/homer-search/homer-search.module#HomerSearchPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
