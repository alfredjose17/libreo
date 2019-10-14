import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RatingComponent } from '../../rating/rating.component';

import { IonicModule } from '@ionic/angular';

import { BorrowedbooksPage } from './borrowedbooks.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowedbooksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BorrowedbooksPage, RatingComponent]
})
export class BorrowedbooksPageModule {}
