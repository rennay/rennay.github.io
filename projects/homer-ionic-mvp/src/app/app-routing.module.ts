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
  { path: 'homer-search', loadChildren: './pages/homer-search/homer-search.module#HomerSearchPageModule' },
  { path: 'wakanda-identity', loadChildren: './pages/wakanda-identity/wakanda-identity.module#WakandaIdentityPageModule' },
  { path: 'wakanda-reference-types', loadChildren: './pages/wakanda-reference-types/wakanda-reference-types.module#WakandaReferenceTypesPageModule' },
  { path: 'wakanda-reference-suburbs', loadChildren: './pages/wakanda-reference-suburbs/wakanda-reference-suburbs.module#WakandaReferenceSuburbsPageModule' },
  { path: 'wakanda-customers-light', loadChildren: './pages/wakanda-customers-light/wakanda-customers-light.module#WakandaCustomersLightPageModule' },
  { path: 'wakanda-customers-heavy', loadChildren: './pages/wakanda-customers-heavy/wakanda-customers-heavy.module#WakandaCustomersHeavyPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
