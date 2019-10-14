import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ReturnrequestPage } from './returnrequest.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnrequestPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReturnrequestPage]
})
export class ReturnrequestPageModule {}
