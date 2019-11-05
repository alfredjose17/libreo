import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { RatingComponent } from '../../rating/rating.component';
import { IonicModule } from '@ionic/angular';

import { BorbksDetailPage } from './borbks-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BorbksDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BorbksDetailPage, RatingComponent]
})
export class BorbksDetailPageModule {}
