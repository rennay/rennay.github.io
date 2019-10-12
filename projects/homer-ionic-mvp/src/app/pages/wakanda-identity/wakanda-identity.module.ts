import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WakandaIdentityPage } from './wakanda-identity.page';

const routes: Routes = [
  {
    path: '',
    component: WakandaIdentityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WakandaIdentityPage]
})
export class WakandaIdentityPageModule {}
