import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HtmlViewComponent } from './htmlView/htmlView.component';

const routes: Routes = [
  { path: 'htmlView', component: HtmlViewComponent },
  { path: 'billManage', loadChildren: './billManager/bill.module#BillManagerModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
