import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WakandaReferenceTypesPage } from './wakanda-reference-types.page';

const routes: Routes = [
  {
    path: '',
    component: WakandaReferenceTypesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WakandaReferenceTypesPage]
})
export class WakandaReferenceTypesPageModule {}
