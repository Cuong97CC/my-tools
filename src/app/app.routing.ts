import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HtmlViewComponent } from './htmlView/htmlView.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ImageToTextComponent } from './imageToText/imageToText.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/htmlView', pathMatch: 'full' },
  { path: 'htmlView', component: HtmlViewComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'imageToText', component: ImageToTextComponent },
  { path: 'billManage', loadChildren: './billManager/bill.module#BillManagerModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
