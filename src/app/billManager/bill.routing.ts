import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBillsComponent } from './listBills/listBills.component';

const routes: Routes = [
  {
    path: '',
    component: ListBillsComponent,
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
