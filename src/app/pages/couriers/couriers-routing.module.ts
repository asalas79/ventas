import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouriersPage } from './couriers.page';

const routes: Routes = [
  {
    path: '',
    component: CouriersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouriersPageRoutingModule {}
