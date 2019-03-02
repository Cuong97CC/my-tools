import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBillsComponent } from './listBills/listBills.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: 'listBills',
    component: ListBillsComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
