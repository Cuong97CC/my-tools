import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBillsComponent } from './listBills/listBills.component';
import { SavedComponent } from './saved/saved.component';
import { SalaryComponent } from './salary/salary.component';

const routes: Routes = [
  {
    path: 'listBills',
    component: ListBillsComponent
  },
  {
    path: 'saved',
    component: SavedComponent
  },
  {
    path: 'salary',
    component: SalaryComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
