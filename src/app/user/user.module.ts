import { NgModule } from '@angular/core';
import { routing } from './user.routing';
import { SharedModule } from '../shared/shared.module';
//component
import { SignUpComponent } from './signUp/signUp.component';
import { LogInComponent } from './logIn/logIn.component';

import { UserService } from './shared/services/user.service';

@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    SignUpComponent,
    LogInComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
