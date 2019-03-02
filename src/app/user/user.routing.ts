import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './signUp/signUp.component';
import { LogInComponent } from './logIn/logIn.component';

const routes: Routes = [
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'logIn',
    component: LogInComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
