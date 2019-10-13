import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WakandaCustomersHeavyPage } from './wakanda-customers-heavy.page';

const routes: Routes = [
  {
    path: '',
    component: WakandaCustomersHeavyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WakandaCustomersHeavyPage]
})
export class WakandaCustomersHeavyPageModule {}
