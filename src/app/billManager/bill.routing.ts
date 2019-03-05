import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBillsComponent } from './listBills/listBills.component';
import { SavedComponent } from './saved/saved.component';

const routes: Routes = [
  {
    path: 'listBills',
    component: ListBillsComponent
  },
  {
    path: 'saved',
    component: SavedComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
